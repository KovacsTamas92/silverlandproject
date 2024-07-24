import { Link } from "react-router-dom";
import Pathfinder from "../images/pathfinder.png";

function ProductCard() {
  return (
    <div className="flex items-center justify-center mr-4">
      <div className="border border-gray-200 shadow-2xl rounded-md p-4 text-center">
        <img src={Pathfinder} alt="Pathfinder" className="mx-auto" />
        <h2 className="text-xl font-bold">Pathfinder</h2>
        <h3 className="text-sm text-gray-500 mb-2">Készleten</h3>
        <h2 className="text-2xl font-bold">17 990 Ft</h2>

        <div className="flex flex-col mt-4">
          <button className="bg-black text-white font-bold py-2 px-4 rounded mb-2">
            Kosárba
          </button>
          <Link
            to="/description"
            className="underline text-black hover:text-blue-600 font-bold py-2 px-4"
          >
            Részletek
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
