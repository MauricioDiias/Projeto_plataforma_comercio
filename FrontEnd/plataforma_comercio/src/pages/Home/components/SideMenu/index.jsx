import { useRef } from "react";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import "./styles.css";
import { Link } from "react-router-dom";

export const SideMenu = () => {
  const toast = useRef(null);

  const itemsSideTop = [
    {
      label: "ESTOQUE PRIME",
      icon: "custom-icon pi pi-fw pi-box",
      onclick: () => <Link to={"/home"} relative="path" />,
    },
  ];
  const itemsSideMenu = [
    {
      label: "Inicio",
      items: [
        {
          label: "Dashboard",
          icon: "pi pi-fw pi-home",
          url: "http://localhost:5173/home/dashboard",
        },
        // {
        //   label: "Carteira",
        //   icon: "pi pi-fw pi-wallet",
        //   command: () => {
        //     toast.current.show({
        //       severity: "success",
        //       summary: "Updated",
        //       detail: "Data Updated",
        //       life: 3000,
        //     });
        //   },
        // },
        {
          label: "Produtos",
          icon: "pi pi-fw pi-shopping-bag",
          url: "http://localhost:5173/home/products",
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
          url: "http://localhost:5173/home/vendas",
        },
        // {
        //   label: "Clientes",
        //   icon: "pi pi-fw pi-users",
        //   command: () => {
        //     toast.current.show({
        //       severity: "warn",
        //       summary: "Delete",
        //       detail: "Data Deleted",
        //       life: 3000,
        //     });
        //   },
        // },
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
        
      ],
    },
    {
      label: "Loja",
      items: [
        // {
        //   label: "Minha Loja",
        //   icon: "pi pi-fw pi-external-link",
        //   url: "https://reactjs.org/",
        // },
        {
          label: "Logout",
          icon: "pi pi-fw pi-sign-out",
          url: "http://localhost:5173",
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
