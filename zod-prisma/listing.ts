import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteReview, RelatedReviewModel, CompleteBid, RelatedBidModel, CompleteTransaction, RelatedTransactionModel, CompleteFavorite, RelatedFavoriteModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.coerce.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const ListingModel = z.object({
  id: z.string(),
  thumbnail: z.string(),
  images: z.string().array(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  distance: z.coerce.number(),
  city: z.string(),
  state: z.string(),
  listingType: z.string(),
  price: z.coerce.number(),
  duration: z.string(),
  relist: z.boolean(),
  relistDuration: z.string().nullish(),
  description: z.string().nullish(),
  availability: jsonSchema,
  active: z.boolean(),
  rating: z.coerce.number(),
  reviews: z.coerce.number().int(),
  date: z.date(),
  ends: z.date().nullish(),
  bids: z.coerce.number().int(),
  capacity: z.coerce.number().int(),
  spotsLeft: z.coerce.number().int(),
  tags: z.string().array(),
  amenities: z.string().array(),
  sellerId: z.string(),
})

export interface CompleteListing extends z.infer<typeof ListingModel> {
  seller: CompleteUser
  spotReviews: CompleteReview[]
  Bid: CompleteBid[]
  Transaction: CompleteTransaction[]
  Favorite: CompleteFavorite[]
}

/**
 * RelatedListingModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedListingModel: z.ZodSchema<CompleteListing> = z.lazy(() => ListingModel.extend({
  seller: RelatedUserModel,
  spotReviews: RelatedReviewModel.array(),
  Bid: RelatedBidModel.array(),
  Transaction: RelatedTransactionModel.array(),
  Favorite: RelatedFavoriteModel.array(),
}))
