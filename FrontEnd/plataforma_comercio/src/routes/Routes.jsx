import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { AddProduct } from "../pages/AddProduct";
import { AddCategory } from "../pages/AddCategory";
import { Products } from "../pages/Products";
import { Dashboard } from "../pages/Home/dasboard";
import { Vendas } from "../pages/Home/vendas";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="addCategory" element={<AddCategory />} />
          <Route path="products" element={<Products />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="vendas" element={<Vendas />} />
          <Route path="teste2" element={<p>TEste 20202020</p>} />
        </Route>
        <Route path="*" element={<>404</>} />
      </Routes>
    </>
  );
}
export default AppRoutes;
