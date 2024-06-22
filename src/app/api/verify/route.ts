import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { PrismaPOST, getUser } from "@/app/utils";
import Stripe from "stripe";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const PUT = async (req: NextRequest, res: NextResponse) => {
  const { userId, payload } = await getUser(req);
  console.log("userId: ", userId);
  console.log("payload: ", payload);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId)
    return NextResponse.json({ error: "clerkId not found" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (user.verified) return NextResponse.json({ message: "User already verified" }, { status: 200 });

  if (!user.stripeAccountId) return NextResponse.json({ error: "Stripe account not found" }, { status: 404 });
  
  const account = await stripe.accounts.retrieve(user.stripeAccountId);
  if (account.charges_enabled && account.details_submitted && account.payouts_enabled) {
    await prisma.user.update({
        where: { id: userId },
        data: { verified: true},
      });
  } 
  
  return NextResponse.json({ message: "User is now verfied" }, { status: 200 });
};
