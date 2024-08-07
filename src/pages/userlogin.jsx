import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import NavBar from "../components/navbar";
import SideBar from "../components/sidebar";
import Logo from "../images/logo.gif";
import Header from "../components/header";

function Userlogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Kérlek, add meg a felhasználónevet és a jelszót!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/userlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userId", data._id);
        localStorage.setItem("isLoggedIn", "true");
        login(); // Ensure this function works correctly
        navigate("/");
      } else {
        const message = await response.text();
        alert(message);
      }
    } catch (error) {
      console.error("Hiba történt a bejelentkezés során:", error);
      alert("Hiba történt a bejelentkezés során!");
    }
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

      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center p-4 ml-[255px]"
      >
        <div className="w-full max-w-md bg-gray-200 shadow-2xl rounded-lg p-8 pt-12">
          <h1 className="text-2xl font-bold mb-6 text-center">Bejelentkezés</h1>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-3 mb-4 w-full rounded-md"
            placeholder="Felhasználónév"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 mb-6 w-full rounded-md"
            placeholder="Jelszó"
          />
          <button
            className="bg-black text-white font-bold py-2 px-4 rounded-md w-full"
            type="submit"
          >
            Bejelentkezés
          </button>
        </div>
      </form>
    </div>
  );
}

export default Userlogin;
