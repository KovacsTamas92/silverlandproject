import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import AdminPopupWindows from '../pages/AdminPopupWindows';

function AdminHeadSidebar() {
  const navigate = useNavigate();
  const [popupMessage, setPopupMessage] = useState('');
  const [popupNavigate, setPopupNavigate] = useState('');
  const [popupConfirmCallback, setPopupConfirmCallback] = useState(() => () => (setPopupMessage(''), setPopupNavigate('')));
  const [popupWindowCancelButtonPreview, setPopupWindowCancelButtonPreview] = useState(false);
  const { logout } = useAuth();

  const confirmDeleteChange = (id) => {
    setPopupMessage('Biztos, hogy törlöd a regisztrációt?');
    setPopupNavigate('/adminlogin');
    setPopupConfirmCallback(() => () => handleDelete(id));
    setPopupWindowCancelButtonPreview(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Hiba történt a törlés során!');
      }
      setPopupMessage('Sikeres törlés!');
    } catch (error) {
      setPopupMessage(`Hiba történt a törlés során! ${error.message}`);
    }
  };

  const handleEdit = (id) => {
    navigate('/adminregistration', { state: { id } });
  };

  const handleAdminLogout = () => {
    setPopupMessage('Biztos kijelentkezik?');
    setPopupWindowCancelButtonPreview(true);
    setPopupNavigate('/adminlogin')
    setPopupConfirmCallback(() => () => adminLogout());
  };

  const adminLogout = () => {
    sessionStorage.removeItem('userId');
    logout();
  };

  return (
    <div className="flex justify-end">
      <div className="w-40 bg-gray-800 text-white h-100 p-4 fixed top-16 right-0 overflow-y-auto rounded">
        <button
          className="w-full text-left py-2 px-4 bg-gray-800 hover:bg-gray-600 transition duration-300 rounded"
          onClick={() => handleEdit(sessionStorage.getItem('userId'))}
        >
          Regisztráció szerkesztése
        </button>
        <button
          className="w-full text-left py-2 px-4 bg-gray-800 hover:bg-gray-600 transition duration-300 rounded"
          onClick={() => confirmDeleteChange(sessionStorage.getItem('userId'))}
        >
          Regisztráció törlése
        </button>
        <button
          className="w-full text-left py-2 px-4 bg-gray-800 hover:bg-gray-600 transition duration-300 rounded"
          onClick={() => handleAdminLogout()}
        >
          Kijelentkezés
        </button>
      </div>
      {popupMessage && (
        <AdminPopupWindows
          message={popupMessage}
          popupNavigate={popupNavigate}
          onConfirm={popupConfirmCallback}
          onCancel={() => {
            setPopupMessage('');
            setPopupNavigate('');
            setPopupConfirmCallback(() => () => (setPopupMessage(''), setPopupNavigate('')));
          }}
          popupWindowCancelButtonPreview={popupWindowCancelButtonPreview}
        />
      )}
    </div>
  );
}

export default AdminHeadSidebar;
