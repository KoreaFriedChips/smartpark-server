import { getUser, tryOrReturnError } from "@/app/utils";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CreateMessageModel } from "@zod-prisma";
import SendMessage from "@/lib/message";

export const POST = async (
  req: NextRequest
) => {
return tryOrReturnError(async () => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});
  const data: any = await req.json();
  data.fromUserId = userId;
  data.date = new Date();
  const messageParse = CreateMessageModel.safeParse(data);
  console.log(messageParse);
  if (!messageParse.success) return NextResponse.json({error: "malformed message input"}, {status: 400});

  const message = await prisma.message.create({
    data: messageParse.data
  });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      profilePicture: true
    }
  });
  if (!user) throw new Error('user not found');

  SendMessage.toAllDevices(message, user.name, user.profilePicture as string);

  return NextResponse.json({data: message});
});}


export const GET = async (
  req: NextRequest
) => {
return tryOrReturnError(async () => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});
  const otherUserId = req.nextUrl.searchParams.get('userId');
  if (!otherUserId) return NextResponse.json({error: "userId required"}, {status: 400});

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        {
          fromUserId: otherUserId,
          toUserId: userId,
        },
        {
          fromUserId: userId,
          toUserId: otherUserId
        }
      ]
    },
    orderBy: {
      date: 'desc',
    }
  });
  
  return NextResponse.json({data: messages});
})
}