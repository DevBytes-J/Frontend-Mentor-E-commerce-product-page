import { useState } from "react";
import Navbar from "./components/Navbar";
import ProductPage from "./components/ProductPage";
import type { CartItem } from "./types/cart";
import image1 from "./assets/images/image1.jpg"


export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (quantity: number, setQuantity: React.Dispatch<React.SetStateAction<number>>) => {
    if (quantity <= 0) return;

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.title === "Fall Limited Edition Sneakers");

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [
        ...prev,
        {
          id: Date.now(),
          title: "Fall Limited Edition Sneakers",
          price: 125,
          quantity,
          image: image1,
        },
      ];
    });

    setQuantity(0);
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="font-['Kumbh_Sans']">
      <Navbar cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} />
      <ProductPage handleAddToCart={handleAddToCart} />
    </div>
  );
}
