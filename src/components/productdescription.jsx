import Pathfinder from "../images/pathfinder.png";
import React, { useState } from "react";

function ProductDescription() {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (!isNaN(newValue) && newValue !== "") {
      setValue(parseInt(newValue, 10));
    }
  };

  const increment = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const decrement = () => {
    setValue((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  return (
    <div className="flex justify-center items-start p-4">
      <div className="w-1/3 flex justify-center">
        <img
          src={Pathfinder}
          alt="Pathfinder"
          className="mx-auto max-w-full h-auto"
          style={{ maxWidth: "600px" }}
        />
      </div>
      <div className="w-1/2 text-left ml-16">
        <h1 className="text-2xl font-bold mb-2">Pathfinder</h1>
        <h2 className="text-xl font-bold text-gray-600 mb-4">17 990 Ft</h2>
        <div className="flex items-center mb-4">
          <div className="relative">
            <input
              type="number"
              value={value}
              onChange={handleChange}
              className="border border-gray-300 rounded-md pl-4 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <div className="absolute inset-y-0 right-0 flex flex-col items-center justify-center pr-1">
              <button
                type="button"
                onClick={increment}
                className="text-gray-600 hover:text-black focus:outline-none"
              >
                ▲
              </button>
              <button
                type="button"
                onClick={decrement}
                className="text-gray-600 hover:text-black focus:outline-none"
              >
                ▼
              </button>
            </div>
          </div>
        </div>
        <button className="bg-black text-white font-bold py-2 px-4 rounded mb-2">
          Kosárba
        </button>
        <h3 className="text-lg font-semibold mt-4">Termékleírás</h3>
        <p className="text-gray-700">
          Itt található a termék részletes leírása...
        </p>
      </div>
    </div>
  );
}

export default ProductDescription;
