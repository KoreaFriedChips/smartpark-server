import { NextRequest, NextResponse } from "next/server";
import { getUser, tryOrReturnError } from "@/app/utils";
import { prisma } from "@/lib/prisma";
import { subHours, isBefore, interval } from "date-fns";
import { sortIntervals } from "@/lib/interval";


export const DELETE = async (
  req: NextRequest,
  { params }: {params: { id: string}}
) => {
return tryOrReturnError(async () => {
  const {userId, payload} = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 })
    if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});

  if (!params.id) {
    return NextResponse.json({ error: "id required"}, {status:400});
  }

  const reservation = await prisma.reservation.findUnique({
    where: {
      id: params.id
    }
  });

  if (!reservation) {
    return NextResponse.json({error: "reservation id not found"}, {status:400});
  }

  if (reservation.userId !== userId) {
    return NextResponse.json({ error: "object does not belong to userId"}, {status:403});
  }

  await prisma.$transaction(async (tx) => {
    if (isBefore(new Date(), subHours(reservation.ends, 1))) {
      const listing = await tx.listing.findUnique({ 
        where: { id: reservation.listingId },
        select: { availability: true }
      });
      if (!listing) throw new Error("listing not found for availability update");
  
      const newAvailability = sortIntervals([
        ...listing.availability, 
        interval(reservation.starts, reservation.ends),
      ])
  
      await tx.listing.update({
        where: { id: reservation.listingId },
        data: {
          availability: newAvailability,
        }
      })
    }

    await tx.reservation.delete({
      where: {
        id: params.id
      }
    });
  })


  return NextResponse.json({ message: "success"});
})
    

}