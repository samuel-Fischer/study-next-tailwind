"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  marca: string;
  quilometragem: number;
  ano: number;
  preco: number;
  sobre: string;
  imagem: string;
};

interface Ano {
  id: number;
  ano: number;
}

export default function Cadastro() {
  const [anos, setAnos] = useState<Ano[]>([]);
  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      quilometragem: 100000,
      preco: 50000.00,
      imagem: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F623%2F239%2Foriginal%2Fauto-car-logo-template-vector-icon.jpg",
    },
  });

  async function onSubmit(data: Inputs) {
    console.log(data);
    const carros = await fetch("http://localhost:3004/carros", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, preco: Number(data.preco), quilometragem: Number(data.quilometragem)}),
    });
    if (carros.status === 201) {
      alert("Cadastro realizado com sucesso!");
      reset();
    } else {
      alert("Erro ao cadastrar!");
    }
  }

  async function getAnos() {
    try {
      const response = await fetch("http://localhost:3004/anos");
      if (!response.ok) {
        throw new Error("Erro ao buscar anos.");
      }
      const anosData: Ano[] = await response.json();
      setAnos(anosData); // Atualiza o estado com os anos buscados.
    } catch (error) {
      console.error("Erro ao buscar anos:", error);
    }
  }

  useEffect(() => {
    getAnos();
  }, []);

  return (
    <div className="container mx-auto px-80">
      <h2 className="font-bold text-primary-gray text-3xl mt-4">
        Qual é o carro que deseja vender:
      </h2>
      <form
        className="border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 p-5 pt-5 mt-8"
        onSubmit={handleSubmit(onSubmit)}
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

        <div className="sm:col-span-2">
          <label className="imagem">
            <span className="block text-sm font-medium text-slate-700">
              Insira o link para a foto do veiculo:
            </span>
            <input
              id="imagem"
              type="link"
              className="mt-1 w-full px-3 py-2 max-lg bg-slate-100 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600 valid:border-green-500 valid:text-green-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      "
              {...register("imagem")}
            />
          </label>
        </div>

        {/* <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12 col-span-full">
          <div className="sm:col-span-12">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Foto do veiculo:
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      {...register("file-upload")}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div> */}

        <div className="sm:col-span-2 mt-5">
          <label className="ano">
            <span className="block text-sm font-medium text-slate-700">
              Ano do veiculo:
            </span>
            <select
              className="valid:border-green-500 valid:text-green-600"
              id="ano"
              {...register("ano", { required: true })}
            >
              {anos.map((ano) => (
                <option key={ano.id} value={ano.ano}>
                  {ano.ano}
                </option>
              ))}
            </select>
            {/* <input
                id="ano"
                type="date"
                className="mt-1 w-full px-3 py-2 max-lg bg-slate-100 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      "
                {...register("ano", { required: true })}
              /> */}
          </label>
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
        <div className="mt-6 flex items-center justify-start gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            value="Enviar"
          >
            Enviar
          </button>
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            value="Limpar"
            onClick={() => reset()}
          >
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
}
