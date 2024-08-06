import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/adminNavbar';
import AdminPopupWindows from './AdminPopupWindows';

const AdminRegistration = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [masterKey, setMasterKey] = useState('');
    const [itemId, setItemId] = useState(null)
    const [popupMessage, setPopupMessage] = useState('')
    const [popupNavigate, setPopupNavigate] = useState('')
    const [popupConfirmCallback, setPopupConfirmCallback] = useState(null); 
    const [popupWindowCancelButtonPreview, setPopupWindowCancelButtonPreview] = useState(false)
    const navigate = useNavigate();
    const location = useLocation()

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPopupMessage('A jelszavak nem egyeznek.')
            setPopupNavigate('')
            setPopupConfirmCallback(()=>()=>(setPopupMessage(""), setPopupNavigate("")))
            setPopupWindowCancelButtonPreview(false)
            return;
        }

        try {
            await saveData();
        } catch (error) {
            setPopupMessage(`Hiba történt az adat mentése során!, ${error}`)
            setPopupNavigate('')
            setPopupConfirmCallback(null)
            setPopupWindowCancelButtonPreview(false)
        }
    };

    const saveData = async () => {
        const adminData = {
            username,
            password,
            email,
            masterKey
        };

        const url = 'http://localhost:3000/api/adminregistration';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adminData),
        });

        if (!response.ok) {
            throw new Error('Hiba történt az adat mentése során!');
        }
        setPopupMessage('Sikeres regisztráció!')
        setPopupNavigate('/adminlogin')
        setPopupConfirmCallback(null)
        setPopupWindowCancelButtonPreview(false)
    };

    const handleBack = () => {
        {itemId ? navigate('/adminmain') : navigate('/adminlogin');}
    };

    useEffect(() => {
        if (location.state && location.state.id) {
            // Ha van ID, akkor töltsük be az Admin adatait
            const fetchItem = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/api/admin/${location.state.id}`);
                    if (!response.ok) {
                        throw new Error('Hiba történt a termék adatainak lekérdezésekor!');
                    }
                    const item = await response.json();
                    setItemId(item._id);
                    setUsername(item.username);
                    setEmail(item.email)
                } catch (error) {
                    setPopupMessage(`Hiba történt az adatok lekérdezése során!, ${error}`)
                    setPopupNavigate('');
                    setPopupConfirmCallback(null)
                    setPopupWindowCancelButtonPreview(false)
                }
            };
            fetchItem();
        }
    }, [location.state]);

    return (
        <div>
            {itemId ? <AdminNavbar /> : ''}
                <div className="mt-20 p-4 max-w-md mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-center">Admin Regisztráció</h2>
                    <form onSubmit={handleRegister}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Felhasználónév
                            </label>
                            <input 
                                id="username"
                                type="text" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email cím
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Jelszó
                            </label>
                            <input 
                                id="password"
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                                Jelszó megerősítése
                            </label>
                            <input 
                                id="confirmPassword"
                                type="password" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="masterKey">
                                Admin Master Key
                            </label>
                            <input 
                                id="masterKey"
                                type="password" 
                                value={masterKey} 
                                onChange={(e) => setMasterKey(e.target.value)} 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button 
                                type="button" 
                                onClick={handleBack} 
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Mégse
                            </button>
                            <button 
                                type="submit" 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                {itemId ? 'Módosítás' : 'Regisztráció'}
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
                    popupWindowCancelButtonPreview={popupWindowCancelButtonPreview}
                    />
                )}
        </div>
    );
}

export default AdminRegistration;
