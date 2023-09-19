import { ListRestart, MoveDown, Search } from "lucide-react";
import { useForm } from "react-hook-form";

export default function Pesquisa(props: any) {
  const { register, handleSubmit } = useForm();

  return (
    <form
      className="form-inline"
      onSubmit={handleSubmit(props.filtrarCarros)}
      onReset={props.mostrarTodos}
    >
      <div className="m-5 grid grid-cols-1 grid-flow-col">
        <div className="form-group">
          <input
            type="text"
            className="form-control shadow-md rounded-md p-2"
            placeholder="Pesquisar"
            {...register("pesq")}
          />
        </div>
        <div className="grid grid-cols-1 grid-flow-col gap-4">
          <button type="submit" className="shadow-md rounded-md p-2">
            <Search />
          </button>
          <button type="button" className="bg-slate-100 hover:bg-slate-50 p-2" onClick={props.orderByPreco}>
            <MoveDown />
          </button>
          <button type="reset" className="bg-slate-100 hover:bg-slate-50 p-2">
            <ListRestart />
          </button>
          {/* <button type="reset" className="">
            Limpar
          </button> */}
        </div>
      </div>
    </form>
  );
}
