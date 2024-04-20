import * as z from "zod"
import { CompleteListing, RelatedListingModel, CompleteReview, RelatedReviewModel, CompleteBid, RelatedBidModel, CompleteTransaction, RelatedTransactionModel, CompleteFavorite, RelatedFavoriteModel, CompleteConfirmation, RelatedConfirmationModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  name: z.string(),
  clerkId: z.string(),
  description: z.string().nullish(),
  rating: z.coerce.number(),
  reviews: z.coerce.number().int(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  profilePicture: z.string().nullish(),
  activeSince: z.date(),
  verified: z.boolean(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  listings: CompleteListing[]
  Review: CompleteReview[]
  Bid: CompleteBid[]
  Transaction: CompleteTransaction[]
  Favorite: CompleteFavorite[]
  Confirmation: CompleteConfirmation[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  listings: RelatedListingModel.array(),
  Review: RelatedReviewModel.array(),
  Bid: RelatedBidModel.array(),
  Transaction: RelatedTransactionModel.array(),
  Favorite: RelatedFavoriteModel.array(),
  Confirmation: RelatedConfirmationModel.array(),
}))
