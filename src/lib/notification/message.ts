import SendNotification from "./notification";

export const sendMessageReadNotification = async (userId: string, senderName: string) => {
  await SendNotification.toAllDevices(
    userId,
    'Message read',
    `${senderName} has read your message.`
  );
}

export const sendMessageDeletedNotification = async (userId: string) => {
  await SendNotification.toAllDevices(
    userId,
    'Message deleted',
    'Your message has been deleted.'
  );
}