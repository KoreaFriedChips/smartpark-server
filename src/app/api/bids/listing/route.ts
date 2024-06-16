import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge";
import { PrismaPOST, getUser } from "@/app/utils";
import Stripe from "stripe";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  const { userId, payload } = await getUser(req);
  console.log("userId: ", userId);
  console.log("payload: ", payload);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId)
    return NextResponse.json({ error: "clerkId not found" }, { status: 400 });

  console.log("req: ", req);
  const listingId = req.nextUrl.searchParams.get('listingId');
  console.log("listingId: ", listingId);

  if (!listingId) {
    return NextResponse.json({ error: "Listing ID is required" }, { status: 400 });
  }

  try {
    const bids = await prisma.bid.findMany({
      where: { listingId },
    });
    console.log("bids: ", bids);
    return NextResponse.json({ data: bids }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
};
