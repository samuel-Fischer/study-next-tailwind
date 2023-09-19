"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Alteracao() {
  const params = useParams();
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  useEffect(() => {
    async function getCarro() {
      const response = await fetch(`http://localhost:3004/carros/${params.id}`);
      const data = await response.json();
      reset({
        marca: data.marca,
        ano: data.ano,
        imagem: data.imagem,
        quilometragem: data.quilometragem,
        preco: data.preco,
        sobre: data.sobre,
      });
    }
    getCarro();
  }, []);

  async function alteraDados(data: any) {
    const carro = await fetch(`http://localhost:3004/carros/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (carro.ok) {
      alert("Carro alterado com sucesso!");
    } else {
      alert("Erro ao alterar o carro!");
    }
  }

  return (
    <div className="container mx-auto px-80">
      <h2 className="font-bold text-primary-gray text-3xl mt-4">
        Qual é o carro que deseja vender:
      </h2>
      <form
        className="border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 p-5 pt-5 mt-8"
        onSubmit={handleSubmit(alteraDados)}
      >
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
          <div className="col-span-3">
            <label className="marca">
              <span className="block text-sm font-medium text-slate-700">
                Marca/modelo do veiculo:
              </span>
              <input
                id="marca"
                type="text"
                placeholder="Ex: Fiat Uno"
                className="mt-1 w-full px-3 py-2 max-lg bg-slate-100 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600 valid:border-green-500 valid:text-green-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      "
                {...register("marca", { required: true })}
              />
            </label>
          </div>
          <div className="col-span-2">
            <label className="quilometragem">
              <span className="block text-sm font-medium text-slate-700">
                Quilometragem:
              </span>
              <input
                id="quilometragem"
                type="number"
                className="mt-1 w-full px-3 py-2 max-lg bg-slate-100 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600 valid:border-green-500 valid:text-green-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      "
                {...register("quilometragem", { required: true })}
              />
            </label>
          </div>
          <div className="col-span-3">
            <label className="ano">
              <span className="block text-sm font-medium text-slate-700">
                Preço desejado:
              </span>
              <input
                id="preco"
                type="number"
                className="mt-1 w-[100] px-3 py-2 max-lg bg-slate-100 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600 valid:border-green-500 valid:text-green-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      "
                {...register("preco", { required: true })}
              />
            </label>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8">
          <div className="col-span-3">
            <label className="imagem">
              <span className="block text-sm font-medium text-slate-700">
                Insira o link para a foto do veiculo:
              </span>
              <input
                id="imagem"
                type="link"
                className="mt-1 w-96 px-3 py-2 max-lg bg-slate-100 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600 valid:border-green-500 valid:text-green-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      "
                {...register("imagem")}
              />
            </label>
          </div>

          <div className="col-span-1">
            <label className="ano">
              <span className="block text-sm font-medium text-slate-700">
                Ano do veiculo:
              </span>
              <select
                className="valid:border-green-500 valid:text-green-600"
                id="ano"
                {...register("ano", { required: true })}
              >
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
            </label>
          </div>
        </div>

        <div className="col-span-full mt-5">
          <div>
            <label
              htmlFor="sobre"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Histórico de acidentes:
            </label>
            <div className="mt-2">
              <textarea
                id="sobre"
                rows={3}
                className="bg-slate-100 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                defaultValue={""}
                {...register("sobre")}
              />
            </div>
            <p className="text-sm leading-6 text-gray-600 ms-1">
              Detalhe sobre qualquer acidente que este veiculo possa ter se
              envolvido.
            </p>
          </div>
    
        </div>
        <div className="mt-6 flex items-center justify-start gap-x-2">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            value="Enviar"
          >
            Alterar
          </button>
          <button
            type="button"
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => router.push("/listagem")}
            value="Cancelar"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
