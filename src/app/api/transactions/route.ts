import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { PrismaPOST, PrismaGET, searchParamsToJSON } from "@/app/utils";
import { TransactionModel } from "@zod-prisma";

const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
  return PrismaPOST(req, prisma.transaction);
}

export const GET = async (
    req: NextRequest
) => {
  return PrismaGET(req, TransactionModel.partial(), prisma.transaction);
}

