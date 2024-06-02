import React, { useEffect, useState, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import '../../styles/chat/messages.scss';
import { Context } from '../..';

export default function Messages({chat,setCombinedId, combinedIdl }) {
    const { auth, db } = useContext(Context);
    const [user] = useAuthState(auth);
    const [messages, setMessages] = useState([]);
    const [recipient, setRecipient] = useState(null);

    const combinedId = chat.chatId;
    console.log(combinedId);
    setCombinedId(combinedId);

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
    }, [combinedId, db]);

    // Оновлюємо одержувача, коли змінюється обраний чат
    useEffect(() => {
        if (chat) {
            setRecipient({ name: chat.displayName, photo: chat.photoURL });
        }
    }, [chat]);

    // console.log(chat);

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
