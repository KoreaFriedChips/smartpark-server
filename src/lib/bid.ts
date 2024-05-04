
import { prisma } from "@/lib/prisma";
export const getHighestBid = async (listingId: string, interval: Interval ): Promise<Bid | null> => {
  return await prisma.bid.findFirst({
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