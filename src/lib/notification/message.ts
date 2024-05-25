import SendNotification from "./notification";

export const sendNewMessageReceivedNotification = async (userId: string, senderName: string, location: string) => {
  await SendNotification.toAllDevices(
    userId,
    'New message received',
    `You have received a new message from ${senderName} regarding your parking spot at ${location}.`
  );
}

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