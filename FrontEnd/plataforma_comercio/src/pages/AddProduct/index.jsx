import { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useForm } from "react-hook-form";
import "./styles.css";

import { useContext } from "react";
import { TopBarContext } from "../../shared/contexts/TopBarContext";

export const AddProduct = () => {
  const { handleSubmit, setValue } = useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { setTitleTopBar } = useContext(TopBarContext);
  setTitleTopBar("Cadastros / Adicionar Produto");


  const onSubmit = (data) => {
    console.log(data);
  };

  const categories = [
    { label: "Electronics", value: "electronics" },
    { label: "Clothing", value: "clothing" },
  ];

  const handleChange = (field, value) => {
    setValue(field, value);
  };

  return (
    <>
      <Card className="card" title="Adicionar Produto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-fluid">
            <div className="p-field">
              <label htmlFor="productName">Nome do Produto</label>
              <InputText
                id="productName"
                onChange={(e) => {
                  handleChange("productName", e.target.value);
                }}
              />
            </div>
            <div className="p-field">
              <label htmlFor="quantity">Quantidade</label>
              <InputNumber
                inputId="quantity"
                onChange={(e) => {
                  handleChange("quantity", e.value);
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
                  handleChange("purchasePrice", e.value);
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
                  handleChange("sellingPrice", e.value);
                }}
              />
            </div>
            <div className="p-field">
              <label>Imagem</label>
              <InputText
                id="image"
                onChange={(e) => {
                  handleChange("image", e.target.value);
                }}
              />
            </div>
            <div className="p-field">
              <label htmlFor="category">Categoria</label>
              <Dropdown
                id="category"
                name="category"
                options={categories}
                placeholder="Selecione a Categoria"
                defaultValue={(e) => e.value}
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.value);
                  handleChange("category", e.value);
                }}
              />
            </div>
            <div className="p-field">
              <Button label="Adicionar Produto" type="submit" />
            </div>
          </div>
        </form>
      </Card>
    </>
  );
};
