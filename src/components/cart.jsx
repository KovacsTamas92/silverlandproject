import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./cartcontext";
import Basket from "../images/basket.png";

const CartIcon = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cartCount } = useCart();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block">
      <button onClick={toggleDropdown} className="relative">
        <img
          src={Basket}
          alt="Kosár"
          className="w-8 h-8" // Az ikon mérete egyezik a Header ikon méretével
        />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {cartCount}
          </span>
        )}
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <ul className="py-2 text-gray-700">
            <li>
              <Link
                to="/cart"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Kosár tartalma
              </Link>
            </li>
            <li>
              <Link
                to="/checkout"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Pénztár
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CartIcon;
