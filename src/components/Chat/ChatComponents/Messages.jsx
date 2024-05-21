import { useContext, useEffect, useState } from "react";
// import { ChatContext } from "../../context/ChatContext";
//firebase
import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "../../firebase";
//style
// import "../../style/messages.scss";
//components
import Message from "./Message";
import { db } from "../../..";
import { ChatContext } from "../../../Context/ChatContext";



export default function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    });

    return () => {
      unSub();
    }
  },[data.chatId])

  return (
    <div className='messages'>
      {messages.map((m) => (
        <Message message={m} key={m.id}/> 
      ))}
    </div>
  )
}
