import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { PrismaGET, PrismaPOST, getUser } from "@/app/utils";
import { z } from "zod";
import { ReviewModel } from "@zod-prisma";

const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});
  let data: any = await req.json();
  data.userId = userId;
  return PrismaPOST(data, prisma.review);
}

export const GET = async (
    req: NextRequest
) => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});
  return PrismaGET(req.nextUrl.searchParams, ReviewModel.partial(), prisma.review);
}

