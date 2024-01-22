// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQdWBKF7im-6QXZ6OBxa7HtL2MR-zleuw",
  authDomain: "bullstube-84e86.firebaseapp.com",
  projectId: "bullstube-84e86",
  storageBucket: "bullstube-84e86.appspot.com",
  messagingSenderId: "147362338417",
  appId: "1:147362338417:web:4428d6c9f581ef0417add0",
  measurementId: "G-NZ70K1QE74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);