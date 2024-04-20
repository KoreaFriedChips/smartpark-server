import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { searchParamsToJSON } from "@/app/utils";
import { now } from "mongoose";
import { z } from "zod";
import { ListingModel } from "@zod-prisma";


const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
    try {
      const data = await req.json();
      // const payload = await getUser(data);
      // if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 })

      const listing = await prisma.listing.create({
        data: data
      });

      return NextResponse.json({ data: listing });

    } catch (error) {
      console.log("Create listing failed");
      return NextResponse.json({error: "Internal server error"}, {status:500});
    }
}

export const GET = async (
    req: NextRequest
) => {
  try {
    const whereParams: any = ListingModel.partial().parse(searchParamsToJSON(req.nextUrl.searchParams));
    const listings = await prisma.listing.findMany({ where: whereParams });
    return NextResponse.json({ data: listings });
  } 
  catch (error) {
    console.log(error);
    return NextResponse.json({error: "Internal server error"}, {status:500});
  }
}

