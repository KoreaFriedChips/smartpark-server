
import { Prisma } from "@prisma/client/edge";

export const getHighestBid = async (tx: Prisma.TransactionClient, listingId: string, interval: Interval ): Promise<Bid | null> => {
  return await tx.bid.findFirst({
    where: {
      listingId: listingId,
      starts: interval.start,
      ends: interval.end
    },
    orderBy: {
      amount: 'desc'
    }
  });
}