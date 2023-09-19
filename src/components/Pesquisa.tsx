import { useForm } from "react-hook-form";

export default function Pesquisa(props: any) {
  const { register, handleSubmit } = useForm();

  return (
    <form
      className="form-inline"
      onSubmit={handleSubmit(props.filtrarCarros)}
      onReset={props.mostrarTodos}
    >
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisar"
          {...register("pesq")}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Pesquisar
      </button>
      <button type="reset" className="btn btn-primary">
        Limpar
      </button>
    </form>
  );
}
