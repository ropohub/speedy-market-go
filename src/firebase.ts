
// Firebase initialization file
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiOvgweMsdeLRp1n9K0tSSZW5avoOe5gQ",
  authDomain: "ropo-application.firebaseapp.com",
  projectId: "ropo-application",
  storageBucket: "ropo-application.firebasestorage.app",
  messagingSenderId: "851631422269",
  appId: "1:851631422269:web:dcd716163dd848924a6354",
  measurementId: "G-NFQGWTCNBW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export { RecaptchaVerifier };
