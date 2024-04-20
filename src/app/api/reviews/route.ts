import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { searchParamsToJSON } from "@/app/utils";

const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
    try {
      const data = await req.json();
      // const payload = await getUser(data);
      // if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 })

      const review = await prisma.review.create({
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
    const whereClause = searchParamsToJSON(req.nextUrl.searchParams);
    const numberProperties = [
      "rating"
    ]
    numberProperties.forEach((property) => {
      if (property in whereClause) {
        whereClause[property] = Number(whereClause[property]);
      }
    });
    const reviews = await prisma.review.findMany({ where: whereClause });
    return NextResponse.json({ data: reviews });
  } 
  catch (error) {
    console.log(error);
    return NextResponse.json({error: "Internal server error"}, {status:500});
  }
}

