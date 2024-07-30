import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/adminNavbar';

const AdminMainPage = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/data');
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

    const handleDelete = async (id) => {
        if (window.confirm('Biztosan törölni szeretné ezt a terméket?')) {
            try {
                const response = await fetch(`http://localhost:3000/api/data/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Hiba történt a törlés során!');
                }
                setData(data.filter(item => item._id !== id));
                alert('Termék sikeresen törölve!');
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleEdit = (id) => {
        navigate('/adminupload', { state: { id } });
    };

    return (
        <div>
            <AdminNavbar />
            <div className="mt-20 p-4">
                <ul className="space-y-4">
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {data.map((item) => (
                            <div key={item._id} className="bg-white p-4 border rounded-lg shadow-lg">
                                <img src={item.file} alt={item.name} className="w-full h-48 object-cover rounded-md"/>
                                <h2 className="text-xl font-bold mt-4">{item.name}</h2>
                                <p className="text-gray-600 mt-2"><strong>Ár:</strong> {item.price}Ft</p>
                                <p className="text-gray-600 mt-2"><strong>Leírás:</strong> {item.description}</p>
                                <p className="text-gray-600 mt-2"><strong>Fő Kategória:</strong> {item.maincategory}</p>
                                <p className="text-gray-600 mt-2"><strong>Al Kategória:</strong> {item.subcategory}</p>
                                <div className="mt-4 flex gap-4">
                                    <button
                                        className="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        Törlés
                                    </button>
                                    <button
                                        className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() => handleEdit(item._id)}
                                    >
                                        Szerkesztés
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default AdminMainPage;