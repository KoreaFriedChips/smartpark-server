import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { PrismaPOST, getUser } from "@/app/utils";
import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next/types";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const PUT = async (req: NextRequest) => {
  const { userId, payload } = await getUser(req);
  console.log("userId: ", userId);
  console.log("payload: ", payload);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId)
    return NextResponse.json({ error: "clerkId not found" }, { status: 400 });

  console.log("req: ", req);
  let data: any = await req.json();
  const { bidId } = data;
  console.log("data: ", data);

  try {
    const bid = await prisma.bid.findUnique({
      where: {
        id: bidId,
      },
    });
    if (!bid) {
      return NextResponse.json(
        { error: "Bid not found" },
        { status: 404 }
      );
    }

    // update bid status to "captured"
    await prisma.bid.update({
      where: { id: bidId },
      data: { status: "captured" },
    });
    const paymentIntentId = bid.stripePaymentIntentId;
    // const confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
    //     return_url: "https://trysmartpark.com" 
    //   });
    // console.log("confirmedPaymentIntent: ", confirmedPaymentIntent);

    const capturedPaymentIntent = await stripe.paymentIntents.capture(paymentIntentId!);
    
    const transactionData = {
      transactionDate: Date.now(),
      amount: bid.amount,
      paymentMethod: "stripe",
      listingId: bid.listingId,
      sellerId: userId, // the seller is the only one who can accept a bid
      buyerId: bid.userId,
      type: "sale",
    };
    const transactionResponse = await POST(transactionData, userId);
    
    console.log("capturedPaymentIntent: ", capturedPaymentIntent);
    console.log("transactionResponse: ", transactionResponse);

    return NextResponse.json({ capturedPaymentIntent, transactionResponse }, { status: 200 });
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

export const POST = async (data : any,  userId : string) => {
  data.userId = userId;
  return PrismaPOST(data, prisma.transaction);
}