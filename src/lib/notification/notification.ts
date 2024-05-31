import { sendFCMNotification } from "@/lib/firebase"
import { getUserPushTokens } from "@/lib/firebase";
const send = async (userId: string, title: string, description: string) => {
  await toAllDevices(userId, title, description);
}

const toAllDevices = async (userId: string, title: string, description: string, path?: string) => {
  const pushTokens = await getUserPushTokens(userId);
  for (const pushToken of pushTokens) {
    await sendFCMNotification(pushToken, { title, description, date: new Date(), path });
  }
}

const SendNotification = {
  send, toAllDevices
}

export default SendNotification;
