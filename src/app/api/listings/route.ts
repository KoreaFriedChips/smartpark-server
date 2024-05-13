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

  return NextResponse.json({ data: {...listing, rating: 0, reviews: 0 } });

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
    $lookup: {
      from: "Review",
      localField: "_id",
      foreignField: "listingId",
      as: "reviews"
    }
  },
  {
    $addFields: {
      rating: { $avg: "$reviews.rating" },
      reviews: { $size: "$reviews" }
    }
  },
  {
    $addFields: {
      userId: { $toString: { $getField: { field: "userId", input: "$$ROOT" } }}
    }
  },
  {
    $match: {
      ...whereParams.data,
      ...otherParams
    }
  });

  const sort = req.nextUrl.searchParams.getAll('sort');
  if (sort.length > 0) {
    let sortFields: any = {};
    sort.forEach((sortOption) => {
      switch (sortOption) {
        case "ratingLowHigh":
          sortFields.rating = 1;
          break;
        case "distanceLowHigh":
        case "distanceHighLow":
        case "ratingHighLow":
          sortFields.rating = -1;
          break;
        case "reviewsLowHigh":
          sortFields.reviews = 1;
          break;
        case "reviewsHighLow":
          sortFields.reviews = -1;
          break;
        case "startingPriceLowHigh":
          sortFields.startingPrice = 1;
          break;
        case "startingPriceHighLow":
          sortFields.startingPrice = -1;
          break;
        case "buyPriceLowHigh":
          sortFields.buyPrice = 1;
          break;
        case "buyPriceHighLow":
          sortFields.buyPrice = -1;
          break;
        default:
          return;
      }
    })
    pipeline.push({
      $sort: sortFields
    })
  }

  const limit = 10;
  let skip = 0;
  const page = req.nextUrl.searchParams.get("page");
  if (page) {
    skip = (Number(page) - 1) * limit;
  }
  pipeline.push({
    "$skip": skip
  }, 
  {
    "$limit": limit
  })


  const res = await prisma.listing.aggregateRaw({pipeline: pipeline});
  const listings = ParseRawListings(res);
  if (req.nextUrl.searchParams.has("userId")) console.log(pipeline);
  return NextResponse.json({ data: listings, metadata: { page: page ? Number(page) : 1, isLastPage: listings.length < limit } });
  
})
  
}

