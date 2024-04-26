import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { PrismaGET, PrismaPOST, getUser } from "@/app/utils";
import { now } from "mongoose";
import { z } from "zod";
import { ListingModel } from "@zod-prisma";
import { searchParamsToJSON, tryOrReturnError } from "@/app/utils";


const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});
  let data: any = await req.json();
  data.sellerId = userId;
  return PrismaPOST(req, prisma.listing);
}

export const GET = async (
    req: NextRequest
) => {
return tryOrReturnError(async () => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});
  
  const whereParams: any = ListingModel.partial().safeParse(searchParamsToJSON(req.nextUrl.searchParams));
  if (!whereParams.success) {
    return NextResponse.json({ error: "Invalid search params"}, {status:400});
  }


  const listings = await Promise.all(await prisma.$transaction(async (prisma) => {
    const listings = await prisma.listing.findMany({ where: whereParams.data });
    return await listings.map(async (listing) => {
      const reviews = await prisma.review.aggregate({
        _count: {
          id: true
        },
        _avg: {
          rating: true
        },
        where: {
          listingId: listing.id
        }
      });
      return {
        ...listing,
        rating: reviews._avg.rating,
        reviews: reviews._count.id
      }
    });
  }))
  

  return NextResponse.json({ data: listings });
  
})
  
}

