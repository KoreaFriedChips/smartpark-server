import SendNotification from "./notification"

export const sendIdVerificationRequestedNotification = async (userId: string) => {
  await SendNotification.toAllDevices(userId, 'Identity verification requested', 'Please verify your identity to continue using SmartPark.');
}

export const sendIdVerificationApprovedNotification = async (userId: string) => {
  await SendNotification.toAllDevices(userId, 'Identity verification approved', 'Your identity has been verified successfully.');
}

export const sendIdVerificationDeniedNotification = async (userId: string) => {
  await SendNotification.toAllDevices(userId, 'Identity verification denied', 'Your identity verification has been denied. Please try again or contact support.');
}

export const sendVehicleInfoVerificationRequestedNotification = async (
  userId: string
) => {
  await SendNotification.toAllDevices(userId, 'Vehicle information verification requested', 'Please provide your vehicle information for verification.');
}

export const sendVehicleInfoVerificationApprovedNotification = async (
  userId: string
) => {
  await SendNotification.toAllDevices(userId, 'Vehicle information verification approved', 'Your vehicle information has been verified successfully.');
}

export const sendVehicleInfoVerificationDeniedNotification = async (
  userId: string
) => {
  await SendNotification.toAllDevices(userId, 'Vehicle information verification denied', 'Your vehicle information verification has been denied. Please try again or contact support.');
}

