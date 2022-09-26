import "./Sidebar.css";
import { Navbar } from "../Navbar/Navbar";
import { Search } from "../Search/Search";
import { Chats } from "../Chats/Chats";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar/>
      <Search/>
      <Chats/>
    </div>
  )
}