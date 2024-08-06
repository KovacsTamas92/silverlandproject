import React from "react";
import { useCart } from "./cartcontext";

const CartList = () => {
  const { cartItems } = useCart();

  return (
    <div>
      <h2>Kosár Tartalma</h2>
      {cartItems.length === 0 ? (
        <p>A kosár üres.</p>
      ) : (
        <ul>
          {cartItems.map((product, index) => (
            <li key={index}>
              <strong>{product.file.name}</strong> - {product.price} Ft
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartList;
