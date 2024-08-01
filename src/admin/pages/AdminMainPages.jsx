import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/adminNavbar';
import Sidebar from '../components/adminSidebar';
import { DataGrid } from '@mui/x-data-grid';
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const AdminMainPage = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
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
        console.log(id)
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

    const columns = [
        { field: 'name', headerName: 'Név', width: 150 }, 
        {
            field: 'image',
            headerName: 'Kép',
            width: 100,
            renderCell: (params) => (
                <img
                    src={params.row.image}
                    alt={params.row.name}
                    style={{ width: '80px', height: 'auto', objectFit: 'cover' }}
                />
            ),
        },
        { field: 'price', headerName: 'Ár', type: 'number', width: 100 }, 
        { field: 'description', headerName: 'Leírás', width: 200 }, 
        { field: 'maincategory', headerName: 'Fő Kategória', width: 150 }, 
        { field: 'subcategory', headerName: 'Al Kategória', width: 150 }, 
        {
            field: 'actions',
            headerName: 'Akciók',
            width: 100, 
            renderCell: (params) => (
                <div className="flex justify-center items-center gap-2 h-full">
                <button
                    className="py-1 px-2"
                    onClick={() => handleDelete(params.row.id)}
                >
                    <FaTrashAlt size={20} />
                </button>
                <button
                    className="py-1 px-2"
                    onClick={() => handleEdit(params.row.id)}
                >
                    <FaEdit  size={20}/>
                </button>
            </div>
            ),
        },
    ];

    const rows = filteredData.map(item => ({
        id: item._id,
        name: item.name,
        price: item.price,
        description: item.description,
        maincategory: item.maincategory,
        subcategory: item.subcategory,
        image: item.file
    }));

    return (
        <div>
            <AdminNavbar />
            <div className="flex">
                <Sidebar 
                    onCategorySelect={setSelectedCategory}
                    onSubCategorySelect={setSelectedSubCategory}
                />
                <div className="ml-80 pl-20 pt-20">
                    <div className="mb-4 flex justify-end items-center">
                        <input 
                            type="text"
                            placeholder="Keresés termék név alapján..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-2 border border-gray-300 rounded w-64"
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className='h-550 w-100'>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                           /*  pageSize={10} */
                            /* rowsPerPageOptions={[10]} */
                           /*  pageSizeOptions={[10]} */
                           pageSizeOptions={[5, 10, 25]}
                           />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMainPage;