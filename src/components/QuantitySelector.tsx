import minus from "../assets/images/icon-minus.svg";
import plus from "../assets/images/icon-plus.svg";

type QuantitySelectorProps = {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

export default function QuantitySelector({ quantity, setQuantity }: QuantitySelectorProps) {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-3 px-10 rounded-md w-full md:w-auto md:flex-none">
      <button onClick={() => setQuantity(q => Math.max(q - 1, 0))} className="p-2 hover:bg-gray-200 rounded">
        <img src={minus} alt="minus" className=""/>
      </button>
      <span className="text-black font-bold text-lg">{quantity}</span>
      <button onClick={() => setQuantity(q => q + 1)} className="p-2 hover:bg-gray-200 rounded">
        <img src={plus} alt="plus" className=""/>
      </button>
    </div>
  );
}