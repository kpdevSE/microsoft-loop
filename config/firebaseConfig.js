// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "newapp-c9ff1.firebaseapp.com",
  projectId: "newapp-c9ff1",
  storageBucket: "newapp-c9ff1.appspot.com",
  messagingSenderId: "188863101463",
  appId: "1:188863101463:web:77ce1d56688870b6fc7a52",
  measurementId: "G-4W8Z1YYZ72",
};

// Initialize Firebase
let app, db, analytics;
if (typeof window !== "undefined") {
  // Initialize Firebase only on the client side
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  analytics = getAnalytics(app);
}

export { app, db, analytics };
