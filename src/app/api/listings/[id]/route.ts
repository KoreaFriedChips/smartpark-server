import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { ListingModel } from "@zod-prisma";
import { PrismaDELETE, PrismaPUT } from "@/app/utils";

const prisma = new PrismaClient();

export const PUT = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
  return PrismaPUT(req, { params }, ListingModel.partial(), prisma.listing, "sellerId");
}

export const DELETE = async (
    req: NextRequest,
    {params}: {params: { id: string } }
) => {
  return PrismaDELETE(req, { params }, prisma.listing, "sellerId");
}