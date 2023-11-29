import { FileEdit, Trash2, Star } from "lucide-react";
import { MouseEventHandler, useState } from "react";
import { Modal } from "./Modal";

interface Props {
  alteracao: MouseEventHandler<HTMLButtonElement> | undefined;
  exclusao(id: any): unknown;
  toggleDestaque: (id: number, destaque: boolean) => void; // Adicionado
  carro: {
    id: number;
    imagem: string;
    marca: string;
    ano_id: number;
    quilometragem: number;
    preco: number;
    sobre: string;
    destaque: boolean; // Adicionado
  };
}

const ItemLista: React.FC<Props> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [productIdToEdit, setProductIdToEdit] = useState<number | null>(null);

  function confirmarExclusao(id: number, marca: string) {
    if (window.confirm(`Deseja excluir o carro ${marca}?`)) {
      props.exclusao(id);
    }
  }

  const handleEditarPrecoClick = (id: number) => {
    setProductIdToEdit(id);
    setModalVisible(true);
  };

  return (
    <tr key={props.carro.id}>
      <td>
        <img
          className="w-40 h-40 "
          src={props.carro.imagem}
          alt={`Foto do carro ${props.carro.imagem}`}
        />
      </td>
      <td className="border border-slate-300">{props.carro.marca}</td>
      <td className="border border-slate-300 text-center">{props.carro.ano_id}</td>
      <td className="border border-slate-300 text-">
        {props.carro.quilometragem} Km
      </td>
      <td className="border border-slate-300">
        R$ {props.carro.preco},00
        <button
          className="text-slate-700 ms-2"
          title="Editar preco"
          onClick={() => handleEditarPrecoClick(props.carro.id)}
        >
          <FileEdit />
        </button>
      </td>
      <td className="border border-slate-300">{props.carro.sobre}</td>
      <td className="border border-slate-300">
        <button
          className="text-slate-700"
          title={props.carro.destaque ? "Remover destaque" : "Destacar"}
          onClick={() => props.toggleDestaque(props.carro.id, !props.carro.destaque)}
        >
          {props.carro.destaque ? <Star color="#fec700" /> : <Star />}
        </button>
        <button
          className="text-slate-700"
          title="Editar"
          onClick={props.alteracao}
        >
          <FileEdit />
        </button>
        <button
          className="text-slate-700"
          title="Excluir"
          onClick={() => confirmarExclusao(props.carro.id, props.carro.marca)}
        >
          <Trash2 />
        </button>
      </td>
      {modalVisible && (
        <td colSpan={7}>
          <Modal
            isVisible={modalVisible}
            onClose={() => {
              setModalVisible(false);
              setProductIdToEdit(null);
            }}
            productId={productIdToEdit}
          />
        </td>
      )}
    </tr>
  );
};

export default ItemLista;
