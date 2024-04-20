import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteListing, RelatedListingModel } from "./index"

export const FavoriteModel = z.object({
  id: z.string(),
  userId: z.string(),
  listingId: z.string(),
})

export interface CompleteFavorite extends z.infer<typeof FavoriteModel> {
  user: CompleteUser
  listing: CompleteListing
}

/**
 * RelatedFavoriteModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFavoriteModel: z.ZodSchema<CompleteFavorite> = z.lazy(() => FavoriteModel.extend({
  user: RelatedUserModel,
  listing: RelatedListingModel,
}))
