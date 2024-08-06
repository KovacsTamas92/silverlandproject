import AdminNavbar from '../components/adminNavbar';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPopupWindows from './AdminPopupWindows';

const AdminUserData = () => {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();
    const [popupMessage, setPopupMessage] = useState('')
    const [popupNavigate, setPopupNavigate] = useState('')
    const [popupConfirmCallback, setPopupConfirmCallback] = useState(null); 

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/admin/${userId}`);
                if (!response.ok) {
                    throw new Error('Hiba történt az adatok lekérdezésekor!');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    const confirmDeleteChange = (id) => {
        setPopupMessage("Biztos, hogy törlöd a rengisztrációt?")
        setPopupNavigate("/adminlogin")
        setPopupConfirmCallback(() => () => handleDelete(id));
      }

    const handleDelete = async (id) => { 
            try {
                const response = await fetch(`http://localhost:3000/api/admin/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Hiba történt a törlés során!');
                }
                setData(null);
            } catch (error) {
                setError(error.message);
            }finally{
                setPopupMessage("")
                setPopupNavigate("")
                setPopupConfirmCallback(null)
            }
    };

    const handleEdit = (id) => {
        navigate('/adminregistration', { state: { id } });
    };

    return (
        <div>
            <AdminNavbar />
            <div className="mt-20 p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
                {error && <p className="text-red-500">{error}</p>}
                {data ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-center">Felhasználói adatok</h2>
                        <div className="mb-4">
                            <p><strong>Név:</strong> {data.username}</p>
                            <p><strong>Email:</strong> {data.email}</p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
                                onClick={() => confirmDeleteChange(data._id)}
                            >
                                Regisztráció törlése
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
                                onClick={() => handleEdit(data._id)}
                            >
                                Szerkesztés
                            </button>
                        </div>
                    </div>
                ) : (
                    !error && <p>Adatok betöltése...</p>
                )}
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
}

export default AdminUserData;
