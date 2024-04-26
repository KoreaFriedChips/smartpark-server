import * as z from "zod"

export const ReservationModel = z.object({
  id: z.string(),
  starts: z.date(),
  ends: z.date(),
  userId: z.string(),
  listingId: z.string()
});