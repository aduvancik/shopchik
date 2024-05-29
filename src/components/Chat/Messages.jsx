import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import '../../styles/chat/messages.scss';
import { Context } from '../..';

export default function Messages({ combinedId, chat }) {
    const { auth, db } = useContext(Context);
    const [user] = useAuthState(auth);
    const [messages, setMessages] = useState([]);
    const [reciplient, setReciplient] = useState([]);

    useEffect(() => {
        if (!combinedId) return;

        const unsubscribe = onSnapshot(doc(db, 'chats', combinedId), (doc) => {
            if (doc.exists()) {
                setMessages(doc.data().messages);
            }

        });
        const reciplient = onSnapshot(doc(db, 'usersChats', user.uid), (doc) => {
            if (doc.exists()) {
                setReciplient(doc.data().recipient);
            }

        });


        return () => {
            unsubscribe();
            reciplient();
        }
    }, [combinedId, db]);
    console.log(reciplient, "reciplient", user.uid);

    return (
        <div className="messages">
            {chat && (
                <div className="messages__info">
                    {/* <p>{reciplient.name}</p> */}
                    {/* <img src={reciplient.photo} alt="avatar" /> */}
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
