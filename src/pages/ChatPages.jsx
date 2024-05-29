import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router-dom";
import { Context } from "..";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import Sidebar from "../components/Chat/Sidebar";
import Input from "../components/Chat/Input";
import Messages from "../components/Chat/Messages";
import "../styles/chat/chatPages.scss";

export default function ChatPages() {
  const { auth, storage, db } = useContext(Context);
  const location = useLocation();
  const product = location.state && location.state.product;
  const [user] = useAuthState(auth);
  const [chat, setChat] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const currentUserUid = user?.uid;
  const userUid = product?.uidUser;
  const [combinedId, setCombinedId] = useState("");

  useEffect(() => {
    if (!currentUserUid || !userUid) return;

    const initializeChat = async (userUid) => {
      const combinedId = currentUserUid > userUid
        ? `${currentUserUid}_${userUid}`
        : `${userUid}_${currentUserUid}`;

      setCombinedId(combinedId);

      try {
        const chatDoc = await getDoc(doc(db, "chats", combinedId));

        if (!chatDoc.exists()) {
          await setDoc(doc(db, "chats", combinedId), { messages: [], recipient: { name: product.displayName, photo: product.photoURL } });

          const currentUserChatsRef = doc(db, "usersChats", currentUserUid);
          const otherUserChatsRef = doc(db, "usersChats", userUid);

          if (!(await getDoc(currentUserChatsRef)).exists()) {
            await setDoc(currentUserChatsRef, {});
          }

          if (!(await getDoc(otherUserChatsRef)).exists()) {
            await setDoc(otherUserChatsRef, {});
          }

          await updateDoc(currentUserChatsRef, {
            [`${combinedId}.userInfo`]: {
              uid: userUid,
              displayName: product.displayName,
              photoURL: product.photoURL
            },
            [`${combinedId}.date`]: serverTimestamp()
          });

          await updateDoc(otherUserChatsRef, {
            [`${combinedId}.userInfo`]: {
              uid: currentUserUid,
              displayName: user?.displayName,
              photoURL: user?.photoURL
            },
            [`${combinedId}.date`]: serverTimestamp()
          });
        }

        setChat(chatDoc.data());
        setSelectedChat({
          displayName: product.displayName,
          photoURL: product.photoURL,
          uid: userUid
        });
      } catch (err) {
        console.error("Помилка при створенні чату: ", err);
      }
    };

    initializeChat(userUid);
  }, [currentUserUid, userUid, product, db, user?.displayName, user?.photoURL]);

  return (
    <div className='chat'>
      <div className="chat__container">
        <Sidebar setChat={setChat} selectedChat={selectedChat} setSelectedChat={setSelectedChat} currentUserUid={currentUserUid} />
        {chat ? (
          <div className="chat__messagesInput">
            <Messages combinedId={combinedId} chat={selectedChat} />
            <Input currentUserUid={currentUserUid} chat={selectedChat} combinedId={combinedId} db={db} storage={storage} />
          </div>
        ) : (<h1>Відкрийте чат</h1>)}
      </div>
    </div>
  );
}
