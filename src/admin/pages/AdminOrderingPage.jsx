import AdminNavbar from "../components/adminNavbar";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaBackward} from "react-icons/fa";
import { TiTickOutline } from "react-icons/ti";
import AdminOrderSidebar from '../components/adminOrderSidebar'


const AdminOrderingPage = () => {

    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('')
    const [orderStatus, setOrderStatus] = useState('active');
    const [isDataRefreshed, setIsDataRefreshed] = useState(false);
 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/userorder');
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

    const filteredData = data.filter(item => {
        const orderNumber = item.order_number ? String(item.order_number) : '';
        const matchesSearchTerm = orderNumber.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = (orderStatus === 'active' && item.is_active) || (orderStatus === 'completed' && !item.is_active);
    
        return matchesSearchTerm && matchesStatus;
    });

    const handleActive = async (id) => {

        let isActive = false

        if(orderStatus === 'completed'){
            isActive = true
            alert('Biztos, hogy újra aktíválod a rendelést?')
        }else{
            alert('Biztos, hogy kész a rendelés?')
        }

        try{
        const response = await fetch(`http://localhost:3000/api/userorder/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({is_active: isActive}),
        });

        if (!response.ok) {
            throw new Error('Hiba történt az adat mentése során!');
        }

        setIsDataRefreshed(prev => !prev);

        } catch (error) {
            console.error('Hiba történt az adat mentése során:', error);
        }
    }


    const columns = [
        { field: 'order_number', headerName: 'Azonosító', width: 100 }, 
        { field: 'name', headerName: 'Név', width: 100 }, 
        { field: 'email', headerName: 'Email', width: 100 }, 
        { field: 'phone_number', headerName: 'Telefonszám', type: 'number', width: 100 }, 
        { field: 'country', headerName: 'Ország', width: 100 }, 
        { field: 'zip_code', headerName: 'Irányítószám', type: 'number', width: 100 }, 
        { field: 'city', headerName: 'Város', width: 100 }, 
        { field: 'address', headerName: 'Cím', width: 100 }, 
        { field: 'ordered_data', headerName: 'Termékek', width: 100 },
        { field: 'price', headerName: 'Ár(Ft)', type: 'number', width: 80},
        { 
            field: '', 
            headerName: 'Action', 
            width: 90,
            renderCell: (params) => (
                <div className="flex justify-center items-center gap-2 h-full">
                <button
                    className="py-1 px-2"
                    onClick={() => handleDelete(params.id)}
                >
                    <FaTrashAlt size={20} />
                </button>
                {orderStatus === 'active' ? (
                    <button
                        className="py-1 px-2"
                        onClick={()=>handleActive(params.id)}
                    >
                        <TiTickOutline size={20}/>
                    </button>
                ) : (
                    <button
                        className="py-1 px-2"
                        onClick={()=>(handleActive(params.id))}
                    >
                        <FaBackward size={20}/>
                    </button>
                )}
            </div>
            ),
        
        },
    ];

    const rows = filteredData.map((item) => ({
        id: item._id,
        name: item.name,
        price: item.price,
        email: item.email,
        phone_number: item.phone_number,
        country: item.country,
        zip_code: item.zip_code,
        city: item.city,
        address: item.address,
        ordered_data: item.ordered_data,
        order_number: item.order_number
    }));

    const handleStatusChange = (status) => {
        setOrderStatus(status);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Biztosan törölni szeretné ezt a rendelést?')) {
            try {
                const response = await fetch(`http://localhost:3000/api/userorder/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Hiba történt a rendelés során!');
                }
                setData(data.filter(item => item._id !== id));
                alert('Rendelés sikeresen törölve!');
                handleStatusChange()
            } catch (error) {
                setError(error.message);
            }
        }
    };

    return (
        <div>
        <AdminNavbar />
        <div className="flex">
            <AdminOrderSidebar onStatusChange={handleStatusChange}
            />
            <div className="ml-80 pl-20 pt-20">
                <div className="mb-4 flex justify-start items-center">
                    <input 
                        type="text"
                        placeholder="Keresés rendelésszám alapján..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border border-gray-300 rounded w-64"
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <div className='h-550 w-1100 fixed'>
                <DataGrid
                            rows={rows}
                            columns={columns}
                            autoHeight 
                        />
                </div>
            </div>
        </div>
    </div>
    )
}

export default AdminOrderingPage;
