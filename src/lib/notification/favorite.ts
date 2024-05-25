import SendNotification from "./notification";

export const sendSpotAddedToFavoritesNotification = async (
  userId: string, 
  location: string,
  listingId: string,
) => {
  await SendNotification.toAllDevices(
    userId,
    'Spot added to favorites',
    `The parking spot at ${location} has been added to your favorites.`,
    `/listing/${listingId}/`
  );
}

export const sendSpotRemovedFromFavoritesNotification = async (
  userId: string, 
  location: string,
  listingId: string,
) => {
  await SendNotification.toAllDevices(
    userId,
    'Spot removed from favorites',
    `The parking spot at ${location} has been removed from your favorites.`,
    `/listing/${listingId}/`
  );
}

export const sendPriceChangeForFavoriteNotification = async (
  userId: string, 
  location: string, 
  newPrice: string,
  listingId: string,
) => {
  await SendNotification.toAllDevices(
    userId,
    'Price change for a favorite spot',
    `The price for your favorite parking spot at ${location}] has changed to ${newPrice}.`,
    `/listing/${listingId}/`
  );
}

