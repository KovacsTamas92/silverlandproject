import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import SideBar from "../components/sidebar";
import Logo from "../images/logo.gif";
import Header from "../components/header";

function UserRegister() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState(0);
  const [tracking_name, setTrackingName] = useState("");
  const [country, setCountry] = useState("");
  const [zip_code, setZipCode] = useState(0);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const phone = Number(phone_number);
    const zip = Number(zip_code);
    if (password !== confirmPassword) {
      alert("A jelszavak nem egyeznek!");
      return;
    }
    const userdata = {
      name,
      username,
      password,
      email,
      phone_number: phone,
      tracking_name,
      country,
      zip_code: zip,
      city,
      address,
    };

    try {
      console.log(userdata);
      const response = await fetch(
        "http://localhost:3000/api/userregistration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userdata),
        }
      );

      if (!response.ok) {
        throw new Error("Hiba történt az adat mentése során!");
      }
      navigate("/");
    } catch (error) {
      console.error("Hiba történt a regisztráció során:", error);
      alert("Hiba történt a regisztráció során!");
    }
  };

  return (
    <div>
      <Header />
      <div className="ml-[255px]">
        <div className="flex justify-center ">
          <img src={Logo} alt="" />
        </div>
        <div className="ml-200">
          <NavBar />
        </div>
      </div>

      <div>
        <SideBar />
      </div>
      <div className="flex justify-center items-center min-h-screen pl-[255px]">
        <form
          onSubmit={handleRegister}
          className="bg-gray-200 shadow-2xl rounded-lg p-8 w-full max-w-lg mt-12"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Regisztráció</h1>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="border border-gray-300 p-2 mb-4 w-full rounded-md"
            placeholder="Név"
          />
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="border border-gray-300 p-2 mb-4 w-full rounded-md"
            placeholder="Felhasználónév"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="border border-gray-300 p-2 mb-4 w-full rounded-md"
            placeholder="Jelszó"
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            className="border border-gray-300 p-2 mb-4 w-full rounded-md"
            placeholder="Jelszó megerősítése"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="border border-gray-300 p-2 mb-4 w-full rounded-md"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="number"
            className="border border-gray-300 p-2 mb-4 w-full rounded-md"
            placeholder="Telefon"
          />
          <h2 className="text-xl font-semibold mt-8 mb-4 text-center">
            Szállítási adatok
          </h2>
          <input
            onChange={(e) => setTrackingName(e.target.value)}
            type="text"
            className="border border-gray-300 p-2 mb-4 w-full rounded-md"
            placeholder="Név"
          />
          <input
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            className="border border-gray-300 p-2 mb-4 w-full rounded-md"
            placeholder="Ország"
          />
          <input
            onChange={(e) => setZipCode(e.target.value)}
            type="number"
            className="border border-gray-300 p-2 mb-4 w-full rounded-md"
            placeholder="Irányítószám"
          />
          <input
            onChange={(e) => setCity(e.target.value)}
            type="text"
            className="border border-gray-300 p-2 mb-4 w-full rounded-md"
            placeholder="Város"
          />
          <input
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            className="border border-gray-300 p-2 mb-4 w-full rounded-md"
            placeholder="Cím"
          />
          <button
            className="bg-black text-white font-bold py-2 px-4 rounded-md w-full mt-4"
            type="submit"
          >
            Regisztráció
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserRegister;
