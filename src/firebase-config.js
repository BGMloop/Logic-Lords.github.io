// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //apiKey: "AIzaSyABUYAqmgqJ3dNbYIkW7z4ucFuagyLF2_s",
  authDomain: "meet-me-halfway-406a5.firebaseapp.com",
  projectId: "meet-me-halfway-406a5",
  storageBucket: "meet-me-halfway-406a5.appspot.com",
  messagingSenderId: "251800307156",
  appId: "1:251800307156:web:3643fe2ee7ac7783828241",
  measurementId: "G-Y98LCGY2LC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
