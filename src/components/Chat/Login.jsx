import React, { useContext } from 'react';
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
    console.log(user);
  }

  return (
    <div className='login'>
      <div className='login__container'>
        <h1>Ввійти</h1>
        <button onClick={login} className='button'>Ввійти за допомогою Google</button>
      </div>
    </div>
  )
}
