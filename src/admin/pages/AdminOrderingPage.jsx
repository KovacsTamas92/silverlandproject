import AdminNavbar from "../components/adminNavbar";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from 'react';

const AdminOrderingPage = () => {

    const [data, setData] = useState([]);
    const [error, setError] = useState('');

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
    }, []);

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
        { field: 'price', headerName: 'Ár', type: 'number', width: 100 },
        { field: '', headerName: 'Action', width: 100 },
    ];

    const rows = data.map((item) => ({
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

    return (
        <div className="p-6">
            <AdminNavbar />
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <div className="p-4 overflow-x-auto mt-24 mx-auto max-w-6xl">
                <div className="w-full h-[500px]">
                    <div className="h-full">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminOrderingPage;
