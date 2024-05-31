import React, { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../..';
import { doc, getDoc } from 'firebase/firestore';
import "../../styles/chat/sidebar.scss";

export default function Sidebar({ setChat, setSelectedChat, currentUserUid, selectedChat }) {
    const { auth, db } = useContext(Context);
    const [user] = useAuthState(auth);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchChats = async () => {
            if (user) {
                const userChatsRef = doc(db, "usersChats", user.uid);
                const userChatsDoc = await getDoc(userChatsRef);

                if (userChatsDoc.exists()) {
                    const chatsData = userChatsDoc.data();
                    const chatsArray = Object.entries(chatsData).map(([chatId, chatInfo]) => ({
                        chatId,
                        ...chatInfo.userInfo
                    }));
                    setChats(chatsArray);
                }
            }
        };

        fetchChats();
    }, [user, db]);

    const handleSelectChat = (chat) => {
        const combinedId = currentUserUid > chat.uid
            ? `${currentUserUid}_${chat.uid}`
            : `${chat.uid}_${currentUserUid}`;

        console.log(chat,"chat sidebar");
        setSelectedChat(chat);

        // Load the chat data for the selected chat
        getDoc(doc(db, "chats", combinedId)).then(chatDoc => {
            if (chatDoc.exists()) {
                setChat(chatDoc.data());
            } else {
                setChat(null); // Очищення чату, якщо чат не знайдено
            }
        });
    };

    return (
        <div className='sidebar'>
            <h1>Чати</h1>
            <ul className='sidebar__list'>
                {chats.map((chat, index) => (
                    <li key={index} onClick={() => handleSelectChat(chat)} className={selectedChat?.uid === chat.uid ? 'sidebar__item sidebar__item_select' : 'sidebar__item'}>
                        <img src={chat.photoURL} alt="avatar" />
                        {chat.displayName}
                    </li>
                ))}
            </ul>
        </div>
    );
}
