"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { Container } from "@/components/Container";

// Defina uma interface para o tipo de dados dos carros
interface Carro {
  marca: string;
  ano: string;
  imagem: string;
  quilometragem: string;
  preco: string;
  sobre: string;
  id: number;
}

export default function Grafico() {
  const [carrosPorAno, setCarrosPorAno] = useState<{ [ano: string]: number }>({});

  useEffect(() => {
    // Função para buscar os dados e atualizar o estado
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3004/carros");
        if (!response.ok) {
          throw new Error("Erro na solicitação à API");
        }
        const carrosData: Carro[] = await response.json();

        const carrosPorAno: { [ano: string]: number } = {};

        carrosData.forEach((carro) => {
          const anoCarro = carro.ano;
          if (anoCarro in carrosPorAno) {
            carrosPorAno[anoCarro]++;
          } else {
            carrosPorAno[anoCarro] = 1;
          }
        });

        setCarrosPorAno(carrosPorAno);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    }

    fetchData(); // Chama a função para buscar os dados quando o componente é montado
  }, []);

  return (
    <div className="">
      <Container>
        <div className="mt-5">
          <h1 className="font-bold text-primary-gray text-2xl">
            Quantidade de Carros por Ano
          </h1>
        </div>
      </Container>
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={[
          ["Ano", "Quantidade", { role: "style" }],
          ...Object.entries(carrosPorAno).map(([ano, quantidade]) => [
            ano,
            quantidade,
            "blue", // Cor das barras (pode ser alterada)
          ]),
        ]}
        options={{
          title: "Quantidade de Carros por Ano",
          hAxis: { title: "Ano" },
          vAxis: { title: "Quantidade" },
        }}
      />
    </div>
  );
}