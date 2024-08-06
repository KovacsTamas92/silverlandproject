import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import SideBar from "../components/sidebar";
import Logo from "../images/logo.gif";
import Header from "../components/header";

function UserProfile() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [tracking_name, setTrackingName] = useState("");
  const [country, setCountry] = useState("");
  const [zip_code, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        navigate("/userlogin");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/user/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setName(data.name);
          setUsername(data.username);
          setEmail(data.email);
          setPhoneNumber(data.phone_number);
          setTrackingName(data.tracking_name);
          setCountry(data.country);
          setZipCode(data.zip_code);
          setCity(data.city);
          setPassword(data.password);
          setAddress(data.address);
        } else {
          throw new Error("Hiba történt az adatok betöltése során.");
        }
      } catch (error) {
        console.error("Hiba történt az adatok betöltése során:", error);
        alert("Hiba történt az adatok betöltése során!");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/userlogin");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          phone_number,
          password,
          tracking_name,
          country,
          zip_code,
          city,
          address,
        }),
      });

      if (response.ok) {
        /* const data = await response.json(); */
        alert("Profil sikeresen frissítve!");
        navigate("/");
      } else {
        const message = await response.text();
        alert(message);
      }
    } catch (error) {
      console.error("Hiba történt a profil frissítése során:", error);
      alert("Hiba történt a profil frissítése során!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Betöltés...
      </div>
    );
  }

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
      <div className="flex justify-center items-center min-h-screen pl-[255px]">
        <form
          onSubmit={handleUpdateProfile}
          className="bg-gray-200 shadow-2xl rounded-lg p-8 w-full max-w-lg mt-12"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">
            Profil Frissítése
          </h1>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="border border-gray-300 p-2 mb-4 w-full rounded-md"
            placeholder="Név"
          />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="border border-gray-300 p-2 mb-4 w-full rounded-md"
            placeholder="Felhasználónév"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="border border-gray-300 p-2 mb-4 w-full rounded-md"
            placeholder="Email"
          />
          <input
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
            className="border border-gray-300 p-2 mb-4 w-full rounded-md"
            placeholder="Telefon"
          />
          <h2 className="text-xl font-semibold mt-8 mb-4 text-center">
            Szállítási adatok
          </h2>
          <input
            value={tracking_name}
            onChange={(e) => setTrackingName(e.target.value)}
            type="text"
            className="border border-gray-300 p-2 mb-4 w-full rounded-md"
            placeholder="Név"
          />
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            className="border border-gray-300 p-2 mb-4 w-full rounded-md"
            placeholder="Ország"
          />
          <input
            value={zip_code}
            onChange={(e) => setZipCode(e.target.value)}
            type="text"
            className="border border-gray-300 p-2 mb-4 w-full rounded-md"
            placeholder="Irányítószám"
          />
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            className="border border-gray-300 p-2 mb-4 w-full rounded-md"
            placeholder="Város"
          />
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            className="border border-gray-300 p-2 mb-4 w-full rounded-md"
            placeholder="Cím"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            className="border border-gray-300 p-2 mb-4 w-full rounded-md"
            placeholder="Password"
          />
          <button
            className="bg-black text-white font-bold py-2 px-4 rounded-md w-full mt-4"
            type="submit"
          >
            Profil Frissítése
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
