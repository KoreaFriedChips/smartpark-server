import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { PrismaGET, PrismaPOST, getUser } from "@/app/utils";
import { z } from "zod";
import { BidModel } from "@zod-prisma";

const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});
  let data: any = await req.json();
  data.userId = userId;
  return PrismaPOST(req, prisma.bid);
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


  let range: any = undefined;
  if ('starts' in whereParams.data || 'ends' in whereParams.data) {
    if (!('starts' in whereParams.data) || !('ends' in whereParams.data)) 
      return NextResponse.json({error: "if searching range, must include both 'starts' and 'ends' params"}, {status: 400});
    const start = whereParams.data.starts;
    const end = whereParams.data.ends;
    delete whereParams.data.starts;
    delete whereParams.data.ends;
    range = {
     OR: [
      {
        starts: { gt: start, lt: end}
      },
      {
        ends: { gt: start, lt: end}
      }
     ] 
    }
  }
  console.log(whereParams);
  console.log(range);

  const objects = await prisma.bid.findMany({ 
    where: {
      AND: [
        whereParams.data,
        range
      ]
    },
    orderBy: {
      amount: 'desc',
    }
  });

  console.log(objects);

  if (!objects || objects.length === 0) return NextResponse.json({error: "bids not found"}, {status: 404});
  return NextResponse.json({ data: objects });
})}

