import SendNotification from "./notification";

export const sendRelistExpiredParkingSpotNotification = async (userId: string, location: string) => {
  await SendNotification.toAllDevices(
    userId,
    'Re-list expired parking spot',
    `Your parking spot at ${location} has expired. Re-list now to continue earning!`
  );
}

export const sendUpdateParkingSpotAvailabilityNotification = async (
  userId: string,
  location: string
) => {
  await SendNotification.toAllDevices(
    userId,
    'Update parking spot availability',
    `Reminder: Update your parking spot availability at ${location}.`
  );
}

export const sendLeaveAReviewForRecentReservationNotification = async (
  userId: string,
  location: string
) => {
  await SendNotification.toAllDevices(
    userId,
    'Leave a review for a recent reservation',
    `How was your experience at ${location}? Leave a review now.`
  );
}