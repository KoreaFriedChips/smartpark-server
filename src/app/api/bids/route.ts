import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { PrismaGET, PrismaPOST, getUser, searchParamsToJSON, tryOrReturnError } from "@/app/utils";
import { z } from "zod";
import { BidModel } from "@zod-prisma";
import { getHighestBid } from "@/lib/bid";
import { interval } from "date-fns";

const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
return tryOrReturnError(async () => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});
  
  let data: any = await req.json();

  const highestBid = await getHighestBid(data.listingId, interval(data.starts, data.ends));
  if (highestBid && Number(data.amount) <= highestBid.amount) return NextResponse.json({error: "bid amount must be higher than current max"}, {status: 400})

  data.userId = userId;
  const createdObject = await prisma.bid.create({
    data: data
  });

  return NextResponse.json({ data: createdObject });

})

}

export const GET = async (
    req: NextRequest
) => {
return tryOrReturnError(async () => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});

  let whereParams = BidModel.partial().safeParse(searchParamsToJSON(req.nextUrl.searchParams));
  if (!whereParams.success) return NextResponse.json({ error: "Invalid search params"}, {status:400});

  const objects = await prisma.bid.findMany({ 
    where: whereParams.data,
    orderBy: {
      amount: 'desc',
    }
  });

  console.log(objects);

  if (!objects || objects.length === 0) return NextResponse.json({error: "bids not found"}, {status: 404});
  return NextResponse.json({ data: objects });
})}

