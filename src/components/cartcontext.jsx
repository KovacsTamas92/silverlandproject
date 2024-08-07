import React, { createContext, useContext, useState, useEffect } from "react";

// Kosár kontextus létrehozása
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
          setCartCount(
            parsedCart.reduce((acc, item) => acc + item.quantity, 0)
          );
        }
      } catch (error) {
        console.error("Hiba a kosár beállítása közben:", error);
        setCart([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
  }, [cart]);

  const addItemToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i._id === item._id);
      if (existingItem) {
        return prevCart.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeItemFromCart = (id) => {
    setCart((prevCart) => {
      return prevCart.filter((item) => item._id !== id);
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, addItemToCart, removeItemFromCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
