import { Outlet } from "react-router-dom";
import TopBar from "../../shared/components/TopBar";
import { SideBar } from "../../shared/components/SideBar";
import './styles.css'

function Home() {
  return (
    <div>
      <SideBar />
      <TopBar />
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
