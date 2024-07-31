import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { FaUser } from 'react-icons/fa';

function AdminNavbar() {

    const {logout} = useAuth()

    const adminLogout = () => {
        localStorage.removeItem('userId')
        logout() 
    }

    return (
        <nav className="bg-gray-800 p-5 shadow-md fixed top-0 left-0 w-full z-50">
            <div className="flex justify-between items-center">
                <Link to='/adminmain' className="text-white text-xl font-bold">
                    Silverland
                </Link>
                <div className="flex space-x-4 ml-auto">
                    <Link to='/adminupload' className="text-gray-300 hover:text-white transition duration-300">
                        Feltöltés
                    </Link>
                    <button
                        onClick={adminLogout}
                        className="text-gray-300 hover:text-white transition duration-300 focus:outline-none"
                    >
                        Kijelentkezés
                    </button>
                    <Link to='/adminuserData' className="text-gray-300 hover:text-white transition duration-300">
                        <FaUser className="text-white" size={20} />
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default AdminNavbar;
