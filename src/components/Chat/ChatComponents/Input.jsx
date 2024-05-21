//react
import { useContext, useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
//style
// import "../../style/input.scss";
//context
// import { AuthContext } from "../../context/AuthContext";
// import { ChatContext } from "../../context/ChatContext";
//firebase
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
//value
// import { db, storage } from "../../firebase";
//uuid
import { v4 as uuid } from "uuid";
import { AuthContext } from "../../../Context/AuthContext";
import { ChatContext } from "../../../Context/ChatContext";
import { Context, db } from "../../..";


export default function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { storage } = useContext(Context);

  // const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);



  const handleSend = async (e) => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      console.log(img);
      uploadTask.on(
        (error) => {
          // setErr(error);
          // console.log("помилка", err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            })
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "usersChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + ".data"]: serverTimestamp()
    });

    await updateDoc(doc(db, "usersChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + ".data"]: serverTimestamp()
    });

    setText("");
    setImg(null);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={e => setText(e.target.value)}
        value={text}
      />
      <div className="input__send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={e => setImg(e.target.files[0])}
        />
        <label htmlFor="file"><MdAddPhotoAlternate className="input__icon" /></label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}
