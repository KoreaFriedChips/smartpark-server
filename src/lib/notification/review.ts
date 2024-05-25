import SendNotification from "./notification";

export const sendNewReviewReceivedNotification = async (userId: string, location: string) => {
  await SendNotification.toAllDevices(
    userId,
    'New review received',
    `You have received a new review for your parking spot at ${location}.`
  );
}

export const sendReviewResponseAddedNotification = async (userId: string, location: string) => {
  await SendNotification.toAllDevices(
    userId,
    'Review response added',
    `A response has been added to your review for the parking spot at ${location}.`
  );
}