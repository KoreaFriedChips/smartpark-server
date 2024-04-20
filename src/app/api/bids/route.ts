import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { searchParamsToJSON } from "@/app/utils";
import { z } from "zod";
import { BidModel } from "@zod-prisma";

const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
    try {
      const data = await req.json();
      // const payload = await getUser(data);
      // if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 })

      const bid: Bid = await prisma.bid.create({
        data: data
      });

      return NextResponse.json({ data: bid });

    } catch (error) {
      console.log("Create bid failed");
      console.log(error);
      return NextResponse.json({error: "Internal server error"}, {status:500});
    }
}

export const GET = async (
    req: NextRequest
) => {
  try {
    const whereClause = BidModel.partial().parse(searchParamsToJSON(req.nextUrl.searchParams));
    const bids = await prisma.bid.findMany({ where: whereClause });
    return NextResponse.json({ data: bids });
  } 
  catch (error) {
    console.log(error);
    return NextResponse.json({error: "Internal server error"}, {status:500});
  }
}

