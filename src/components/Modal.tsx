
import { useEffect, useState } from "react"; // Importe useState
import { useForm } from "react-hook-form";

const API_BASE_URL = "http://localhost:3004";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  productId: number | null;
};

export function Modal({ isVisible, onClose, productId }: Props) {
  const { register, handleSubmit, reset } = useForm();

  const [modalVisible, setModalVisible] = useState(isVisible); // Estado para controlar a visibilidade do modal

  const getCarro = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/carros/${productId}`);
      if (response.ok) {
        const data = await response.json();
        reset(data);
      } else {
        throw new Error("Erro ao buscar o carro");
      }
    } catch (error) {
      console.error(error);
      // Tratar o erro de forma apropriada, talvez exibindo uma mensagem de erro para o usuário
    }
  };
  console.log(productId);
  const alteraDados = async (data: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/carros/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, preco: Number(data.preco) }),
      });
      if (response.ok) {
        alert("Carro alterado com sucesso!");
        onClose(); // Feche o modal após a alteração bem-sucedida
      } else {
        throw new Error("Erro ao alterar o carro");
      }
    } catch (error) {
      console.error(error);
      // Tratar o erro de forma apropriada, talvez exibindo uma mensagem de erro para o usuário
    }
  };

  useEffect(() => {
    if (productId !== null) { // Certifique-se de que productId não seja nulo antes de chamar getCarro
      getCarro();
    }
  }, [productId]);

  useEffect(() => {
    // Atualize o estado do modal com base na prop "isVisible"
    setModalVisible(isVisible);
  }, [isVisible]);

  const closeModal = () => {
    setModalVisible(false); // Feche o modal quando chamado
    onClose(); // Execute a função onClose para que o componente pai saiba que o modal foi fechado
  };

  if (!modalVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <button className="text-white text-xl place-self-end" onClick={closeModal}>X</button>
        <div className="bg-white p-2 rounded">
          <div className="col-span-3 flex flex-auto">
            <label htmlFor="preco" className="ano">
              <span className="block font-medium text-slate-700 text-lg">
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
              <button
                className="bg-green-600 hover:bg-green-500 text-white font-bold ms-2 py-2 px-4 rounded"
                onClick={handleSubmit(alteraDados)}
              >
                Alterar
              </button>
              <div className="pt-2"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
