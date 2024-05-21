import { useContext, useState } from "react";

//style
// import "../../style/search.scss";

//components
// import { db } from "../../firebase";
// import { AuthContext } from "../../../Context/AuthContext";

//firebase
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../../..";
import { AuthContext } from "../../../Context/AuthContext";

export default function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext)

  const hundleSearch = async () => {
    const q = query(collection(db, "users"),
      where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    } catch (err) {
      setErr(true)
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && hundleSearch();
  };

  const handleSelect = async () => {
    const combinedId = currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [1] })
        //create user chat
        await updateDoc(doc(db, "usersChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId + ".data"]: serverTimestamp()
        })
        await updateDoc(doc(db, "usersChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId + ".data"]: serverTimestamp()
        })
      };
    } catch (err) {
      setErr(true);
    }

    setUser(null);
    setUsername("")
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="avatar" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}
