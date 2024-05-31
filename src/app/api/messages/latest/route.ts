import { getUser, tryOrReturnError } from "@/app/utils";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic'
export const fetchCache = "force-no-store";

export const GET = async (
  req: NextRequest
) => {
return tryOrReturnError(async () => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});
  
  // Step 1: Group messages by unique pairs and find the latest date for each pair
  const messages = await prisma.$transaction(async (txn) => {
    const latestMessages = await txn.message.groupBy({
      by: ['toUserId', 'fromUserId'],
      where: {
        OR: [
          { toUserId: userId },
          { fromUserId: userId },
        ],
      },
      _max: {
        date: true,
      },
    });
  
    // Step 2: Filter to only consider the latest message per unique pair
    const uniquePairs = latestMessages.reduce((acc, { toUserId, fromUserId, _max }) => {
      const otherUserId = toUserId === userId ? fromUserId : toUserId;
      if (_max.date && (!acc[otherUserId] || _max.date > acc[otherUserId])) {
        acc[otherUserId] = _max.date;
      }
      return acc;
    }, {} as Record<string, Date>);
  
    // Step 3: Form a query to get the details of the latest messages
    const latestMessageQueries = Object.entries(uniquePairs).map(async ([otherUserId, latestDate]) => {
      const msg = await txn.message.findFirst({
        where: {
          OR: [
            { toUserId: userId, fromUserId: otherUserId, date: latestDate },
            { fromUserId: userId, toUserId: otherUserId, date: latestDate },
          ],
        },
        orderBy: {
          date: 'desc',
        },
      });
      const user = await txn.user.findUnique(({
        where: {
          id: otherUserId,
        },
        select: {
          name: true,
          profilePicture: true,
        }
      }));
      return ({
        ...msg,
        otherUserId: otherUserId,
        otherUserName: user?.name,
        otherProfilePicture: user?.profilePicture,
      })
    });
  
    // Execute all queries and get the results
    const latestMessagesDetails = await Promise.all(latestMessageQueries);
    return latestMessagesDetails.filter((message) => message !== null);
  })

  return NextResponse.json({data: messages});
})
}