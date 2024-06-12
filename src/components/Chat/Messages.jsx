import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import '../../styles/chat/messages.scss';
import { Context } from '../..';
import Loader from '../Loader';

export default function Messages({ chat, setCombinedId }) {
  const { auth, db } = useContext(Context);
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const combinedId = chat?.chatId;

  setCombinedId(combinedId);
  console.log(chat);

  useEffect(() => {
    if (!combinedId) return;

    const unsubscribeMessages = onSnapshot(doc(db, 'chats', combinedId), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages);
        setLoading(false);
      }
    });

    const unsubscribeRecipient = onSnapshot(doc(db, 'chats', combinedId), (doc) => {
      if (doc.exists()) {
        setRecipient(doc.data().recipient);
      }
    });

    return () => {
      unsubscribeMessages();
      unsubscribeRecipient();
    }
  }, [combinedId, db]);

  useEffect(() => {
    if (chat) {
      setRecipient({ name: chat.displayName, photo: chat.photoURL });
    }
  }, [chat]);

  // Прокрутка вниз при зміні повідомлень
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Прокрутка вниз після завантаження зображення
  const handleImageLoad = () => {
    scrollToBottom();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="messages">
      {chat && (
        <div className="messages__info">
          {recipient && (
            <>
              <img src={chat.photoURL} alt="avatar" />
              <p>{chat.displayName}</p>
            </>
          )}
        </div>
      )}
      <div className="messages__container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.senderId === user?.uid ? 'myMessage' : 'otherMessage'}`}
          >
            {message.text}
            {message.img && <img src={message.img} alt="Message Attachment" onLoad={handleImageLoad} />}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
