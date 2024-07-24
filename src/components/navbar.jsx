import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="ml-200">
      <div className="bg-slate-700 ml-200">
        <ul className="flex justify-around">
          <li>
            <Link to="/" className="text-white" aria-current="page">
              Főoldal
            </Link>
          </li>
          <li>
            <Link to="/elorendeles" className="text-white">
              Előrendelés
            </Link>
          </li>
          <li>
            <Link to="/rolunk" className="text-white">
              Rólunk
            </Link>
          </li>
          <li>
            <Link to="/kapcsolat" className="text-white">
              Kapcsolat
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
