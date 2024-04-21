import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { ReviewModel } from "@zod-prisma";
import { PrismaDELETE, PrismaPUT } from "@/app/utils";
const prisma = new PrismaClient();

export const PUT = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
  return PrismaPUT(req, { params }, ReviewModel.partial(), prisma.review);
}

export const DELETE = async (
    req: NextRequest,
    {params}: {params: { id: string } }
) => {
  return PrismaDELETE(req, { params }, prisma.review);
}