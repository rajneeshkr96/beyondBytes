// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCsNjrXVg9NF1vY9GWg0VRYuxwJ9TO51Sw",
  authDomain: "biyondbyte-notification.firebaseapp.com",
  projectId: "biyondbyte-notification",
  storageBucket: "biyondbyte-notification.appspot.com",
  messagingSenderId: "692163139491",
  appId: "1:692163139491:web:cd00c1d2b214e7b51cec16",
  measurementId: "G-544VZHHJP0"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
