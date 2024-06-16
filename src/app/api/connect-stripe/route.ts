import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { PrismaPOST, getUser } from "@/app/utils";
import Stripe from "stripe";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { userId, payload } = await getUser(req);
  console.log("userId: ", userId);
  console.log("payload: ", payload);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId)
    return NextResponse.json({ error: "clerkId not found" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const account = await stripe.accounts.create({
    type: 'express',
  });

  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: 'https://trysmartpark.com',
    return_url: 'https://trysmartpark.com',
    type: 'account_onboarding',
  });

  await prisma.user.update({
    where: { id: userId },
    data: { stripeAccountId: account.id, verified: true },
  });

  return NextResponse.json({ accountLink: accountLink.url, account: account.id }, { status: 200 });
};
