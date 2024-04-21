import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { PrismaGET, PrismaPOST, searchParamsToJSON } from "@/app/utils";
import { z } from "zod";
import { BidModel } from "@zod-prisma";

const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
  return PrismaPOST(req, prisma.bid);
}

export const GET = async (
    req: NextRequest
) => {
  return PrismaGET(req, BidModel.partial(), prisma.bid);
}

