import React, { useEffect, useState, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import '../../styles/chat/messages.scss';
import { Context } from '../..';

export default function Messages({ combinedId, chat }) {
    const { auth, db } = useContext(Context);
    const [user] = useAuthState(auth);
    const [messages, setMessages] = useState([]);
    const [recipient, setRecipient] = useState(null);

    // console.log(chat);

    useEffect(() => {
        if (!combinedId) return;

        const unsubscribeMessages = onSnapshot(doc(db, 'chats', combinedId), (doc) => {
            if (doc.exists()) {
                setMessages(doc.data().messages);
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
    }, [combinedId, db, user.uid]);

    if (!recipient) {
        setRecipient({ name: chat.displayName, photo: chat.photoURL })
    }

    // console.log(recipient);

    return (
        <div className="messages">
            {chat && (
                <div className="messages__info">
                    {recipient && (
                        <>
                            <img src={recipient.photo} alt="avatar" />
                            <p>{recipient.name}</p>
                        </>
                    )}
                    <p>{chat.id}</p>
                </div>
            )}
            <div className="messages__container">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message ${message.senderId === user?.uid ? 'myMessage' : 'otherMessage'}`}
                    >
                        {message.text}
                        {message.img && <img src={message.img} alt="Message Attachment" />}
                    </div>
                ))}
            </div>
        </div>
    );
}
