import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route path="teste" element={<p>TEste conscluidosssssssssssssssss</p>} />
          <Route path="teste2" element={<p>TEste 20202020</p>} />
        </Route>
        <Route path="*" element={<>404</>} />
      </Routes>
    </>
  );
}
export default AppRoutes;
