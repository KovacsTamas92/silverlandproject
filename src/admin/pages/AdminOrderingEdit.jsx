import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/adminNavbar";
import AdminPopupWindows from "./AdminPopupWindows";

const AdminOrderingEdit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [tracking_name, setTrackingName] = useState("");
    const [zip_code, setZipCode] = useState("");
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [ordered_data, setOrderData] = useState("");
    const [popupMessage, setPopupMessage] = useState("");
    const [popupNavigate, setPopupNavigate] = useState("");
    const [popupConfirmCallback, setPopupConfirmCallback] = useState(null); 

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/userorder/${location.state.id}`);
                if (!response.ok) {
                    throw new Error("Hiba történt a termék adatainak lekérdezésekor!");
                }
                const item = await response.json();
                setName(item.name);
                setPrice(item.price);
                setEmail(item.email);
                setPhoneNumber(item.phone_number);
                setTrackingName(item.tracking_name);
                setZipCode(item.zip_code);
                setCountry(item.country);
                setAddress(item.address);
                setOrderData(item.ordered_data);
            } catch (error) {
                console.error("Hiba a termék adatainak betöltése során:", error);
            }
        };
        fetchItem();
    }, [location.state.id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/userorder/${location.state.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    price,
                    email,
                    phone_number,
                    tracking_name,
                    zip_code,
                    country,
                    address,
                    ordered_data,
                }),
            });

            if (!response.ok) {
                throw new Error("Hiba történt a rendelés frissítése során!");
            }
            setPopupMessage("A rendelés sikeresen frissítve!")
            setPopupNavigate("/adminordering")
            setPopupConfirmCallback(null)
        } catch (error) {
            popupMessage(`Hiba történt a rendelés frissítése során: ${error}!`)
            popupNavigate("")
            setPopupConfirmCallback(null)
        }
    };

    return (
        <div>
            <AdminNavbar />
            <div className="mt-20 p-4 max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">Rendelés Szerkesztése</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Név
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            Ár
                        </label>
                        <input
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone_number">
                            Telefonszám
                        </label>
                        <input
                            id="phone_number"
                            type="number"
                            value={phone_number}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tracking_name">
                            Csomag követési név
                        </label>
                        <input
                            id="tracking_name"
                            type="text"
                            value={tracking_name}
                            onChange={(e) => setTrackingName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zip_code">
                            Irányítószám
                        </label>
                        <input
                            id="zip_code"
                            type="number"
                            value={zip_code}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                            Ország
                        </label>
                        <input
                            id="country"
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                            Cím
                        </label>
                        <input
                            id="address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ordered_data">
                            Rendelési adatok
                        </label>
                        <textarea
                            id="ordered_data"
                            value={ordered_data}
                            onChange={(e) => setOrderData(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => navigate('/adminordering')}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Mégse
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Frissítés
                        </button>
                    </div>
                </form>
            </div>
            {popupMessage && (
                <AdminPopupWindows 
                    message={popupMessage}
                    popupNavigate={popupNavigate}
                    onConfirm={popupConfirmCallback} 
                    onCancel={() => {
                    setPopupMessage('');
                    setPopupNavigate('');
                    setPopupConfirmCallback(null);
                    }}
                />
            )}
        </div>
    );
};

export default AdminOrderingEdit;
