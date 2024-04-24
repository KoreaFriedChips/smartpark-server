import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { PrismaDELETE, PrismaPUT } from "@/app/utils";
import { ConfirmationModel } from "@zod-prisma";
const prisma = new PrismaClient();

export const PUT = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
  return PrismaPUT(req, { params }, ConfirmationModel.partial(), prisma.confirmation);
}

export const DELETE = async (
    req: NextRequest,
    {params}: {params: { id: string } }
) => {
  return PrismaDELETE(req, { params }, prisma.confirmation);
}