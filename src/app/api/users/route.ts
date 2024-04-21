import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { PrismaGET, PrismaPOST, searchParamsToJSON } from "@/app/utils";
import { string, z } from "zod";
import { CompleteUser, UserModel, RelatedUserModel } from "@zod-prisma";

const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
  return PrismaPOST(req, prisma.user);
}

export const GET = async (
    req: NextRequest
) => {
  return PrismaGET(req, UserModel.partial(), prisma.user);
}

