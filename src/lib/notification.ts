import { sendFirebaseCloudMessage } from "./firebase"
import { prisma } from "./prisma"

export const sendNotification = async (userId: string, title: string, description: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { pushTokens: true } });
  if (!user) throw new Error("user not found");
  for (const pushToken of user.pushTokens) {
    sendFirebaseCloudMessage(pushToken, { title, description, date: new Date() });
  }
}