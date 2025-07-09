import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBT_qxQIly4mT-3_ZgroGzW--VBV_2Yw_s",
    authDomain: "virtusfood-1b45e.firebaseapp.com",
    projectId: "virtusfood-1b45e",
    storageBucket: "virtusfood-1b45e.firebasestorage.app",
    messagingSenderId: "287506550055",
    appId: "1:287506550055:web:86695ae6f43ae903946d02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app; 