import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useRef } from "react";

import { Panel } from "primereact/panel";
import axios from "axios";
import { Sidebar } from "primereact/sidebar";

import { useContext } from "react";
import { TopBarContext } from "../../shared/contexts/TopBarContext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";

export const Products = () => {
  const toast = useRef(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);

  const { setTitleTopBar } = useContext(TopBarContext);
  setTitleTopBar("Inicio / Produtos");
  const addVendas = async (data) => {
    try {
      await axios.post("http://localhost:3002/vendas/cadastrar", data);
      console.log("Produto adicionado com sucesso");
    } catch (error) {
      console.log(error);
    }
  };

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
    // getProdutos_vendas();
  }, []);

  const header = (
    <img
      alt="Card"
      src="https://primefaces.org/cdn/primereact/images/usercard.png"
    />
  );

  // const footer = (
  //   <>
  //     <Button label="Adicionar" icon="pi pi-check" />
  //     <Button
  //       label="Cancel"
  //       severity="secondary"
  //       icon="pi pi-times"
  //       style={{ marginLeft: "0.5em" }}
  //     />
  //   </>
  // );
  const footer = (product) => (
    <>
      <Toast ref={toast} />
      <Button
        label="Adicionar ao Carrinho"
        icon="pi pi-shopping-cart"
        onClick={() => {
          return addToCart(product), show();
        }}
      />
    </>
  );

  const show = () => {
    console.log("foii");
    toast.current.show({ severity: "info", summary: "Adicionado ao Carrinho" });
  };
  const showVenda = () => {
    console.log("foii");
    toast.current.show({ severity: "success", summary: "Venda concluida" });

    const vendaData = {
      nomecliente: "Nome do Cliente", 
      precototal: cart.reduce((total, item) => total + item.preco_unitario_venda, 0),
      lucrototal: cart.reduce((total, item) => total + (item.preco_unitario_venda - item.preco_unitario_compra), 0),
      produtos: cart.map((item) => ({
        quantidade: item.quantidade,
        produto_fk: item.id,
        data_compra: item.data_compra, // Adicionando a data de compra ao produto na venda
      })),
    };

    addVendas(vendaData)
  };


  // const addToCart = (product) => {
  //   setCart([...cart, product]);
  // };

  // const addToCart = (product) => {
  //   const productWithDate = {
  //     ...product,
  //     data_compra: new Date().toISOString(),
  //   };
  //   setCart([...cart, productWithDate]);
  // };
  


  const addToCart = (product) => {
    // Verifique se o produto já está no carrinho
    const existingProduct = cart.find((item) => item.id === product.id && item.data_compra === product.data_compra);
  
    if (existingProduct) {
      // Atualize a quantidade do produto existente
      existingProduct.quantidade += 1;
      setCart([...cart]);
    } else {
      // Adicione o produto ao carrinho com quantidade 1
      const productWithQuantity = { ...product, quantidade: 1 };
      setCart([...cart, productWithQuantity]);
    }
  };

  console.log("cart", cart);
  // Agrupe produtos por categoria
  const groupedProducts = products.reduce((acc, product) => {
    const categoryId = product.categoria_id;
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(product);
    return acc;
  }, {});

  const [visibleRight, setVisibleRight] = useState(false);


  const decreaseQuantity = (product) => {
    const updatedCart = cart.map((item) => {
      if (item.id === product.id && item.data_compra === product.data_compra) {
        // Verifique se a quantidade é maior que 1 antes de diminuir
        if (item.quantidade > 1) {
          return { ...item, quantidade: item.quantidade - 1 };
        }
      }
      return item;
    });
  
    // Remova produtos com quantidade zero
    const filteredCart = updatedCart.filter((item) => item.quantidade > 0);
  
    setCart(filteredCart);
  };

  const increaseQuantity = (product) => {
    const updatedCart = cart.map((item) => {
      if (item.id === product.id && item.data_compra === product.data_compra) {
        return { ...item, quantidade: item.quantidade + 1 };
      }
      return item;
    });
  
    setCart(updatedCart);
  };
  const increaseQuantityButton = (rowData) => {
    return (
      <Button
        label="Aumentar Quantidade"
        icon="pi pi-plus"
        onClick={() => increaseQuantity(rowData)}
      />
    );
  };
  

  const decreaseQuantityButton = (rowData) => {
    return (
      <Button
        label="Diminuir Quantidade"
        icon="pi pi-minus"
        onClick={() => decreaseQuantity(rowData)}
      />
    );
  };
  

  return (
    <>
      <div
        className="flex"
        style={{
          display: "flex",
          marginLeft: "40px",
        }}
      >
        <Button
          icon="pi pi-shopping-cart"
          onClick={() => setVisibleRight(true)}
          label="Carrinho"
        />
      </div>
      {Object.entries(groupedProducts).map(
        ([categoria_id, categoryProducts]) => {
          console.log(categoria_id, categoryProducts);
          const category = categories.find((cat) => cat.id == categoria_id);

          return (
            <div key={categoria_id}>
              <Panel style={{ margin: "40px" }}>
                <h2>| {category ? category.nome : "Categoria Desconhecida"}</h2>
                <div
                  style={{
                    display: "flex",
                    padding: "40px",
                    flexWrap: "wrap",
                  }}
                >
                  {categoryProducts.map((product) => (
                    <div
                      key={product.id}
                      style={{ padding: "10px", width: "350px" }}
                    >
                      <Card
                        title={product.nome}
                        subTitle={product.preco_unitario_venda.toLocaleString(
                          "pt-BR",
                          {
                            style: "currency",
                            currency: "BRL",
                          }
                        )}
                        footer={footer(product)}
                        header={
                          product.imagem ? (
                            <img
                              src={product.imagem}
                              alt={product.nome}
                              style={{ width: "100%" }}
                            />
                          ) : (
                            header
                          )
                        }
                        className="md:w-25rem"
                      >
                        <p className="m-0"></p>
                      </Card>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          );
        }
      )}
      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
        style={{width:'650px'}}
      >
        <h2>Carrinho</h2>
        <DataTable value={cart} >
        <Column body={decreaseQuantityButton} header={cart.quantidade}  />
          <Column field="nome"></Column>
          <Column field="quantidade" showAddButton header="Quantidade" />
        <Column body={increaseQuantityButton} header={cart.quantidade}  />
        </DataTable>
        <Button label="Concluir Venda" icon="pi pi-money-bill" onClick={()=>{showVenda();setCart('');setVisibleRight(false)}}/>
      </Sidebar>
    </>
  );
};
