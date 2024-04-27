import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { PrismaGET, PrismaPOST, getUser, tryOrReturnError } from "@/app/utils";
import { string, z } from "zod";
import { UserModel } from "@zod-prisma";
import { searchParamsToJSON } from "@/app/utils";

const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});
  return PrismaPOST(await req.json(), prisma.user);
}

export const GET = async (
    req: NextRequest
) => {
return tryOrReturnError(async () => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});

  const whereParams = UserModel.partial().safeParse(searchParamsToJSON(req.nextUrl.searchParams));
  if (!whereParams.success) {
    return NextResponse.json({ error: "Invalid search params"}, {status:400});
  }
  
  const objects = await prisma.user.findMany({ where: whereParams.data });
  const users = await Promise.all(await objects.map(async (user) => {
    const listingIds = await prisma.listing.findMany({ where: {userId: user.id }, select: { id: true }});
    const agg = await prisma.review.aggregate({
      _count: {
        id: true 
      },
      _avg: {
        rating: true
      },
      where: {
        OR: listingIds.map((entry) => {return { listingId: entry.id }}),
      }
    });

    return {
      ...user,
      reviews: agg._count.id,
      rating: agg._avg.rating
    }
  }));

  return NextResponse.json({ data: users });
})
}

