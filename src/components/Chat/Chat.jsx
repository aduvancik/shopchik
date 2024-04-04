import React, { useContext, useState } from 'react';
import { Context } from '../..';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loader from './Loader';
import firebase from 'firebase/compat/app';

export function Chat() {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  const [messages, loading] = useCollectionData(
    firestore.collection("messages").orderBy("createdAt")
  );

  if (loading) {
    return <Loader />
  }

  const sendMessage = async () => {
    firestore.collection("messages").add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    setValue("");
  }

  return (
    <div>
      <div>
        {messages.map((message) =>
          <>
            <div className={user.uid === message.uid ? "red" : ""}>
              <img src={message.photoURL} alt="avatar" />
              <div>{message.displayName}</div>
            </div>
            <div>{message.text}</div>
          </>
        )}
      </div>
      <div>
        <input
          type='text'
          className='input'
          onChange={e => setValue(e.target.value)}
        />
        <button
          type='button'
          className='button'
          onClick={sendMessage}
        >Надіслати</button>
      </div>
    </div>
  )
}
