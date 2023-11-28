"use client";
import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import  ItemLista2  from "@/components/Itemlista2";

export default function ListagemPropostas() {
  const [propostas, setPropostas] = useState<{ id: number }[]>([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    async function getPropostas() {
      const response = await fetch("http://localhost:3004/propostas");
      const data = await response.json();
      setPropostas(data);
      setLoading(false);
    }
    getPropostas();
  }, []);

  async function excluirProposta(id: number) {
    await fetch(`http://localhost:3004/propostas/${id}`, {
      method: "DELETE",
    });
    const novasPropostas = propostas.filter((proposta) => proposta.id !== id);
    setPropostas(novasPropostas);
  }

  const ListaPropostas =
    propostas.length > 0 ? (
      propostas.map((proposta) => (
        <ItemLista2
          key={proposta.id}
          proposta={proposta}
          exclusao={() => excluirProposta(proposta.id)}
        />
      ))
    ) : (
      <p>Nenhuma proposta disponível.</p>
    );

  

  return (
    <>
      <div className="relative flex flex-col justify-center">
        <Container>
          <div className="block">
            <p>Propostas:</p>
          </div>
        </Container>
        <div className="flex flex-auto mx-auto text-center">
          <table className="table-aut mx-auto border-spacing-2 border-collapse border border-slate-300">
            <thead className=" bg-slate-100 text-left border border-slate-300 border-spacing-2 text-lg text-center">
              <tr>
                <th className="border border-slate-300 p-3" style={{ width: '10%' }}>ID</th>
                <th className="border border-slate-300 px-2" style={{ width: '15%' }}>Lance</th>
                <th className="border border-slate-300 px-2" style={{ width: '15%' }}>Data</th>
                <th className="border border-slate-300 px-2" style={{ width: '30%' }}>Texto</th>
                <th className="border border-slate-300 px-2" style={{ width: '10%' }}>Carro ID</th>
                <th className="border border-slate-300 px-2" style={{ width: '10%' }}>Cliente ID</th>
                <th className="border border-slate-300 px-2" style={{ width: '10%' }}>Excluir</th>
              </tr>
            </thead>
            <tbody className="border border-collapse border-slate-300">
              {ListaPropostas}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
