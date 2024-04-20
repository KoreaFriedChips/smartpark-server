import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteListing, RelatedListingModel } from "./index"

export const BidModel = z.object({
  id: z.string(),
  amount: z.coerce.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  listingId: z.string(),
})

export interface CompleteBid extends z.infer<typeof BidModel> {
  user: CompleteUser
  listing: CompleteListing
}

/**
 * RelatedBidModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedBidModel: z.ZodSchema<CompleteBid> = z.lazy(() => BidModel.extend({
  user: RelatedUserModel,
  listing: RelatedListingModel,
}))
