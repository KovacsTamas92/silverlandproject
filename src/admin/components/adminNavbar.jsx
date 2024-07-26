import React from 'react';
import { Link } from 'react-router-dom';

function AdminNavbar() {
    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            <div className="flex justify-between items-center">
                <Link to='/adminmain' className="text-white text-xl font-bold">
                    Silverland
                </Link>
                <div className="flex space-x-4">
                    <Link to='/adminupload' className="text-gray-300 hover:text-white transition duration-300">
                        Feltöltés
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default AdminNavbar;
