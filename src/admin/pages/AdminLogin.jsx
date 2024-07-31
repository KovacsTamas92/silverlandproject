import React, { useState } from 'react';
import AdminNavbar from "../components/adminNavbar";
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/adminmain')
    };

    const navigateToRegistration = () => {
        navigate('/adminregistration')
    }

    return (
        <div>
            <AdminNavbar />
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
        </div>
    );
}

export default AdminLogin;
