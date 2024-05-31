import { sendFCMNotification } from "@/lib/firebase"
import { prisma } from "@/lib/prisma"

const send = async (userId: string, title: string, description: string) => {
  await toAllDevices(userId, title, description);
}

const toAllDevices = async (userId: string, title: string, description: string, path?: string) => {
  const pushTokens = await getUserPushTokens(userId);
  for (const pushToken of pushTokens) {
    await sendFCMNotification(pushToken, { title, description, date: new Date(), path });
  }
}

async function getUserPushTokens (userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { pushTokens: true } });
  if (!user) throw new Error("user not found");
  return user.pushTokens;
}

const SendNotification = {
  send, toAllDevices
}

export default SendNotification;
