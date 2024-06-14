import React, { useContext, useState, useEffect, useRef } from 'react';
import "../styles/login.scss";
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { Context } from '..';

export function Login() {
  const { auth } = useContext(Context);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 530);
  const photo = ["bird2.jpeg", "birds.jpeg", "cat.jpeg", "dog.jpeg", "pexels.jpeg", "sova.jpeg", "tiger.jpeg"];


  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
  };

  return (
    <div className='login'>
      <div className='login__container'>
        {!(window.innerWidth < 530) && photo.map((src => (
          <img src={src} alt={src} key={src} />
        )))}
        <div>
          <h1>Виберіть обліковий запис</h1>
          <h2>щоб перейти в додаток</h2>
        </div>
        <button onClick={login} className='button'>Увійти за допомогою
          Google</button>
      </div>
    </div>
  );
}
