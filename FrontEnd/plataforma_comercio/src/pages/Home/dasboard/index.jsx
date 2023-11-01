import { TopBarContext } from "../../../shared/contexts/TopBarContext";
import { useContext, useEffect, useState } from "react";

import axios from "axios";
import { Card } from "primereact/card";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

import { Chart } from "primereact/chart";

export const Dashboard = () => {
  const { setTitleTopBar } = useContext(TopBarContext);
  setTitleTopBar("Inicio / Dashboard");

  const [products, setProducts] = useState([]);
  const [vendas, setVendas] = useState([]);

  const totalvendas = () => {};
  totalvendas();

  const options2 = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        },
      },
    },
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
    getMateriais();
    getVendas();
  }, []);

  const data = {
    labels: ["Mês 1", "Mês 2", "Mês 3"],
    datasets: [
      {
        label: "Quantidade de Vendas",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
        hoverBorderColor: "rgba(75, 192, 192, 1)",
        data: [30, 45, 60], // Substitua com os dados reais das quantidades de vendas
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const totalVendas = vendas.reduce(
    (soma, vendas) => soma + vendas.precototal,
    0
  );

  const precoTotalVendas = vendas.map((vendas) => vendas.precototal);
  console.log("vendas.precototal", precoTotalVendas);
  console.log(totalVendas);

  const valoresValidos = precoTotalVendas.filter((valor) => valor !== null);
  console.log(valoresValidos);

  const soma = valoresValidos.reduce(
    (total, valor) => total + parseFloat(valor),
    0
  );
  console.log(soma);

  return (
    <div style={{ padding: "40px" }}>
      dasboard
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          justifyContent: "space-between",
        }}
      >
        <Card
          content={vendas.length}
          style={{ width: "300px", fontSize: "30px" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>Vendas</div>
            <div>{vendas.length}</div>
            <img src="" alt="" />
          </div>
        </Card>
        <Card content={vendas.length} style={{ width: "300px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>Vendas</div>
            <div>{vendas.length}</div>
            <img src="" alt="" />
          </div>
        </Card>
        <Card content={vendas.length} style={{ width: "300px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>Vendas</div>
            <div>{vendas.length}</div>
            <img src="" alt="" />
          </div>
        </Card>
        <Card content={vendas.length} style={{ width: "300px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>Vendas</div>
            <div>{vendas.length}</div>
            <img src="" alt="" />
          </div>
        </Card>
      </div>
      Card
      <div style={{ display: "flex", gap: "10px" }}>
        <Card style={{ width: "50%", height: "500px" }}>
          <div>
            <h2>Gráfico de Quantidade de Vendas</h2>
            <Bar data={data} options={options} />
          </div>
        </Card>
        <Card style={{ width: "300px", height: "300px" }}>
          <div className="card flex justify-content-center">
            <Chart
              type="pie"
              data={data}
              options={options2}
              className="w-full md:w-30rem"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
