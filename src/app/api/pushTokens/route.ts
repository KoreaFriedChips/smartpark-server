import { getUser, tryOrReturnError } from "@/app/utils"
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
return tryOrReturnError(async () => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});
  const data: any = await req.json();
  const pushToken = data.pushToken;
  if (!pushToken) return NextResponse.json({error: 'pushToken required'}, {status: 400});
  const user = await prisma.user.findUnique({
    where: {id: userId},
    select: {pushTokens: true}
  });
  if (!user) throw new Error("user not found");
  if (pushToken in user.pushTokens) return NextResponse.json({message: "pushToken already exists"});
  
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      pushTokens: {
        push: pushToken
      }
    }
  });
  return NextResponse.json({ message: "pushToken added" });
});}