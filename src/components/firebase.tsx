import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, Messaging, MessagePayload } from 'firebase/messaging';

// Firebase configuration object (replace with your own)
const firebaseConfig = {
    apiKey: "AIzaSyDJX836RgzOGp9zhSAleKba9t4UA-8E4Fc",
    authDomain: "admin-push-notifications-8a4b5.firebaseapp.com",
    projectId: "admin-push-notifications-8a4b5",
    storageBucket: "admin-push-notifications-8a4b5.appspot.com",
    messagingSenderId: "630502949193",
    appId: "1:630502949193:web:2f257f1c9ec50a93209a98",
    measurementId: "G-X3H0F45KFJ" // Your Firebase config goes here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging: Messaging = getMessaging(app);

export const requestForToken = async (): Promise<string | null> => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: 'BGwXMzwHQHkCXHWBKQ8EuqYPkredXJa1qMH7fq4WpK2HREYxhn_j5RQxDjmpdUnfHABtL7g5HT6OflNuVh_gWBI' });
    if (currentToken) {
      console.log('Current token for client: ', currentToken);
      // You can now send this token to your server or use it further
      return currentToken;
    } else {
      console.log('No registration token available. Request permission to generate one.');
      return null;
    }
  } catch (err) {
    console.error('An error occurred while retrieving token: ', err);
    return null;
  }
};

export const onMessageListener = (): Promise<MessagePayload> =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
