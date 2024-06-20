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
  const { paymentIntentId } = data;
  console.log("data: ", data);

  try {
     await stripe.paymentIntents.cancel(paymentIntentId!);

    return NextResponse.json({ message: "successfully cancelled" }, { status: 200 });
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

