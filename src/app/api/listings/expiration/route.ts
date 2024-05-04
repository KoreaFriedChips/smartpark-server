import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client/edge.js";
import { PrismaGET, PrismaPOST, getUser } from "@/app/utils";
import { now } from "mongoose";
import { z } from "zod";
import { ListingModel } from "@zod-prisma";
import { searchParamsToJSON, tryOrReturnError } from "@/app/utils";
import { prisma } from "@/lib/prisma";
import { getHighestBid } from "@/lib/bid";
import { createReservationTx } from "@/lib/reservation";

export const GET = async (
    req: NextRequest
) => {
return tryOrReturnError(async () => {
  /**
   * TODO: notify Bid winners about their new reservations.
   */
  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const listings = await tx.listing.findMany({
      where: {
        ends: {
          lt: new Date()
        }
      },
      select: {
        id: true,
        availability: true
      }
    });
    listings.forEach(({id, availability}) => {
      availability.forEach(async (interval) => {
        const highestBid = await getHighestBid(tx, id, interval);
        if (!highestBid) return;
        await createReservationTx(tx, {
          userId: highestBid.userId,
          listingId: highestBid.listingId,
          starts: highestBid.starts,
          ends: highestBid.ends,
        })
        
      })
    })
  });

  return new NextResponse();
  
})
  
}

