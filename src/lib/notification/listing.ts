import SendNotification from "./notification";

export const sendNewListingCreatedNotification = async (userId: string, location: string) => {
  const title = 'New listing created';
  const description = `Your new parking spot listing at ${location} has been created successfully.`;
  await SendNotification.toAllDevices(userId, title, description);
}

export const sendListingEditedNotification = async (userId: string, location: string) => {
  await SendNotification.toAllDevices(userId, 'Listing edited', `Your parking spot listing at ${location} has been updated.`);
}

export const sendListingExpiredNotification = async(userId: string, location: string) => {
  await SendNotification.toAllDevices(userId, 'Listing expired', `Your parking spot listing at ${location} has expired.`);
}

export const sendListingDeletedNotification = async (userId: string, location: string) => {
  await SendNotification.toAllDevices(userId, 'Listing deleted', `Your parking spot listing at ${location} has been deleted.`);
}

export const sendListingPromotedNotification = async (userId: string, location: string) => {
  await SendNotification.toAllDevices(userId, 'Listing promoted', `Your parking spot listing at ${location} has been promoted.`)
}

