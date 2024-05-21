import { useContext } from "react";

//style
// import "../../style/navbar.scss";

//firebase
import { signOut } from "firebase/auth";
// import { AuthContext } from "../../context/AuthContext";
import { Context } from "../../..";
import { AuthContext } from "../../../Context/AuthContext";

//components
// import { auth } from "../../firebase";



export default function Navbar() {
const {currentUser} = useContext(AuthContext);
const { auth } = useContext(Context);


  return (
    <div className="navbar">
      <span className="logo">Lama Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="avatar" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </div>
  )
}
