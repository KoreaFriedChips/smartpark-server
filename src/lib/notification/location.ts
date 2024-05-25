import SendNotification from "./notification";

export const sendNearbySpotsAvailableNotification = async (userId: string, number: string, location: string) => {
  await SendNotification.toAllDevices(
    userId,
    'Nearby spots available',
    `${number} parking spots are available near ${location}.`
  );
}

export const sendPriceDropsNotification = async (userId: string, location: string) => {
  await SendNotification.toAllDevices(
    userId,
    'Price drops for parking spots in your area',
    `Prices for parking spots near ${location} have dropped. Book now to save!`
  );
}