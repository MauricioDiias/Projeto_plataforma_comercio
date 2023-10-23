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
      label: "Inicio",
      items: [
        {
          label: "Dashboard",
          icon: "pi pi-fw pi-home",
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
          label: "Carteira",
          icon: "pi pi-fw pi-wallet",
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
          label: "Produtos",
          icon: "pi pi-fw pi-shopping-bag",
          command: () => {
            toast.current.show({
              severity: "warn",
              summary: "Delete",
              detail: "Data Deleted",
              life: 3000,
            });
          },
        },
        {
          label: "Vendas",
          icon: "pi pi-fw pi-shopping-cart",
          command: () => {
            // toast.current.show({
            //   severity: "warn",
            //   summary: "Delete",
            //   detail: "Data Deleted",
            //   life: 3000,
            // });
            toast.current.show({
              severity: "success",
              summary: "Submission Received",
              detail: "Thank you, we have received your submission.",
            });
          },
        },
        {
          label: "Clientes",
          icon: "pi pi-fw pi-users",
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
      label: "Cadastros",
      items: [
        {
          label: "Adicionar Produto",
          icon: "pi pi-fw pi-plus",
          url: "http://localhost:5173/home/addProduct",
        },
        {
          label: "Adicionar Categoria",
          icon: "pi pi-fw pi-plus",
          url: "http://localhost:5173/home/addCategory",
        },
        {
          label: "Upload",
          icon: "pi pi-fw pi-upload",
          command: () => {},
        },
      ],
    },
    {
      label: "Loja",
      items: [
        {
          label: "Minha Loja",
          icon: "pi pi-fw pi-external-link",
          url: "https://reactjs.org/",
        },
        {
          label: "Logout",
          icon: "pi pi-fw pi-sign-out",
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
      <Menu model={[{}]} className="custom-menu-botom" />
    </div>
  );
};
