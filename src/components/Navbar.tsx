import { useState, useRef, useEffect } from "react";
import type { CartItem } from "../types/cart";
import CartDropdown from "./CartDropdown";
import Logo from "../assets/images/logo.svg";
import { IoCartOutline } from "react-icons/io5";

import avatar from "../assets/images/image-avatar.png";
import { MdMenu, MdClose } from "react-icons/md";

type NavbarProps = {
  cartItems: CartItem[];
  handleRemoveFromCart: (id: number) => void;
};

export default function Navbar({
  cartItems,
  handleRemoveFromCart,
}: NavbarProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  let timeoutId: number;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsDropdownVisible(false);
    }, 300);
  };

  
  useEffect(() => {
    return () => clearTimeout(timeoutId);
  });

  return (
    <>
      <header className="text-[#68707d] md:px-20 px-4">
        <nav className="flex justify-between items-center py-4 border-b border-[#f8f9fd] relative z-50">
          <div className="flex items-center gap-6">
            <button
              className="min-[901px]:hidden text-3xl hover:cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            >
              <MdMenu size={20} />
            </button>

            <img src={Logo} alt="logo" className="h-4 md:h-6 " />

            <ul className="hidden min-[901px]:flex gap-6 text-[#68707d] hover:cursor-pointer">
              {["Collections", "Men", "Women", "About", "Contact"].map(
                (link) => (
                  <li
                    key={link}
                    className="relative group cursor-pointer transition-colors duration-300 hover:text-black py-8"
                  >
                    {link}
                    <span className="absolute left-0 right-0 -bottom-[1rem] mx-auto w-0 h-[4px] bg-[#FF7D1A] transition-all duration-300 group-hover:w-full"></span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="flex items-center gap-6">
            <div
              className="relative cursor-pointer text-black"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              ref={dropdownRef}
            >
               <IoCartOutline size={30}/>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#FF7D1A] text-white text-[10px] rounded-full w-4 h-3 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
              {isDropdownVisible && (
                <CartDropdown
                  cartItems={cartItems}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              )}
            </div>
            <img
              src={avatar}
              alt="User Avatar"
              className="w-9 h-9 hover:cursor-pointer rounded-full border-2 border-transparent hover:border-[#FF7D1A] transition-all duration-300"
            />
          </div>
        </nav>
        <div className="border-b mx-[14%] border-[#f8f9fd]"></div>
      </header>


      <aside className="block min-[901px]:hidden">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/55 bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <div
          className={`fixed top-0 left-0 h-full w-54 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 left-5  text-[#68707d] hover:text-[#FF7D1A]  transition cursor-pointer"
          >
         <MdClose size={25}/>
        </button>
          <ul className="flex flex-col gap-6 mt-16 ml-6 text-lg font-semibold hover:cursor-pointer">
            {["Collections", "Men", "Women", "About", "Contact"].map((link) => (
              <li
                key={link}
                className="hover:text-[#FFEDE0] transition-colors duration-300"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
