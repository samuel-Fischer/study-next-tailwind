// ItemLista2.tsx

import { Trash2 } from "lucide-react";
import { MouseEventHandler } from "react";

interface Props {
  exclusao(id: number): void;
  proposta: {
    id: number;
    lance: number;
    date: string;
    texto: string;
    carro_id: number;
    cliente_id: number;
    carro: {
      id: number;
    };
    cliente: {
      id: number;
    };
  };
}

const ItemLista2: React.FC<Props> = (props) => {
  const confirmarExclusao = () => {
    if (window.confirm(`Deseja excluir a proposta ${props.proposta.id}?`)) {
      props.exclusao(props.proposta.id);
    }
  };

  return (
    <tr>
      <td>{props.proposta.id}</td>
      <td>{props.proposta.lance}</td>
      <td>{props.proposta.date}</td>
      <td>{props.proposta.texto}</td>
      <td>{props.proposta.carro_id}</td>
      <td>{props.proposta.cliente_id}</td>
      <td>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={confirmarExclusao}
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
};

export default ItemLista2;
