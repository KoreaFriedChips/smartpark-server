import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { PrismaPOST, getUser } from "@/app/utils";
import Stripe from "stripe";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const POST = async (req: NextRequest) => {
  const { userId, payload } = await getUser(req);
  console.log("userId: ", userId);
  console.log("payload: ", payload);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId)
    return NextResponse.json({ error: "clerkId not found" }, { status: 400 });

  console.log("req: ", req);
  let data: any = await req.json();
  const { amount, currency } = data;
  console.log("data: ", data);

  if (!amount || !currency) {
    return NextResponse.json(
      { error: "Amount and currency are required" },
      { status: 400 }
    );
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      }
    });

    console.log("paymentIntent: ", paymentIntent);
    return NextResponse.json({ paymentIntent }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
};
