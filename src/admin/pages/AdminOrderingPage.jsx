import AdminNavbar from "../components/adminNavbar";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaBackward, FaEdit, FaCheck } from "react-icons/fa";
import AdminOrderSidebar from "../components/adminOrderSidebar";
import { useNavigate } from "react-router-dom";
import AdminPopupWindows from "../popup/AdminPopupWindows";

const AdminOrderingPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [orderStatus, setOrderStatus] = useState("active");
  const [isDataRefreshed, setIsDataRefreshed] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupNavigate, setPopupNavigate] = useState("");
  const [popupConfirmCallback, setPopupConfirmCallback] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/userorder");
        if (!response.ok) {
          throw new Error("Hiba történt az adatok lekérdezésekor!");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [isDataRefreshed]);

  const filteredData = data.filter((item) => {
    const matchesStatus =
      (orderStatus === "active" && item.is_active) ||
      (orderStatus === "completed" && !item.is_active);

    return matchesStatus;
  })

  const confirmActiveChange = (id) => {
    let isActive = false;

    if (orderStatus === "completed") {
      isActive = true;
      setPopupMessage("Biztos, hogy újra aktiválod a rendelést?");
    } else {
      setPopupMessage("Biztos lezárod a rendelést?");
    }
    setPopupConfirmCallback(() => () => handleActive(id, isActive));
  };

  const confirmDeleteChange = (id) => {
    setPopupMessage("Biztos, hogy törlöd a rendelést?")
    setPopupConfirmCallback(() => () => handleDelete(id));
  }

  const handleActive = async (id, isActive) => {
    try {
      const response = await fetch(`http://localhost:3000/api/userorder/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_active: isActive }),
      });

      if (!response.ok) {
        throw new Error("Hiba történt az adat mentése során!");
      }
      setIsDataRefreshed((prev) => !prev);
    } catch (error) {
      console.error("Hiba történt az adat mentése során:", error);
    } finally {
      setPopupMessage('');
      setPopupNavigate('');
      setPopupConfirmCallback(null);
    }
  };

  const handleStatusChange = (status) => {
    setOrderStatus(status);
  };

  const handleDelete = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/api/userorder/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Hiba történt a törlés során!");
        }
        setData(data.filter((item) => item._id !== id));
        setIsDataRefreshed((prev) => !prev);
      } catch (error) {
        setError(error.message);
      } finally {
        setPopupMessage('');
        setPopupNavigate('');
        setPopupConfirmCallback(null);
      }
  };

  const handleEdit = (id) => {
    navigate("/adminorderingedit", { state: { id } });
  };

  const columns = [
    { field: "order_number", headerName: "Azonosító", width: 100 },
    { field: "name", headerName: "Név", width: 100 },
    { field: "email", headerName: "Email", width: 100 },
    { field: "phone_number", headerName: "Telefonszám", width: 100 },
    { field: "country", headerName: "Ország", width: 100 },
    { field: "zip_code", headerName: "Irányítószám", width: 60 },
    { field: "city", headerName: "Város", width: 100 },
    { field: "address", headerName: "Cím", width: 100 },
    { field: "ordered_data", headerName: "Termékek", width: 100 },
    { field: "price", headerName: "Ár(Ft)", type: "number", width: 80 },
    {
      field: "",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <div className="flex justify-center items-center gap-2 h-full">
          <button className="py-1 px-2" onClick={() => confirmDeleteChange(params.id)}>
            <FaTrashAlt size={20} />
          </button>
          {orderStatus === "active" ? (
            <div className="flex">
              <button className="py-1 px-2" onClick={() => confirmActiveChange(params.id)}>
                <FaCheck size={20} />
              </button>
              <button className="py-1 px-2" onClick={() => handleEdit(params.id)}>
                <FaEdit size={20} />
              </button>
            </div>
          ) : (
            <button className="py-1 px-2" onClick={() => confirmActiveChange(params.id)}>
              <FaBackward size={20} />
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
    order_number: item.order_number,
  }));

  return (
    <div>
      <AdminNavbar />
      <div className="flex">
        <AdminOrderSidebar onStatusChange={handleStatusChange} />
        <div className="ml-80 pl-20 pt-20">
          {error && <p className="text-red-500">{error}</p>}
          <div className="h-550 w-1100 fixed">
            <DataGrid
              rows={rows}
              columns={columns}
              getRowHeight={() => "auto"}
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
            setPopupConfirmCallback(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminOrderingPage;
