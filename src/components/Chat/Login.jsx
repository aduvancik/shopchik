import React, { useContext, useState } from 'react';
//style
import "../../styles/login.scss";
//firebase
import firebase from 'firebase/compat/app';
import { Context } from '../..';

export function Login() {
  const { auth } = useContext(Context);

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
  };

  const photo = ["bird2.jpeg", "birds.jpeg", "cat.jpeg", "dog.jpeg", "pexels.jpeg", "sova.jpeg", "tiger.jpeg"];




  return (
    <div
      className='login'
    >
      <div
        className='login__container'
      >
        {photo.map((src => (
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
