import { useContext, useEffect, useState } from "react";
//style
// import "../../style/chats.scss";
//firebase
import { doc, onSnapshot } from "firebase/firestore";
//components
// import { db } from "../../firebase";
// import { AuthContext } from "../../context/AuthContext";
// import { ChatContext } from "../../context/ChatContext";
import { db } from "../../..";
import { ChatContext } from "../../../Context/ChatContext";
import { AuthContext } from "../../../Context/AuthContext";

export default function Chats() {

  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  
  useEffect(() => {
    const getChats = async () => {
      const unsub = onSnapshot(doc(db, "usersChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    
    dispatch({ type: "CHANGE_USER", payload: u });
  }

  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a, b) => b[1].data - a[1].data).map(chat => (
        <div 
        className="userChat" 
        key={[chat[0]]}
        onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="avatar" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
