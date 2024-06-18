import { PrismaGET, PrismaPOST, tryOrReturnError } from "@/app/utils";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/app/utils";
import { isEqual, interval } from "date-fns";
import { createReservation } from "@/lib/reservation";
import { ReservationModel } from "@zod-prisma";

export const POST = async (
  req: NextRequest,
) => {
return tryOrReturnError(async () => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});
  let data: any = await req.json();
  if (!data.listingId) throw new Error("listingId required for reservation");
  if (!data.starts || !data.ends) throw new Error("interval needed for reservation");


  const reservation = await createReservation(data);
  return NextResponse.json({data: reservation});
})}