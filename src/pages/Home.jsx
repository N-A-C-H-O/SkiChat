import { Sidebar } from "../components/Sidebar/Sidebar";
import { Chat } from "../components/Chat/Chat";

export const Home = () => {
    return(
        <div className="home">
            <div className="home-container">
                <Sidebar/>
                <Chat/>
            </div>
        </div>
    )
}