import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="ml-[255px] bg-slate-700">
      <div className="flex justify-end">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white text-sm" aria-current="page">
              Kosaram
            </Link>
          </li>
          <li>
            <Link to="/elorendeles" className="text-white text-sm">
              Bejelentkezés
            </Link>
          </li>
          <li>
            <Link to="/rolunk" className="text-white text-sm">
              Regisztráció
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
