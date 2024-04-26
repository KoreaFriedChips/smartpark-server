import * as z from "zod"

export const UserModel = z.object({
  id: z.string(),
  name: z.string(),
  clerkId: z.string(),
  description: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  profilePicture: z.string().nullish(),
  activeSince: z.date(),
  verified: z.boolean(),
})