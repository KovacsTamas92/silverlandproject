import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import User from "../images/user.svg";
import CartIcon from "./cart";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedInStatus === "true");
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <nav className="ml-[255px] bg-slate-700">
      <div className="flex justify-end">
        <ul className="flex space-x-4">
          <li>
            <CartIcon />
          </li>
          <li className="relative">
            <button
              onClick={toggleDropdown}
              className="text-white text-sm focus:outline-none"
            >
              <img
                src={User}
                alt="User"
                className="w-8 h-8 rounded-full cursor-pointer"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <ul className="py-2 text-gray-700">
                  {isLoggedIn ? (
                    <>
                      <li>
                        <Link
                          to="/userprofile"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Profil
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Rendelések
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                        >
                          Kijelentkezés
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/userlogin"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Bejelentkezés
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/registration"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Regisztráció
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
