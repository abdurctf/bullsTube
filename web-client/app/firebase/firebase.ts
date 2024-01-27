// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User
} from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQdWBKF7im-6QXZ6OBxa7HtL2MR-zleuw",
  authDomain: "bullstube-84e86.firebaseapp.com",
  projectId: "bullstube-84e86",
  appId: "1:147362338417:web:4428d6c9f581ef0417add0",
  measurementId: "G-NZ70K1QE74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);

/**
 * Signs the user in with a Google popup.
 * @returns a promise that resolves with the user's credentials.
 */
export function signInWithGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

/**
 *Signs the user out.
 *@returns a promise that resolves when the user is signed out.
  */
export function signOut() {
  return auth.signOut();
}

/**
 * Trigger a callback when the user auth state changes.
 * @returns A function to unsubscribe callback.
 */
export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}