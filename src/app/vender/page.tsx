"use client";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  marca: string;
  quilometragem: number;
  ano: Date;
  preco: number;
  sobre: string;
  "file-upload": string;
};

export default function Cadastro() {
  const { register, handleSubmit } = useForm<Inputs>();

  function onSubmit(data: Inputs) {
    console.log(data);
  }

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
          <div className="sm:col-span-3">
            <label className="marca">
              <span className="block text-sm font-medium text-slate-700">
                Marca/modelo do veiculo:
              </span>
              <input
                id="marca"
                type="text"
                className="mt-1 w-full px-3 py-2 max-lg bg-slate-100 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      "
                {...register("marca", { required: true })}
              />
            </label>
          </div>
          <div className="sm:col-span-3">
            <label className="quilometragem">
              <span className="block text-sm font-medium text-slate-700">
                Quilometragem do veiculo:
              </span>
              <input
                id="quilometragem"
                type="number"
                className="mt-1 w-full px-3 py-2 max-lg bg-slate-100 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      "
                {...register("quilometragem", { required: true })}
              />
            </label>
          </div>
          <div className="sm:col-span-2">
            <label className="ano">
              <span className="block text-sm font-medium text-slate-700">
                Ano do veiculo:
              </span>
              <input
                id="ano"
                type="date"
                className="mt-1 w-full px-3 py-2 max-lg bg-slate-100 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      "
                {...register("ano", { required: true })}
              />
            </label>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12 col-span-full">
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
        </div>

        <div className="sm:col-span-2 mt-5">
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
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      "
              {...register("preco", { required: true })}
            />
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
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Detalhe sobre qualquer acidente que você possa ter se envolvido
              com este veiculo.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
