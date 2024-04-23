import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { PrismaGET, PrismaPOST, getUser } from "@/app/utils";
import { now } from "mongoose";
import { z } from "zod";
import { CompleteListing, ListingModel } from "@zod-prisma";


const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});
  let data = await req.json();
  data.sellerId = userId;
  return PrismaPOST(req, prisma.listing);
}

export const GET = async (
    req: NextRequest
) => {
  return PrismaGET(req, ListingModel.partial(), prisma.listing);
}

