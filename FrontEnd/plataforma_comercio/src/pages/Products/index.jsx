import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import axios from "axios";

export const Products = () => {
  const [products, setProducts] = useState([]);

  const getMateriais = async () => {
    try {
      const response = await axios.get("http://localhost:3002/produtos");
      setProducts(response.data);
      console.log("dados", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("products", products);

  useEffect(() => {
    getMateriais();
  }, []);

  const header = (
    <img
      alt="Card"
      src="https://primefaces.org/cdn/primereact/images/usercard.png"
    />
  );

  const footer = (
    <>
      <Button label="Save" icon="pi pi-check" />
      <Button
        label="Cancel"
        severity="secondary"
        icon="pi pi-times"
        style={{ marginLeft: "0.5em" }}
      />
    </>
  );

  return (
    <>
      <div>Aqui sera a listagem de produtos</div>
      <div
        style={{
          display: "flex",
          padding: "40px",
          flexWrap: "wrap",
        }}
      >
        {products.map((product) => {
          return (
            <div key={product.id} style={{ padding: "10px", width: "350px" }}>
              {" "}
              <Card
                title={product.nome}
                subTitle={product.preco_unitario_venda.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
                footer={footer}
                header={header}
                className="md:w-25rem"
              >
                <p className="m-0"></p>
              </Card>{" "}
            </div>
          );
        })}
      </div>
    </>
  );
};
