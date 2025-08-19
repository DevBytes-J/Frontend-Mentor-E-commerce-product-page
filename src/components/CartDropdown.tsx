import type { CartItem } from "../types/cart";
import sneakone from "../assets/images/image-product-1-thumbnail.jpg"

type CartDropdownProps = {
  cartItems: CartItem[];
  handleRemoveFromCart: (id: number) => void;
};

export default function CartDropdown({ cartItems, handleRemoveFromCart }: CartDropdownProps) {
  return (
    <div className="absolute top-10 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="p-4 border-b border-gray-200 font-bold">Cart</div>
      <div className="p-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between mb-4 last:mb-0">
                <img src={sneakone} alt={item.title} className="w-12 h-12 rounded-lg" />
                <div className="flex-1 ml-4 text-gray-500">
                  <p>{item.title}</p>
                  <p>
                    ${item.price.toFixed(2)} x {item.quantity}{" "}
                    <span className="font-bold text-black">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </p>
                </div>
                <button onClick={() => handleRemoveFromCart(item.id)} className="ml-4 p-1 rounded-full hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                </button>
              </div>
            ))}
            <button className="w-full bg-[#FF7D1A] text-white py-3 rounded-lg font-bold hover:bg- transition">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
