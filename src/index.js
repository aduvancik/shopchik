import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
//firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

//initialize Firevase
firebase.initializeApp( {
    apiKey: "AIzaSyBIXPOEZrN_FzFqfT_AnoEhlzk_4LVCiMo",
    authDomain: "shopchik-3c85d.firebaseapp.com",
    projectId: "shopchik-3c85d",
    storageBucket: "shopchik-3c85d.appspot.com",
    messagingSenderId: "789231623692",
    appId: "1:789231623692:web:16b94872b79d0920ce9829",
    measurementId: "G-7RV0JVBQJ2"
  }
);

export const Context = createContext(null);


const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Context.Provider value={{
      firebase,
      auth,
      firestore,
      storage
    }}>
      <App />
    </Context.Provider>
  // </React.StrictMode>
);


