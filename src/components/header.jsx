import { Link } from "react-router-dom";
import User from "../images/user.svg";
import Basket from "../images/basket.png";

function Header() {
  return (
    <nav className="ml-[255px] bg-slate-700">
      <div className="flex justify-end">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white text-sm" aria-current="page">
              <img
                src={Basket}
                alt="Basket "
                className="w-8 h-8 rounded-full cursor-pointer"
              />
            </Link>
          </li>
          <li>
            <Link to="/regandlogin" className="text-white text-sm">
              <img
                src={User}
                alt="User "
                className="w-8 h-8 rounded-full cursor-pointer"
              />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
