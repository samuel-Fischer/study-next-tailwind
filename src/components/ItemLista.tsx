import { FileEdit, Trash2 } from "lucide-react";
import { MouseEventHandler } from "react";

interface Props {
  alteracao: MouseEventHandler<HTMLButtonElement> | undefined;
  exclusao(id: any): unknown;
  carro: {
    id: number;
    imagem: string;
    marca: string;
    ano: number;
    quilometragem: number;
    preco: number;
    sobre: string;
  };
}

const ItemLista: React.FC<Props> = (props) => {

  function confirmarExclusao(id: number, marca: string) {
    if (window.confirm(`Deseja excluir o carro ${marca}?`)) {
      props.exclusao(id);
    }
  }

  return (
    <tr key={props.carro.id}>
      <td>
        <img className="w-40 h-40"
          src={props.carro.imagem}
          alt={`Foto do carro ${props.carro.imagem}`}
        />
      </td>
      <td className="border border-slate-300">{props.carro.marca}</td>
      <td className="border border-slate-300">{props.carro.ano}</td>
      <td className="border border-slate-300 text-">
        {props.carro.quilometragem} Km
      </td>
      <td className="border border-slate-300">R$ {props.carro.preco},00</td>
      <td className="border border-slate-300">{props.carro.sobre}</td>
      <td className="border border-slate-300">
        <button className= "text-slate-700" title="Editar" onClick={props.alteracao}>
          <FileEdit />
        </button>
        <button className= "text-slate-700" title="Excluir" onClick={() => confirmarExclusao(props.carro.id, props.carro.marca)}>
          <Trash2 />
        </button>
      </td>
    </tr>
  );
};

export default ItemLista;
