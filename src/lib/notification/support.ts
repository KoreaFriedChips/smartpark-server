import SendNotification from "./notification";

export const sendTicketCreatedNotification = async (
  userId: string,
  ticketNumber: string
) => {
  await SendNotification.toAllDevices(
    userId,
    'Ticket created',
    `Your support ticket has been created. Ticket ID: ${ticketNumber}.`
  );
}

export const sendTicketUpdatedNotification = async (
  userId: string,
  ticketNumber: string
) => {
  await SendNotification.toAllDevices(
    userId,
    'Ticket updated',
    `Your support ticket ${ticketNumber} has been updated.`
  );
}

export const sendTicketResolvedNotification = async (
  userId: string,
  ticketNumber: string 
) => {
  await SendNotification.toAllDevices(
    userId,
    'Ticket resolved',
    `Your support ticket ${ticketNumber} has been resolved.`
  );
}