// import { JWT } from "google-auth-library";
import {getAccessToken, Credentials} from "web-auth-library/google";
const { FIREBASE_SERVICE_ACCOUNT } = process.env;
const serviceAccount: Credentials = JSON.parse(FIREBASE_SERVICE_ACCOUNT as string);

const getFirebaseAccessToken = async () => {
  return await getAccessToken({
    credentials: serviceAccount,
    scope: "https://www.googleapis.com/auth/firebase.messaging",
  })
}

export type FirebaseNotificationData = {
  title: string,
  description: string,
  date: Date
}

export const sendFirebaseCloudMessage = async (token: string, data: FirebaseNotificationData) => {
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

