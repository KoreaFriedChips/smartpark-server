import { z } from "zod";

export const CreateMessageModel = z.object({
  message: z.string(),
  date: z.coerce.date(),
  attachments: z.string().array(),
  fromUserId: z.string(),
  toUserId: z.string(),
});