import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { searchParamsToJSON } from "@/app/utils";
import { FavoriteModel } from "@zod-prisma";
import { PrismaPOST, PrismaGET, getUser } from "@/app/utils";

const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});

  let data = await req.json();
  data.userId = userId;
  return PrismaPOST(data, prisma.favorite);
}

export const GET = async (
    req: NextRequest
) => {
  return PrismaGET(req, FavoriteModel.partial(), prisma.favorite);
}

