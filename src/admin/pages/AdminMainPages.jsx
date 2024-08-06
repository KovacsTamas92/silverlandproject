import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/adminNavbar';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import AdminMainSidebar from '../components/adminMainSidebar';
import AdminPopupWindows from './AdminPopupWindows';

const AdminMainPage = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [isDataRefreshed, setIsDataRefreshed] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupNavigate, setPopupNavigate] = useState("");
    const [popupConfirmCallback, setPopupConfirmCallback] = useState(()=>()=>(setPopupMessage(""), setPopupNavigate(""))); 
    const [popupWindowCancelButtonPreview, setPopupWindowCancelButtonPreview] = useState(false)
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
    }, [isDataRefreshed]);

    const confirmDeleteChange = (id) => {
        setPopupMessage("Biztos, hogy törlöd a terméket?")
        setPopupConfirmCallback(() => () => handleDelete(id));
        setPopupWindowCancelButtonPreview(true)
      }

    const handleDelete = async (id) => {
    
        try {
            const response = await fetch(`http://localhost:3000/api/data/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Hiba történt a törlés során!');
            }
            setData(data.filter(item => item._id !== id));
            setIsDataRefreshed((prev) => !prev);
        } catch (error) {
            setError(error.message);
        } finally {
            setPopupMessage('');
            setPopupNavigate('');
            setPopupConfirmCallback(()=>()=>(setPopupMessage(""), setPopupNavigate("")));
            setPopupWindowCancelButtonPreview(false)
        }

    };

    const handleEdit = (id) => {
        navigate('/adminupload', { state: { id } });
    };

    const filteredData = data.filter(item => 
        (!selectedCategory || item.maincategory === selectedCategory) &&
        (!selectedSubCategory || item.subcategory === selectedSubCategory)
    );

    const columns = [
        { field: 'name', headerName: 'Név', width: 200 }, 
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
        { field: 'price', headerName: 'Ár', width: 100 }, 
        { field: 'description', headerName: 'Leírás', width: 250 }, 
        { field: 'maincategory', headerName: 'Fő Kategória', width: 150 }, 
        { field: 'subcategory', headerName: 'Al Kategória', width: 150 }, 
        {
            field: 'actions',
            headerName: '',
            width: 100, 
            renderCell: (params) => (
                <div className="flex justify-center items-center gap-2 h-full">
                <button
                    className="py-1 px-2"
                    onClick={() => confirmDeleteChange(params.row.id)}
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
                <AdminMainSidebar 
                    onCategorySelect={setSelectedCategory}
                    onSubCategorySelect={setSelectedSubCategory}
                />
                <div className="ml-80 pl-20 pt-20">
                    {error && <p className="text-red-500">{error}</p>}
                    <div className='h-550 w-1100 fixed'>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            getRowHeight={() => 'auto'}
                            sx={{
                                [`& .${gridClasses.cell}`]: {
                                  py: 1,
                                },
                              }}
                        />
                    </div>
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
        </div>
    );
};

export default AdminMainPage;