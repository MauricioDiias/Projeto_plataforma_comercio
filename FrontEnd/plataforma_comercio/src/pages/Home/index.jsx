import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar";
import { SideBar } from "./components/SideBar";
import "./styles.css";

function Home() {
  return (
    <div style={{ display: "flex" }}>
      <div className="sideBar">
        <SideBar />
      </div>
      <div className="outlet" style={{ flex: 1 }}>
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
