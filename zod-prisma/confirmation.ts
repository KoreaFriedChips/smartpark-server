import * as z from "zod"
import { CompleteTransaction, RelatedTransactionModel, CompleteUser, RelatedUserModel } from "./index"

export const ConfirmationModel = z.object({
  id: z.string(),
  confirmed: z.date(),
  transactionId: z.string(),
  userId: z.string(),
})

export interface CompleteConfirmation extends z.infer<typeof ConfirmationModel> {
  transaction: CompleteTransaction
  user: CompleteUser
}

/**
 * RelatedConfirmationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedConfirmationModel: z.ZodSchema<CompleteConfirmation> = z.lazy(() => ConfirmationModel.extend({
  transaction: RelatedTransactionModel,
  user: RelatedUserModel,
}))
