import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { SideMenu } from "../SideMenu/index";
import "../SideBar/styles.css";
export const SideBar = () => {
  return (
    <div
      style={{
        width: "250px",
        height: "100%",
        position: "fixed",
        backgroundColor: "",
        padding: 0,
        margin: 0,
      }}
    >
      <SideMenu />
    </div>
  );
};
