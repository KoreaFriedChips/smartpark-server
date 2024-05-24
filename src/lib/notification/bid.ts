import SendNotification from "./notification";

export const sendBidExpiredNotification = async (userId: string, amount: number, location: string) => {
  const title = 'Bid expired';
  const description = `Your bid of ${amount} for the parking spot at ${location} has expired`;
  await SendNotification.toAllDevices(userId, title, description);
}

export const sendBidAcceptedNotification = async (userId: string, amount: string, location: string) => {
  const title = 'Bid accepted';
  const description = `Congratulations! Your bid of ${amount} for the parking spot at ${location} has been accepted.`;
  await SendNotification.toAllDevices(userId, title, description);
}

export const sendOutbidNotification = async (userId: string, location: string, amount: number) => {
  const title = 'Outbid!';
  const description = `You have been outbid on the parking spot at ${location}. The current highest bid is ${amount}.`;
  await SendNotification.toAllDevices(userId, title, description);
}

export const sendNewBidReceivedNotification = async (userId: string, amount: number, location: string) => {
  const title = "New bid received";
  const description = `You have received a new bid of ${amount} for your parking spot at ${location}.`
  await SendNotification.toAllDevices(userId, title, description);
}