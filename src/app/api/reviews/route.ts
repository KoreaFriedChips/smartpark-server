import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { searchParamsToJSON } from "@/app/utils";
import { z } from "zod";
import { ReviewModel } from "@zod-prisma";

const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
    try {
      const data = await req.json();
      // const payload = await getUser(data);
      // if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 })

      const review: Review = await prisma.review.create({
        data: data
      });

      return NextResponse.json({ data: review });

    } catch (error) {
      console.log("Create review failed");
      console.log(error);
      return NextResponse.json({error: "Internal server error"}, {status:500});
    }
}

export const GET = async (
    req: NextRequest
) => {
  try {
    const whereParams = ReviewModel.partial().parse(searchParamsToJSON(req.nextUrl.searchParams));
    const reviews = await prisma.review.findMany({ where: whereParams });
    return NextResponse.json({ data: reviews });
  } 
  catch (error) {
    console.log(error);
    return NextResponse.json({error: "Internal server error"}, {status:500});
  }
}

