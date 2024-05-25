import SendNotification from "./notification";

export const sendNewFeatureAnnouncementNotification = async (userId: string, featureName: string) => {
  await SendNotification.toAllDevices(
    userId,
    'New feature announcement',
    `Check out our new feature: ${featureName}`
  );
}

export const sendAppUpdateAvailableNotification = async (userId: string) => {
  await SendNotification.toAllDevices(
    userId,
    'App update available',
    'A new version of SmartPark is available. Update now for the latest features and improvements.'
  );
}

export const sendPromotionalOffersNotification = async (userId: string, offerDetails: string) => {
  await SendNotification.toAllDevices(
    userId,
    'Promotional offers',
    `Special offer: ${offerDetails}. Book now!`
  );
}

export const sendDiscountCodesNotification = async (userId: string, promoCode: string, discount: string) => {
  await SendNotification.toAllDevices(
    userId,
    'Discount codes',
    `Use promo code ${promoCode} for ${discount}% off your next reservation!`
  );
}