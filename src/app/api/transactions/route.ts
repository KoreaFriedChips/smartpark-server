import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { PrismaPOST, PrismaGET, getUser } from "@/app/utils";
import { TransactionModel } from "@zod-prisma";

const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});
  let data: any = await req.json();
  data.userId = userId;
  return PrismaPOST(data, prisma.transaction);
}

export const GET = async (
    req: NextRequest
) => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});
  let searchParams = req.nextUrl.searchParams;
  searchParams.set("userId", userId);
  return PrismaGET(searchParams, TransactionModel.partial(), prisma.transaction);
}

