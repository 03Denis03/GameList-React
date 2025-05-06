import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDyDYLN0q6glY1bnnwvMGLajxgqMlQXaFA",
    authDomain: "gamelistapp.firebaseapp.com",
    projectId: "gamelistapp",
    storageBucket: "gamelistapp.firebasestorage.app",
    messagingSenderId: "1033812333600",
    appId: "1:1033812333600:web:5a57e14796747661791845",
    measurementId: "G-80EE8J5FWP"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);
