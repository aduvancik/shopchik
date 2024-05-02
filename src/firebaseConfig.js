import {initializeApp} from 'firebase/compat/app';
import {getStogare} from "firebase/compat/stogare";
import {getFirestore} from "firebase/compat/stogare";


const firebaseConfig = {
    apiKey: "AIzaSyBIXPOEZrN_FzFqfT_AnoEhlzk_4LVCiMo",
    authDomain: "shopchik-3c85d.firebaseapp.com",
    projectId: "shopchik-3c85d",
    storageBucket: "shopchik-3c85d.appspot.com",
    messagingSenderId: "789231623692",
    appId: "1:789231623692:web:16b94872b79d0920ce9829",
    measurementId: "G-7RV0JVBQJ2"
  };

const app = initializeApp(firebaseConfig);
const storage = getStogare(app);
const firestore = getFirestore(app);

export {storage, firestore};
