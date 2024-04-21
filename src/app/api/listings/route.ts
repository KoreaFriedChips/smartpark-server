import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { PrismaGET, PrismaPOST, searchParamsToJSON } from "@/app/utils";
import { now } from "mongoose";
import { z } from "zod";
import { CompleteListing, ListingModel } from "@zod-prisma";


const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
  return PrismaPOST(req, prisma.listing);
}

export const GET = async (
    req: NextRequest
) => {
  return PrismaGET(req, ListingModel.partial(), prisma.listing);
}

