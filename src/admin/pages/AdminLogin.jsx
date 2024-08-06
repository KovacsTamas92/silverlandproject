import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import AdminPopupWindows from './AdminPopupWindows';
const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [popupMessage, setPopupMessage] = useState("");
    const [popupNavigate, setPopupNavigate] = useState("");
    const [popupConfirmCallback, setPopupConfirmCallback] = useState(null); 
    const [popupWindowCancelButtonPreview, setPopupWindowCancelButtonPreview] = useState(false)
    const navigate = useNavigate()
    const {login} = useAuth()

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!username || !password) {
            setPopupMessage('Kérlek add meg a felhasználó nevet és a jelszót!')
            setPopupNavigate('')
            setPopupConfirmCallback(()=>()=>(setPopupMessage(""), setPopupNavigate("")))
            setPopupWindowCancelButtonPreview(false)
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/adminlogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json()
                sessionStorage.setItem('userId', data._id)
                login()
                setPopupMessage('Sikeres bejelentkezés!')
                setPopupNavigate('/adminmain')
                setPopupConfirmCallback(()=>()=>(setPopupMessage(""), setPopupNavigate("")))
                setPopupWindowCancelButtonPreview(false)
            } else {
                const message = await response.text();
                setPopupMessage(`${message}`)
                setPopupNavigate('')
                setPopupConfirmCallback(()=>()=>(setPopupMessage(""), setPopupNavigate("")))
                setPopupWindowCancelButtonPreview(false)
            }
        } catch (error) {
            setPopupMessage(`${error}` )
            setPopupNavigate('')
            setPopupConfirmCallback(()=>()=>(setPopupMessage(""), setPopupNavigate("")))
            setPopupWindowCancelButtonPreview(false)
        }
    };

    const navigateToRegistration = () => {
        navigate('/adminregistration')
    }

    return (
        <div>
            <div className="mt-20 p-4 max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">Silverland Admin Bejelentkezés</h2>
                <form onSubmit={handleLogin}>
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
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Jelszó
                        </label>
                        <input 
                            id="password"
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button 
                            type="submit" 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Bejelentkezés
                        </button>
                        <a 
                            href="#" 
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            onClick={navigateToRegistration}
                        >
                            Regisztráció
                        </a>
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

export default AdminLogin;
