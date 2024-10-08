import moment from "moment";
import SendNotification from "./notification";

function format(date: Date) {
  return moment(date).format('MMMM Do, h:mm a');
}

export const sendReservationConfirmationNotification = async (
  userId: string, 
  location: string, 
  interval: Interval,
  reservationId: string,
) => {
  const title = 'Reservation confirmation';
  const description = `Your reservation for the parking spot at ${location} from ${format(interval.start)} to ${format(interval.end)} has been confirmed.`;
  const path = `/reservation/${reservationId}/`;
  await SendNotification.toAllDevices(userId, title, description, path);
}

export const sendReservationReminderNotification = async (
  userId: string, 
  location: string, 
  startDate: Date,
  reservationId: string,
) => {
  const title = 'Reservation reminder';
  const description = `Reminder: Your reservation for the parking spot at ${location} starts in ${moment(startDate).fromNow()}.`;
  const path = `/reservation/${reservationId}/`;
  await SendNotification.toAllDevices(userId, title, description, path);
}

export const sendReservationStartedNotification = async (
  userId: string, 
  location: string,
  reservationId: string,
) => {
  const title = 'Resevation started';
  const description = `Your reservation for the parking spot at ${location} has started. Enjoy your parking!`;
  const path = `/reservation/${reservationId}/`;
  await SendNotification.toAllDevices(userId, title, description, path);
}

export const sendReservationEndedNotification = async (
  userId: string, 
  location: string,
  reservationId: string,
) => {
  const title = 'Reservation ended';
  const description = `Your reservation for the parking spot at ${location} has ended. Thank you for using SmartPark!`;
  const path = `/reservation/${reservationId}/`;
  await SendNotification.toAllDevices(userId, title, description, path);
}

export const sendReservationCanceledNotification = async (
  userId: string, 
  location: string,
  reservationId: string,
) => {
  const title = 'Reservation canceled';
  const description = `Your reservation for the parking spot at ${location} has been canceled.`;
  const path = `/reservation/${reservationId}/`;
  await SendNotification.toAllDevices(userId, title, description, path);
}