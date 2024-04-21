import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { PrismaGET, PrismaPOST, searchParamsToJSON } from "@/app/utils";
import { ConfirmationModel } from "@zod-prisma";

const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
  return PrismaPOST(req, prisma.confirmation);
}

export const GET = async (
    req: NextRequest
) => {
  return PrismaGET(req, ConfirmationModel.partial(), prisma.confirmation);
}

