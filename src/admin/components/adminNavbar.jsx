import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import AdminPopupWindows from '../pages/AdminPopupWindows';
import AdminHeadSidebar from './adminHeadSidebar';

function AdminNavbar() {

    const [popupMessage, setPopupMessage] = useState('')
    const [popupNavigate, setPopupNavigate] = useState('')
    const [popupConfirmCallback, setPopupConfirmCallback] = useState(()=>()=>(setPopupMessage(""), setPopupNavigate(""))); 
    const [popupWindowCancelButtonPreview, setPopupWindowCancelButtonPreview] = useState(false)
    const [adminHeadSidebarPreview, setAdminHeadSidebarPreview] = useState(false)

    const adminLogout = () => {
        sessionStorage.removeItem('userId')
        logout() 
    }

    const handleAdminHeadSidebar = () => {
        setAdminHeadSidebarPreview(true)
        if(adminHeadSidebarPreview){
            setAdminHeadSidebarPreview(false)
        }
    }

    return (
        <nav className="bg-gray-800 p-5 shadow-md fixed top-0 left-0 w-full z-50">
            <div className="flex justify-between items-center">
                <Link to='/adminmain' className="text-white text-xl font-bold">
                    Silverland
                </Link>
                <div className="flex space-x-4 ml-auto">
                    <Link to='/adminordering' className="text-gray-300 hover:text-white transition duration-300">
                        Rendelések
                    </Link>
                    <Link to='/adminupload' className="text-gray-300 hover:text-white transition duration-300">
                        Feltöltés
                    </Link>
                    <button 
                        onClick={handleAdminHeadSidebar} 
                        className="text-gray-300 hover:text-white transition duration-300">
                        <FaUser className="text-white" size={20} />
                    </button>
                </div>
            </div>
            {popupMessage && (
                  <AdminPopupWindows
                  message={popupMessage} 
                  popupNavigate={popupNavigate}
                  onConfirm={popupConfirmCallback} 
                  onCancel={() => {
                    setPopupMessage('');
                    setPopupNavigate('');
                    setPopupConfirmCallback(()=>()=>(setPopupMessage(""), setPopupNavigate("")));
                  }}
                  popupWindowCancelButtonPreview={popupWindowCancelButtonPreview}
              />
            )}
            {adminHeadSidebarPreview && (
                <AdminHeadSidebar />
            )}
        </nav>
    );
}

export default AdminNavbar;
