import React, { useContext, useState, useEffect } from 'react';
import "../styles/login.scss";
import firebase from 'firebase/compat/app';
import { Context } from '..';

export function Login() {
  const { auth } = useContext(Context);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 530);

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  };

  const photo = ["bird2.jpeg", "birds.jpeg", "cat.jpeg", "dog.jpeg", "pexels.jpeg", "sova.jpeg", "tiger.jpeg"];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 530);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='login'>
      <div className='login__container'>
        {!isMobile && photo.map((src => (
          <img src={src} alt={src} key={src} />
        )))}
        <div>
          <h1>Виберіть обліковий запис</h1>
          <h2>щоб перейти в додаток</h2>
        </div>
        <button onClick={login} className='button'>
          Увійти за допомогою Google
        </button>
      </div>
    </div>
  );
}
