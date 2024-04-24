import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteListing, RelatedListingModel, CompleteConfirmation, RelatedConfirmationModel } from "./index"

export const TransactionModel = z.object({
  id: z.string(),
  transactionDate: z.date(),
  amount: z.coerce.number(),
  paymentMethod: z.string().nullish(),
  userId: z.string(),
  listingId: z.string(),
})

export interface CompleteTransaction extends z.infer<typeof TransactionModel> {
  user: CompleteUser
  listing: CompleteListing
  confirmations: CompleteConfirmation[]
}

/**
 * RelatedTransactionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTransactionModel: z.ZodSchema<CompleteTransaction> = z.lazy(() => TransactionModel.extend({
  user: RelatedUserModel,
  listing: RelatedListingModel,
  confirmations: RelatedConfirmationModel.array(),
}))
