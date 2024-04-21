import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { searchParamsToJSON } from "@/app/utils";
import { FavoriteModel } from "@zod-prisma";
import { PrismaPOST, PrismaGET } from "@/app/utils";

const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
  return PrismaPOST(req, prisma.favorite);
}

export const GET = async (
    req: NextRequest
) => {
  return PrismaGET(req, FavoriteModel.partial(), prisma.favorite);
}

