import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { searchParamsToJSON } from "@/app/utils";
import { ConfirmationModel } from "@zod-prisma";

const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
    try {
      const data = await req.json();
      // const payload = await getUser(data);
      // if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 })

      const confirmation: Confirmation = await prisma.confirmation.create({
        data: data
      });

      return NextResponse.json({ data: confirmation });

    } catch (error) {
      console.log("Create confirmation failed");
      return NextResponse.json({error: "Internal server error"}, {status:500});
    }
}

export const GET = async (
    req: NextRequest
) => {
  try {
    const whereParams = ConfirmationModel.partial().parse(searchParamsToJSON(req.nextUrl.searchParams));
    const confirmations = await prisma.confirmation.findMany({ where: whereParams });
    return NextResponse.json({ data: confirmations });
  } 
  catch (error) {
    console.log(error);
    return NextResponse.json({error: "Internal server error"}, {status:500});
  }
}

