// import { JWT } from "google-auth-library";
import {getAccessToken, Credentials} from "web-auth-library/google";
const { FIREBASE_SERVICE_ACCOUNT } = process.env;
const serviceAccount: Credentials = JSON.parse(FIREBASE_SERVICE_ACCOUNT as string);
import { prisma } from "./prisma";

export const getUserPushTokens = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { pushTokens: true } });
  if (!user) throw new Error("user not found");
  return user.pushTokens;
}

const getFirebaseAccessToken = async () => {
  return await getAccessToken({
    credentials: serviceAccount,
    scope: "https://www.googleapis.com/auth/firebase.messaging",
  })
}

export type FirebaseNotificationData = {
  title: string,
  description: string,
  date: Date,
  path?: string,
}

const sendFCM = async (token: string, data: any) => {
  const url = `https://fcm.googleapis.com/v1/projects/${serviceAccount.project_id}/messages:send`
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: 'Bearer ' + await getFirebaseAccessToken(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      validate_only: false,
      message:{
        token,
        data,
        notification: {
          title: data.title,
          body: data.description
        }
       }
    })
  });
  return res;
}

export const sendFCMNotification = async (token: string, data: FirebaseNotificationData) => {
  return sendFCM(token, data);
}

export type FirebaseMessageData = FirebaseNotificationData & {
  id: string,
  message: string,
  attachments: string[],
  fromUserId: string,
  toUserId: string,
  otherUserId: string,
  otherUserName: string,
  otherProfilePicture: string,
}

export const sendFCMMessage = async (token: string, data: FirebaseMessageData) => {
  return sendFCM(token, {
    ...data,
    attachments: JSON.stringify(data.attachments),
  });
}

