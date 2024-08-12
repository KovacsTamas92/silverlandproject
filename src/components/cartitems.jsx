import React, { useEffect } from "react";
import { useCart } from "../components/cartcontext";
import NavBar from "../components/navbar";
import SideBar from "../components/sidebar";
import Logo from "../images/logo.gif";
import Header from "../components/header";

function CartItems() {
  const { cart, setCart, removeItemFromCart } = useCart();

  useEffect(() => {
    // Kosár állapotának frissítése
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      } catch (error) {
        console.error("Hiba a kosár beállítása közben:", error);
        setCart([]);
      }
    }
  }, [setCart]);

  const updateItemQuantity = (id, amount) => {
    const updatedCart = cart.map((product) => {
      if (product._id === id) {
        const newQuantity = product.quantity + amount;
        if (newQuantity <= 0) return null; // Ha a mennyiség 0 vagy kevesebb, töröld a terméket
        return { ...product, quantity: newQuantity };
      }
      return product;
    }).filter((item) => item !== null);

    setCart(updatedCart);
  };

  const deleteItem = (id) => {
    removeItemFromCart(id);
  };

  return (
    <div>
      <Header />
      <div className="ml-[255px]">
        <div className="flex justify-center">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="ml-200">
          <NavBar />
        </div>
      </div>
      <div>
        <SideBar />
      </div>
      <div className="ml-[255px] p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Kosár tartalma</h1>
        <div className="w-[80%] mx-auto">
          {cart.length === 0 ? (
            <div className="text-center mt-4">A kosár üres.</div>
          ) : (
            cart.map((product) => (
              <div
                key={product._id}
                className="flex items-center border border-gray-200 shadow-lg rounded-md p-4 mb-4"
              >
                {product.file ? (
                  <img
                    src={product.file}
                    alt={product.name}
                    className="h-24 w-24 object-contain mr-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "default-image-path";
                    }}
                  />
                ) : (
                  <div className="h-24 w-24 bg-gray-200 flex items-center justify-center mr-4">
                    Nincs kép
                  </div>
                )}
                <div className="flex flex-col flex-grow">
                  <h2 className="text-xl font-bold">
                    {product.name || "Név nem elérhető"}
                  </h2>
                  <div className="flex items-center">
                    <button
                      onClick={() => updateItemQuantity(product._id, -1)}
                      className="bg-gray-300 text-black font-bold py-1 px-2 rounded"
                    >
                      -
                    </button>
                    <p className="mx-4 text-lg">{product.quantity}</p>
                    <button
                      onClick={() => updateItemQuantity(product._id, 1)}
                      className="bg-gray-300 text-black font-bold py-1 px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="ml-auto text-lg font-semibold">
                  {product.price ? `${product.price} Ft` : "Ár nem elérhető"}
                </div>
                <button
                  onClick={() => deleteItem(product._id)}
                  className="ml-4 bg-red-500 text-white font-bold py-2 px-4 rounded"
                >
                  Törlés
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CartItems;
