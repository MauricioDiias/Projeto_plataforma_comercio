import { TopBarContext } from "../../../shared/contexts/TopBarContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

export const Vendas = () => {
  const { setTitleTopBar } = useContext(TopBarContext);
  setTitleTopBar("Inicio / Vendas");

  const [vendas, setVendas] = useState([]);

  const getVendas = async () => {
    try {
      const response = await axios.get("http://localhost:3002/vendas");
      setVendas(response.data);
      console.log("vendas", response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getVendas();
  }, []);

  const deleteVendas = async (vendaId) => {
    try {
      await axios.delete(`http://localhost:3002/vendas/${vendaId}`);
      getVendas();
      console.log("venda excluida com sucesso!!");
    } catch (error) {
      console.log(error);
    }
  };

  const cols = [
    { field: "nomecliente", header: "Nome do Cliente" },
    { field: "produtos", header: "Produtos Vendidos" },
  ];
  return (
    <div>
      <div className="card">
        <div className="card p-fluid">
          <DataTable value={vendas} editMode="row" dataKey="id">
            <Column field="id" header="ID" style={{ width: "1%" }}></Column>
            <Column
              field="nomecliente"
              header="Nome"
              style={{ width: "20%" }}
            />

            <Column
              header="Produtos Vendidos"
              body={(rowData) => {
                // Renderizar a lista de produtos como uma string
                const produtos = rowData.produtos
                  .map((produto) => produto.nome)
                  .join(", ");
                const quantidade = rowData.produtos
                  .map((produto) => produto.quantidade)
                  .join(", ");
                return (
                  <span>
                    {produtos}={quantidade}
                  </span>
                );
              }}
            />
            <Column
              body={(rowData) => (
                <Button
                label="Excluir"
                icon="pi pi-trash"
                  className="p-button-danger"
                  onClick={() => {
                    deleteVendas(rowData.id);
                    console.log(rowData.id);
                  }}
                />
              )}
              style={{ width: "10%" }}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};
