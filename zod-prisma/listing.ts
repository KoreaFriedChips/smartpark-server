import * as z from "zod"

export const IntervalModel = z.object({
  start: z.date(),
  end: z.date()
});

export const ListingModel = z.object({
  id: z.string(),
  thumbnail: z.string(),
  images: z.string().array(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  distance: z.coerce.number(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  listingType: z.string(),
  startingPrice: z.coerce.number(),
  buyPrice: z.coerce.number(),
  duration: z.string(),
  relist: z.boolean(),
  relistDuration: z.string().nullish(),
  description: z.string().nullish(),
  availability: IntervalModel.array(),
  active: z.boolean(),
  date: z.date(),
  ends: z.date().nullish(),
  bids: z.coerce.number().int(),
  capacity: z.coerce.number().int(),
  spotsLeft: z.coerce.number().int(),
  tags: z.string().array(),
  amenities: z.string().array(),
  userId: z.string(),
})
