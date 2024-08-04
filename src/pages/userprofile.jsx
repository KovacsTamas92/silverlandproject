import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import NavBar from "../components/navbar";
import SideBar from "../components/sidebar";
import Logo from "../images/logo.gif";
import Header from "../components/header";

function UserProfile() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [trackingName, setTrackingName] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setUsername(user.username || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phoneNumber || "");
      setTrackingName(user.trackingName || "");
      setCountry(user.country || "");
      setZipCode(user.zipCode || "");
      setCity(user.city || "");
      setAddress(user.address || "");
      setLoading(false);
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/userprofile");
          if (response.ok) {
            const data = await response.json();
            setName(data.name);
            setUsername(data.username);
            setEmail(data.email);
            setPhoneNumber(data.phoneNumber);
            setTrackingName(data.trackingName);
            setCountry(data.country);
            setZipCode(data.zipCode);
            setCity(data.city);
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

      fetchData();
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/updateprofile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          phoneNumber,
          trackingName,
          country,
          zipCode,
          city,
          address,
        }),
      });

      if (response.ok) {
        const data = await response.json();
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
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
            className="border border-gray-300 p-2 mb-4 w-full rounded-md"
            placeholder="Telefon"
          />
          <h2 className="text-xl font-semibold mt-8 mb-4 text-center">
            Szállítási adatok
          </h2>
          <input
            value={trackingName}
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
            value={zipCode}
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
