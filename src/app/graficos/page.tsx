// Certifique-se de que está usando 'use client', não 'use cliente'
"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { Container } from "@/components/Container";


// Defina uma interface para o tipo de dados dos carros
interface Carro {
  marca: string;
  ano_id: number;
  imagem: string;
  quilometragem: string;
  preco: number;
  sobre: string;
  id: number;
}

interface Proposta {
  id: number;
  lance: number;
  data: string;
  texto: string;
  carro_id: number;
  cliente_id: number;
  carro: {
    id: number;
    marca: string;
    preco: number;
  };
  cliente: {
    id: number;
    nome: string;
  };
}

export default function Grafico() {
  const [carrosPorAno, setCarrosPorAno] = useState<{ [ano_id: number]: number }>({});
  const [maiorLancePorMarca, setMaiorLancePorMarca] = useState<{ [marca: string]: number }>({});
  const [precoPorMarca, setPrecoPorMarca] = useState<{ [marca: string]: number }>({});
  const [propostasPorCarro, setPropostasPorCarro] = useState<{ [carroId: number]: number }>({});

  useEffect(() => {
    // Função para buscar os dados e atualizar o estado
    async function fetchData() {
      try {
        const responseCarros = await fetch("http://localhost:3004/carros");
        const responsePropostas = await fetch("http://localhost:3004/propostas");

        if (!responseCarros.ok || !responsePropostas.ok) {
          throw new Error("Erro na solicitação à API");
        }

        const carrosData: Carro[] = await responseCarros.json();
        const propostasData: Proposta[] = await responsePropostas.json();

        const carrosPorAno: { [ano_id: number]: number } = {};
        const maiorLancePorMarca: { [marca: string]: number } = {};
        const precoPorMarca: { [marca: string]: number } = {};
        const propostasPorCarro: { [carroId: number]: number } = {};

        carrosData.forEach((carro) => {
          const anoCarro = carro.ano_id;
          if (anoCarro in carrosPorAno) {
            carrosPorAno[anoCarro]++;
          } else {
            carrosPorAno[anoCarro] = 1;
          }

          // Encontrar o maior lance e o preço para cada marca
          const propostasDoCarro = propostasData.filter((proposta) => proposta.carro_id === carro.id);
          const maiorLance = Math.max(...propostasDoCarro.map((proposta) => proposta.lance), 0);
          const preco = carro.preco; // Usei o preço do carro como sugerido pelo dono, ajuste conforme necessário

          maiorLancePorMarca[carro.marca] = maiorLance;
          precoPorMarca[carro.marca] = preco;
          propostasPorCarro[carro.id] = propostasDoCarro.length;
        });

        setCarrosPorAno(carrosPorAno);
        setMaiorLancePorMarca(maiorLancePorMarca);
        setPrecoPorMarca(precoPorMarca);
        setPropostasPorCarro(propostasPorCarro);
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
          ...Object.entries(carrosPorAno).map(([ano_id, quantidade]) => [
            ano_id,
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

      <div className="">
        <Container>
          <div className="mt-5">
            <h1 className="font-bold text-primary-gray text-2xl">
              Comparação de Valor de Carro e Maior Lance por Marca
            </h1>
          </div>
        </Container>
        <Chart
          chartType="BarChart"
          width="100%"
          height="400px"
          data={[
            ["Marca", "Maior Lance", "Preço Sugerido"],
            ...Object.entries(maiorLancePorMarca).map(([marca, maiorLance]) => [
              marca,
              maiorLance,
              precoPorMarca[marca] || 0,
            ]),
          ]}
          options={{
            title: "Comparação do Valor Sugerido com a Maior Lance por Marca",
            hAxis: { title: "Marca" },
            vAxis: { title: "Valor" },
          }}
        />
      </div>

      <div className="">
        <Container>
          <div className="mt-5">
            <h1 className="font-bold text-primary-gray text-2xl">
              Número de Propostas por Carro
            </h1>
          </div>
        </Container>
        <Chart
          chartType="BarChart"
          width="100%"
          height="400px"
          data={[
            ["Marca", "Número de Propostas"],
            ...Object.entries(propostasPorCarro).map(([marca, numPropostas]) => [
              marca,
              numPropostas,
            ]),
          ]}
          options={{
            title: "Número de Propostas por Carro",
            hAxis: { title: "Marca" },
            vAxis: { title: "Número de Propostas" },
          }}
        />
      </div>
    </div>
  );
}
