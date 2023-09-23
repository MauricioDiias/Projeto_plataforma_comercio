import { useRef } from "react";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import "./styles.css";

export const SideMenu = () => {
  const toast = useRef(null);

  const itemsSideTop = [
    {
      label: "ESTOQUE PRIME",
      icon: "custom-icon pi pi-fw pi-box",
    },
  ];
  const itemsSideMenu = [
    {
      label: "Options",
      items: [
        {
          label: "Update",
          icon: "pi pi-fw pi-plus",
          command: () => {
            toast.current.show({
              severity: "success",
              summary: "Updated",
              detail: "Data Updated",
              life: 3000,
            });
          },
        },
        {
          label: "Delete",
          icon: "pi pi-times",
          command: () => {
            toast.current.show({
              severity: "warn",
              summary: "Delete",
              detail: "Data Deleted",
              life: 3000,
            });
          },
        },
      ],
    },
    {
      label: "Links",
      items: [
        {
          label: "React Website",
          icon: "pi pi-external-link",
          url: "https://reactjs.org/",
        },
        {
          label: "Upload",
          icon: "pi pi-upload",
          command: () => {},
        },
      ],
    },
  ];

  return (
    <div>
      <Menu model={itemsSideTop} className="menu-top" />
      <Toast ref={toast} />
      <Menu model={itemsSideMenu} className="custom-menu" />
      <Menu model={[]} className="custom-menu-botom" />
    </div>
  );
};
