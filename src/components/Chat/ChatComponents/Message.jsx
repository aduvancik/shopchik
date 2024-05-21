import { useContext, useEffect, useRef } from "react"
// import { AuthContext } from "../../context/AuthContext"
import { ChatContext } from "../../../Context/ChatContext";
import { AuthContext } from "../../../Context/AuthContext";
// import { ChatContext } from "../../context/ChatContesxt";


export default function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({behavior:"smooth"})
  }, [message]);

  return (
    <div ref = {ref}
      className = {`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className = "message__info">
        <img
          src = {message.senderId === currentUser.uid
            ? currentUser.photoURL
            : data.user.photoURL
          }
          alt="avatar"
        />
        <span>just now</span>
      </div>
      <div className="message__content">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="message img" />}
      </div>
    </div>
  )
}
