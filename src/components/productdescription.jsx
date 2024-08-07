import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./cartcontext";

function ProductCard() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { addItemToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/data");
        if (!response.ok) {
          throw new Error("Hiba történt az adatok lekérdezésekor!");
        }
        const result = await response.json();
        console.log("Fetched data: ", result);
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    const savedCart = localStorage.getItem("cart");
    const currentCart = savedCart ? JSON.parse(savedCart) : [];

    // Check if the product is already in the cart
    const existingProductIndex = currentCart.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex > -1) {
      // If the product already exists, update its quantity
      currentCart[existingProductIndex].quantity += 1;
    } else {
      // Otherwise, add the new product with quantity 1
      product.quantity = 1;
      currentCart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));

    console.log(
      "Local Storage tartalma:",
      JSON.parse(localStorage.getItem("cart"))
    );

    addItemToCart(product);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {data.map((product) => (
        <div
          key={product.id}
          className="border border-gray-200 shadow-2xl rounded-md p-4 m-4 text-center w-60"
        >
          {product.file ? (
            <img
              src={product.file}
              alt={product.name}
              className="mx-auto h-40 object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "default-image-path";
              }}
            />
          ) : (
            <div className="mx-auto h-40 flex items-center justify-center bg-gray-200">
              Nincs kép
            </div>
          )}
          <h2 className="text-xl font-bold mt-2">{product.name}</h2>
          <h3 className="text-sm text-gray-500 mb-2">{product.status}</h3>
          <h2 className="text-2xl font-bold mb-4">{product.price} Ft</h2>

          <div className="flex flex-col mt-4">
            <button
              className="bg-black text-white font-bold py-2 px-4 rounded mb-2"
              onClick={() => handleAddToCart(product)}
            >
              Kosárba
            </button>

            <Link
              to={`/description/${product.id}`}
              className="underline text-black hover:text-blue-600 font-bold py-2 px-4"
            >
              Részletek
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductCard;
