// import { Outlet } from "react-router-dom";
import { Outlet } from "react-router-dom";
import LeftMenu from "../../shared/components";
import TopBar from "../../shared/components/TopBar";

function Home() {
  return (
    <>
      <LeftMenu />
      <TopBar />
      <div style={{marginLeft:'250px'}}>

      <Outlet/>
      </div>
    </>
  );
}

export default Home;
