import { PrismaPOST, tryOrReturnError } from "@/app/utils";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/app/utils";
import { isEqual, interval } from "date-fns";

export const POST = async (
  req: NextRequest,
) => {
return tryOrReturnError(async () => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});
  let data: any = await req.json();
  data.userId = userId;
  if (!data.listingId) throw new Error("listingId required for reservation");
  if (!data.starts || !data.ends) throw new Error("interval needed for reservation");


  const reservation = await prisma.$transaction(async (tx) => {
    const listing = await tx.listing.findUnique({
      where: { id: data.listingId },
      select: { availability: true }
    });
    if (!listing) throw new Error("listing not found");
    
    const reserved: Interval = interval(data.starts, data.ends)
    const newAvailability = listing.availability.filter(({start, end}) => !isEqual(reserved.start, start) && !isEqual(reserved.end, end));
    await tx.listing.update({ 
      where: { 
        id: data.listingId 
      }, 
      data: {
        availability: newAvailability
      },
    })
  
    const createdObject = await tx.reservation.create({
      data: data
    });

    return createdObject;
  })
  return NextResponse.json({data: reservation});
})}