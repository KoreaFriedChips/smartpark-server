import SendNotification from "./notification";

export const sendPaymentReceivedNotification = async (userId: string, amount: string, location: string) => {
  await SendNotification.toAllDevices(
    userId, 
    'Payment received', 
    `You have received a payment of ${amount} for your parking spot at ${location}.`
  );
}

export const sendPaymentSentNotification = async (userId: string, amount: string, location: string) => {
  await SendNotification.toAllDevices(
    userId, 
    'Payment sent', 
    `Your payment of ${amount} for the parking spot at ${location} has been processed.`
  );
}

export const sendPaymentFailedNotification = async(userId: string, amount: string, location: string) => {
  await SendNotification.toAllDevices(
    userId, 
    'Payment failed', 
    `Your payment of ${amount} for the parking spot at ${location} has failed. Please try again.`
  );
}

export const sendPaymentProcessedNotification = async (userId: string, amount: string, location: string) => {
  await SendNotification.toAllDevices(
    userId, 
    'Refund processed', 
    `A refund of ${amount} has been processed for your reservation at ${location}.`
  );
}