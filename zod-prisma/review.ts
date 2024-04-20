import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteListing, RelatedListingModel } from "./index"

export const ReviewModel = z.object({
  id: z.string(),
  rating: z.coerce.number(),
  review: z.string(),
  date: z.date(),
  listingId: z.string(),
  userId: z.string(),
})

export interface CompleteReview extends z.infer<typeof ReviewModel> {
  reviewer: CompleteUser
  listing: CompleteListing
}

/**
 * RelatedReviewModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedReviewModel: z.ZodSchema<CompleteReview> = z.lazy(() => ReviewModel.extend({
  reviewer: RelatedUserModel,
  listing: RelatedListingModel,
}))
