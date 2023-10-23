import { useEffect, useState } from "react";
import axios from "axios";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const getMateriais = async () => {
    try {
      const response = await axios.get("http://localhost:3002/produtos"); // Use axios.get() for a GET request
      setProducts(response.data);
      console.log("dados", response.data); // Axios automatically parses JSON response
    } catch (error) {
      console.log(error);
    }
  };
  console.log("products",products);
  useEffect(() => {
    getMateriais();
  }, []);
  return (
    <>
      <div>Aqui sera a listagem de produtos</div>
      {products?.map((product) => {
        <div key={product?.id}> {product?.nome} </div>;
      })}
    </>
  );
};
