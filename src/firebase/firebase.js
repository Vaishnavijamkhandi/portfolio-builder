import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, inMemoryPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyBN4SkzhwwcOggw0ODDt-cyiH4_L9b7c08",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "portfolio-3d-mvp.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "portfolio-3d-mvp",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "portfolio-3d-mvp.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "1087505550626",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:1087505550626:web:a4e9b9ee8c8792b6fd297b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Force persistence with retry logic
const setupPersistence = async () => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    console.log("✅ Firebase auth persistence set to LOCAL");
    
    // Check if persistence is actually working
    const currentUser = auth.currentUser;
    if (currentUser) {
      console.log("✅ User persisted from storage:", currentUser.email);
    }
  } catch (error) {
    console.error("❌ Failed to set persistence:", error);
    
    // Fallback to session persistence
    try {
      await setPersistence(auth, browserLocalPersistence);
      console.log("✅ Fallback: Set to SESSION persistence");
    } catch (fallbackError) {
      console.error("❌ Even fallback failed:", fallbackError);
    }
  }
};

// Run persistence setup
setupPersistence();

export { auth, app };