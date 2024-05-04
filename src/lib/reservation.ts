import { prisma } from "@/lib/prisma";
import { interval, isEqual } from "date-fns";
export interface ReservationInit {
  starts: string | Date,
  ends: string | Date,
  listingId: string,
  userId: string
}

export const createReservation = async (data: ReservationInit): Promise<Reservation> => {
  return await prisma.$transaction(async (tx) => {
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
}