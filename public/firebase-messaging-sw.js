importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);
// Replace these with your own Firebase config keys...

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
  console.log(
    "[firebase-messaging-sw.js] Received background message",
    payload
  );

  const link = payload.fcmOptions?.link || payload.data?.link;
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logo.png",
    data: { url: link },
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
self.addEventListener("notificationclick", function (event) {
  console.log("[firebase-messaging-sw.js] Notification click received.");
  event.notification.close();

  event.waitUntil(
    clients
      // https://developer.mozilla.org/en-US/docs/Web/API/Clients/matchAll
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        const url = event.notification.data.url;
        if (!url) return;

        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          console.log("OPENWINDOW ON CLIENT");
          return clients.openWindow(url);
        }
      })
  );
});


