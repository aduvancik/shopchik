
// import "../style/home.scss";
import Sidebar from "../components/Chat/ChatComponents/Sidebar";
import Chat1 from "../components/Chat/ChatComponents/Chat1";


export default function ChatPages() {
  return (
    <div className='home'>
      <div className="container">
        <Sidebar />
        <Chat1 />
      </div>
    </div>

  )
}
