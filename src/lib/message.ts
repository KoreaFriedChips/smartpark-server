import { sendFCMMessage } from "@/lib/firebase"
import { getUserPushTokens } from "@/lib/firebase";
import { Message } from '@zod-prisma';

const toAllDevices = async (message: Message, senderName: string, senderProfilePicture: string) => {
  const pushTokens = await getUserPushTokens(message.toUserId);
  for (const pushToken of pushTokens) {
    await sendFCMMessage(pushToken, { 
      title: 'New message received', 
      description: `You have received a new message from ${senderName}.`, 
      path: `/messages/${message.fromUserId}/`,
      ...message,
      otherUserId: message.fromUserId,
      otherUserName: senderName,
      otherProfilePicture: senderProfilePicture,
    });
  }
}

const SendMessage = {
  toAllDevices
}

export default SendMessage;
