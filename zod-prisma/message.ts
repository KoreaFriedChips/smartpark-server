import { z } from "zod";

export const CreateMessageModel = z.object({
  message: z.string(),
  date: z.coerce.date(),
  attachments: z.string().array(),
  fromUserId: z.string(),
  toUserId: z.string(),
});

export const MessageModel = z.object({
  id: z.string(),
  message: z.string(),
  date: z.coerce.date(),
  attachments: z.string().array(),
  fromUserId: z.string(),
  toUserId: z.string(),
})

export type Message = z.infer<typeof MessageModel>;