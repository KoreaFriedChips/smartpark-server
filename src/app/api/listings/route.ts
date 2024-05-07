import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client/edge.js";
import { ParseRawListings, PrismaGET, PrismaPOST, getUser } from "@/app/utils";
import { now } from "mongoose";
import { z } from "zod";
import { ListingModel } from "@zod-prisma";
import { searchParamsToJSON, tryOrReturnError } from "@/app/utils";

const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
return tryOrReturnError(async () => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});
  let data: any = await req.json();
  data.userId = userId;
  const listing = await prisma.listing.create({
    data: data
  });

  return NextResponse.json({ data: listing });

})}

export const GET = async (
    req: NextRequest
) => {
return tryOrReturnError(async () => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});
  
  let otherParams: any = {};
  const tags = req.nextUrl.searchParams.getAll('tags');
  if (tags.length > 0) {
    otherParams['tags'] = { $all: tags};
    req.nextUrl.searchParams.delete('amenities');
  }
  const amenities = req.nextUrl.searchParams.getAll('amenities');
  if (amenities.length > 0) {
    otherParams['amenities'] = { $all: amenities };
    req.nextUrl.searchParams.delete('amenities');
  }

  const whereParams: any = ListingModel.partial().safeParse(searchParamsToJSON(req.nextUrl.searchParams));
  if (!whereParams.success) {
    return NextResponse.json({ error: "Invalid search params"}, {status:400});
  }

  let pipeline: any[] = [];

  const search = req.nextUrl.searchParams.get('search');
  if (search) {
    pipeline.push({ 
      $search: {
      "index": "listingTextSearch",
      text: {
        query: search,
        path: { wildcard: "*" }
      }
      } 
    } );
  }

  pipeline.push({
    $addFields: {
      id: { $toString: { $getField: { field: "_id", input: "$$ROOT" } } }
    }
  },
  {
    $match: {
      ...whereParams.data,
      ...otherParams
    }
  });

  const objects = ParseRawListings(await prisma.listing.aggregateRaw({pipeline: pipeline}));

  const listings = await Promise.all(await objects.map(async (listing) => {
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
  }));

  

  return NextResponse.json({ data: listings });
  
})
  
}

