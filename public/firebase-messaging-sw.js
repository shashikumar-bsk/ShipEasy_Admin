// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDJX836RgzOGp9zhSAleKba9t4UA-8E4Fc",
    authDomain: "admin-push-notifications-8a4b5.firebaseapp.com",
    projectId: "admin-push-notifications-8a4b5",
    storageBucket: "admin-push-notifications-8a4b5.appspot.com",
    messagingSenderId: "630502949193",
    appId: "1:630502949193:web:2f257f1c9ec50a93209a98",
    measurementId: "G-X3H0F45KFJ"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
