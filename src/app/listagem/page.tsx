"use client";
import ItemLista from "@/components/ItemLista";
import { Container } from "@/components/Container";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Pesquisa from "@/components/Pesquisa";

export default function Listagem() {
  const [carros, setCarros] = useState<{ id: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function getCarros() {
      const response = await fetch("http://localhost:3004/carros");
      const data = await response.json();
      setCarros(data);
      setLoading(false);
    }
    getCarros();
  }, []);

  async function excluirCarro(id: number) {
    await fetch(`http://localhost:3004/carros/${id}`, {
      method: "DELETE",
    });
    const novosCarros = carros.filter((carro) => carro.id !== id);
    setCarros(novosCarros);
  }

  const Listagem =
    carros.length > 0 ? (
      carros.map((carro) => (
        <ItemLista
          key={carro.id}
          carro={carro}
          exclusao={() => excluirCarro(carro.id)}
          alteracao={() => router.push(`/altera/${carro.id}`)}
          consulta={() => router.push(`/consulta/${carro.id}`)}
        />
      ))
    ) : (
      <p>Nenhum carro disponível.</p>
    );

  function filtrarCarros(data: any) {
    async function getCarros() {
      const response = await fetch(
        "http://localhost:3004/carros?marca_like=" + data.pesq
      );
      const dados = await response.json();
      setCarros(dados);
    }
    getCarros();
  }

  function ordenarCarros() {
    async function getCarros() {
      const response = await fetch(
        "http://localhost:3004/carros?_sort=preco&_order=asc"
      );
      const dados = await response.json();
      setCarros(dados);
    }
    getCarros();
  }

  function mostrarTodos() {
    async function getCarros() {
      const response = await fetch("http://localhost:3004/carros");
      const data = await response.json();
      setCarros(data);
    }
    getCarros();
  }

  if (loading) {
    return (
      <>
        <Container>
          <div className="w-full items-center flex flex-col mt-96">
            <p>Aguarde... Carregando os Carros</p>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <div className="relative flex flex-col justify-center">
        <Container>
          <div className="block">
            <p>Carros a venda:</p>
          </div>
          <div>
            <Pesquisa
              filtrarCarros={filtrarCarros}
              orderByPreco={ordenarCarros}
              mostrarTodos={mostrarTodos}
            />
          </div>
        </Container>
        <div className="flex flex-auto mx-auto text-center">
          <table className="table-aut mx-auto border-spacing-2 border-collapse border border-slate-300">
            <thead className=" bg-slate-100 text-left border border-slate-300 border-spacing-2 text-lg text-center">
              <tr>
                <th className="border border-slate-300 p-3"style={{width: '10%'}}>Foto</th>
                <th className="border border-slate-300 px-2" style={{width: '10%'}}>Marca</th>
                <th className="border border-slate-300 px-2" style={{width: '7%'}}>Ano</th>
                <th className="border border-slate-300 px-2">Quilometragem</th>
                <th className="border border-slate-300 px-2">Preço</th>
                <th className="border border-slate-300 px-2" style={{width: '18%'}}>Danos</th>
                <th className="border border-slate-300 px-2">Editar</th>
              </tr>
            </thead>
            <tbody className="border border-collapse border-slate-300">
              {Listagem}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
