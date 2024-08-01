import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/adminNavbar';
import Sidebar from '../components/adminSidebar';

const AdminMainPage = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');
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

    const filteredData = data.filter(item => 
        (!selectedCategory || item.maincategory === selectedCategory) &&
        (!selectedSubCategory || item.subcategory === selectedSubCategory) &&
        (item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const sortedData = [...filteredData].sort((a, b) => {
        switch (sortOption) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    });

    return (
        <div>
            <AdminNavbar />
            <div className="flex">
                <Sidebar 
                    onCategorySelect={setSelectedCategory}
                    onSubCategorySelect={setSelectedSubCategory}
                />
                <div className="ml-80 mt-16 p-4 w-full">
                    <div className="mb-4 flex justify-between items-center">
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        >
                            <option value="">Rendezés</option>
                            <option value="price-asc">Ár szerint növekvő</option>
                            <option value="price-desc">Ár szerint csökkenő</option>
                            <option value="name-asc">Név szerint A-Z</option>
                            <option value="name-desc">Név szerint Z-A</option>
                        </select>
                        <input 
                            type="text"
                            placeholder="Keresés termék név alapján..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-2 border border-gray-300 rounded w-64"
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
                        {sortedData.map((item) => (
                            <div key={item._id} className="bg-white border border-gray-300 shadow-md rounded-lg flex flex-col p-4">
                                <img src={item.file} alt={item.name} className="w-full h-32 object-cover mb-4" />
                                <div className="flex flex-col flex-grow">
                                    <h2 className="text-lg font-bold mb-2">{item.name}</h2>
                                    <p className="text-gray-600 mb-1"><strong>Ár:</strong> {item.price}Ft</p>
                                    <p className="text-gray-600 mb-1 break-words"><strong>Leírás:</strong> {item.description}</p>
                                    <p className="text-gray-600 mb-1"><strong>Fő Kategória:</strong> {item.maincategory}</p>
                                    <p className="text-gray-600 mb-1"><strong>Al Kategória:</strong> {item.subcategory}</p>
                                </div>
                                <div className="flex flex-col gap-2 mt-4">
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-2 px-4 w-full focus:outline-none focus:shadow-outline"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        Törlés
                                    </button>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 w-full focus:outline-none focus:shadow-outline"
                                        onClick={() => handleEdit(item._id)}
                                    >
                                        Szerkesztés
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMainPage;


