import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useForm } from "react-hook-form";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./styles.css";
import axios from "axios";

import { useContext } from "react";
import { TopBarContext } from "../../shared/contexts/TopBarContext";

export const AddProduct = () => {
  const { handleSubmit, setValue } = useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  const [categorys, setCategorys] = useState([]);
  const { setTitleTopBar } = useContext(TopBarContext);
  setTitleTopBar("Cadastros / Adicionar Produto");

  const onSubmit = (data) => {
    AddProduct(data)
    console.log(data);
  };



  const handleChange = (field, value) => {
    setValue(field, value);
  };
  const getCategorys = async () => {
    try {
      await axios.get("http://localhost:3002/categorias").then((response) => {
        setCategorys(response.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getProdutos = async () => {
    try {
      const response = await axios.get("http://localhost:3002/produtos");
      setProducts(response.data);
      console.log("dados", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProdutos();
    getCategorys()
  }, []);

  const AddProduct = async (data) => {
    try {
      await axios.post("http://localhost:3002/produtos/cadastrar", data);
      console.log("Produto adicionado com sucesso");
      getProdutos();
    } catch (error) {
      console.log(error);
    }
  };

  const onRowEditComplete = async (e) => {
    console.log("e", e);
    let _categories = [...products];
    let { newData, index } = e;
    _categories[index] = newData;
    try {
      await axios.put(
        `http://localhost:3002/produtos/editar/${newData.id}`,
        newData
      );
      setProducts(_categories);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(
        `http://localhost:3002/produtos/excluir/${categoryId}`
      );
      getProdutos();
    } catch (error) {
      console.error(error);
    }
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };



  const [productName,setProductName] = useState()
  return (
    <>
      <Card className="card" title="Adicionar Produto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-fluid">
            <div className="p-field">
              <label htmlFor="nome">Nome do Produto</label>
              <InputText
                id="nome"
                value={productName}
                onChange={(e) => {
                  setProductName(e.target.value)
                  handleChange("nome", e.target.value);
                }}
              />
            </div>
            <div className="p-field">
              <label htmlFor="quantidade">Quantidade</label>
              <InputNumber
                inputId="quantidade"
                onChange={(e) => {
                  handleChange("quantidade", e.value);
                }}
              />
            </div>
            <div className="p-field">
              <label htmlFor="purchasePrice">Preço de Compra</label>
              <InputNumber
                inputId="purchasePrice"
                mode="currency"
                currency="BRL"
                onChange={(e) => {
                  handleChange("preco_unitario_compra", e.value);
                }}
              />
            </div>
            <div className="p-field">
              <label htmlFor="sellingPrice">Preço de Venda</label>

              <InputNumber
                inputId="sellingPrice"
                mode="currency"
                currency="BRL"
                onChange={(e) => {
                  handleChange("preco_unitario_venda", e.value);
                }}
              />
            </div>
            <div className="p-field">
              <label>Imagem</label>
              <InputText
                id="image"
                onChange={(e) => {
                  handleChange("imagem", e.target.value);
                }}
              />
            </div>
            <div className="p-field">
              <label htmlFor="category">Categoria</label>
              <Dropdown
                id="category"
                name="category"
                options={categorys.map(option => ({ label: option.nome, value: option.id }))}
                placeholder="Selecione a Categoria"
                defaultValue={(e) => e.nome}
                value={selectedCategory}
                onChange={(e) => {
                  console.log(e)
                  setSelectedCategory(e.target.value);
                  handleChange("categoria_id", e.value);
                }}
              />
            </div>
            <div className="p-field">
              <Button label="Adicionar Produto" type="submit" />
            </div>
          </div>
        </form>
      </Card>
      <Card
        className="card"
        title={"Lista de Produtos"}
        style={{ margin: "40px" }}
      >
        <div className="card">
          <div className="card p-fluid">
            <DataTable
              value={products}
              editMode="row"
              dataKey="id"
              onRowEditComplete={onRowEditComplete}
            >
              <Column field="id" header="ID" style={{ width: "1%" }}></Column>
              <Column
                field="nome"
                header="Nome"
                editor={(options) => textEditor(options)}
                style={{ width: "20%" }}
              ></Column>
              <Column
                rowEditor
                headerStyle={{ width: "10%", minWidth: "8rem" }}
                bodyStyle={{ textAlign: "center" }}
              ></Column>
              <Column
                body={(rowData) => (
                  <Button
                  label="Excluir"
                  icon="pi pi-trash"
                    className="p-button-danger"
                    onClick={() => deleteCategory(rowData.id)}
                  />
                )}
                headerStyle={{ width: "1%", minWidth: "1rem" }}
                bodyStyle={{ textAlign: "center" }}
              />
            </DataTable>
          </div>
        </div>
      </Card>
    </>
  );
};
