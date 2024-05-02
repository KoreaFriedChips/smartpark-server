import { PrismaPOST, tryOrReturnError } from "@/app/utils";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/app/utils";

export const POST = async (
  req: NextRequest,
) => {
return tryOrReturnError(async () => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});
  let data: any = await req.json();
  data.userId = userId;
  return PrismaPOST(data, prisma.reservation);
})}