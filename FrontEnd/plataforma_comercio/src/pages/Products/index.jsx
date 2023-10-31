import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import axios from "axios";


import { useContext } from "react";
import { TopBarContext } from "../../shared/contexts/TopBarContext";


export const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  


  const { setTitleTopBar } = useContext(TopBarContext);
  setTitleTopBar("Inicio / Produtos");


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

  const getCategorys = async () => {
    try {
      const response = await axios.get("http://localhost:3002/categorias");
      setCategories(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMateriais();
    getCategorys();
  }, []);

  const header = (
    <img
      alt="Card"
      src="https://primefaces.org/cdn/primereact/images/usercard.png"
    />
  );

  const footer = (
    <>
      <Button label="Adicionar" icon="pi pi-check" />
      <Button
        label="Cancel"
        severity="secondary"
        icon="pi pi-times"
        style={{ marginLeft: "0.5em" }}
      />
    </>
  );



  // Agrupe produtos por categoria
  const groupedProducts = products.reduce((acc, product) => {
    const categoryId = product.categoria_id;
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(product);
    return acc;
  }, {});
  return (
    <>
    <div>Aqui será a listagem de produtos por categoria</div>
    {Object.entries(groupedProducts).map(([categoria_id, categoryProducts]) => {
      console.log(categoria_id,categoryProducts)
      const category = categories.find((cat) => cat.id == categoria_id);

      return (
        <div key={categoria_id}>
          <h2>Categoria: {category ? category.nome: "Categoria Desconhecida"}</h2>
          <div
            style={{
              display: "flex",
              padding: "40px",
              flexWrap: "wrap",
            }}
          >
            {categoryProducts.map((product) => (
              <div key={product.id} style={{ padding: "10px", width: "350px" }}>
                <Card
                  title={product.nome}
                  subTitle={product.preco_unitario_venda.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                  footer={footer}
                  header={product.imagem?
                    <img
                    src={product.imagem} 
                    alt={product.nome}
                    style={{ width: "100%" }}
                  />:header
                    
                    }
                  
                  className="md:w-25rem"
                >
                  <p className="m-0"></p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    })}
  </>
  );
};
