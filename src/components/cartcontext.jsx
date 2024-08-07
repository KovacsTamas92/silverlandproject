import React, { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(() => {
    const savedCount = sessionStorage.getItem("cartCount");
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  useEffect(() => {
    sessionStorage.setItem("cartCount", cartCount);
  }, [cartCount]);

  const addItemToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  return (
    <CartContext.Provider value={{ cartCount, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
