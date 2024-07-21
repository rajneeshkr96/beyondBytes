// firebase.ts
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCsNjrXVg9NF1vY9GWg0VRYuxwJ9TO51Sw",
  authDomain: "biyondbyte-notification.firebaseapp.com",
  projectId: "biyondbyte-notification",
  storageBucket: "biyondbyte-notification.appspot.com",
  messagingSenderId: "692163139491",
  appId: "1:692163139491:web:cd00c1d2b214e7b51cec16",
  measurementId: "G-544VZHHJP0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
