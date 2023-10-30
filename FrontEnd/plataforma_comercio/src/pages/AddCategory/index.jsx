import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useContext, useEffect, useState } from "react";
import { TopBarContext } from "../../shared/contexts/TopBarContext";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import axios from "axios";

export const AddCategory = () => {
  const { setTitleTopBar } = useContext(TopBarContext);
  setTitleTopBar("Cadastros / Adicionar Categoria");

  const { handleSubmit, setValue } = useForm();

  const [categorys, setCategorys] = useState([]);
  const [categoryValue, setCategoryValue] = useState("");

  console.log(categorys);

  const addCategory = async (data) => {
    try {
      await axios.post("http://localhost:3002/categoria/cadastrar", data);
      console.log("categoria adicionada com sucesso");
      getCategorys();
      setCategoryValue("");
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    getCategorys();
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    addCategory(data);
  };

  const handleChange = (field, value) => {
    setValue(field, value);
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

  const onRowEditComplete = (e) => {
    let _products = [...categorys];
    let { newData, index } = e;

    _products[index] = newData;

    setCategorys(_products);
  };

  return (
    <div>
      category
      <Card title={"Adicionar Categoria"} style={{ margin: "40px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-field">
            <label htmlFor="productName">Nome da Categoria</label>
            <InputText
              id="categoryName"
              value={categoryValue}
              onChange={(e) => {
                setCategoryValue(e.target.value);
                handleChange("nome", e.target.value);
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <div className="p-field">
            <Button label="Adicionar Categoria" type="submit" />
          </div>
        </form>
      </Card>
      adicionar validação no input adicionar uma atualização ao adicionar
      categia
      <div className="card">
        <div className="card p-fluid">
          <DataTable
            value={categorys}
            editMode="row"
            dataKey="id"
            onRowEditComplete={onRowEditComplete}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column field="id" header="ID" style={{ width: "1%" }}></Column>
            <Column
              field="nome"
              header="Name"
              editor={(options) => textEditor(options)}
              style={{ width: "20%" }}
            ></Column>
            <Column
              rowEditor
              headerStyle={{ width: "10%", minWidth: "8rem" }}
              bodyStyle={{ textAlign: "center" }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};
