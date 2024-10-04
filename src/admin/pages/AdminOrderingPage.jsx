import AdminNavbar from "../components/adminNavbar";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaBackward, FaEdit, FaCheck } from "react-icons/fa";
import AdminOrderSidebar from "../components/adminOrderSidebar";
import { useNavigate } from "react-router-dom";
import AdminPopupWindows from "./AdminPopupWindows";
import { IoMdRefresh } from "react-icons/io";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AdminOrderingPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [orderStatus, setOrderStatus] = useState("active");
  const [isDataRefreshed, setIsDataRefreshed] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupNavigate, setPopupNavigate] = useState("");
  const [popupConfirmCallback, setPopupConfirmCallback] = useState(()=>()=>(setPopupMessage(""), setPopupNavigate(""))); 
  const [popupWindowCancelButtonPreview, setPopupWindowCancelButtonPreview] = useState(false)
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
      setPopupWindowCancelButtonPreview(true)
      setPopupConfirmCallback(() => () => handleActive(id, isActive));
    } else {
      setPopupMessage("Biztos lezárod a rendelést?");
      setPopupWindowCancelButtonPreview(true)
      setPopupConfirmCallback(() => () => handleActive(id, isActive));
    }
  };

  const handleDoneOrder = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/api/userorderdone/${id}`);
        if (!response.ok) {
          throw new Error("Hiba történt az adatok lekérdezésekor!");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setPopupMessage('')
        setPopupMessage('')
        setPopupConfirmCallback(()=>()=>(setPopupMessage(""), setPopupNavigate("")))
      }
  }
 
  const confirmDeleteChange = (id) => {
    setPopupMessage("Biztos, hogy törlöd a rendelést?")
    setPopupWindowCancelButtonPreview(true)
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
      
      if(!isActive){
        handleDoneOrder(id)
      }
      
    } catch (error) {
      console.error("Hiba történt az adat mentése során:", error);
      setPopupMessage(`${error.message}`)
    } finally {
      setPopupMessage('')
      setPopupMessage('')
      setPopupConfirmCallback(()=>()=>(setPopupMessage(""), setPopupNavigate("")))
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
        setPopupMessage('')
        setPopupMessage('')
        setPopupConfirmCallback(()=>()=>(setPopupMessage(""), setPopupNavigate("")))
      }
  };

  const handleEdit = (id) => {
    navigate("/adminorderingedit", { state: { id } });
  };

  const pageRefreshed = () => {
    setIsDataRefreshed((prev) => !prev);
  }

  const columns = [
    { field: "order_number", headerName: "Azonosító", width: 100 },
    { field: "name", headerName: "Név", width: 100 },
    { field: "email", headerName: "Email", width: 100 },
    { field: "phone_number", headerName: "Telefonszám", width: 100 },
    { field: "country", headerName: "Ország", width: 100 },
    { field: "zip_code", headerName: "Irányítószám", width: 60 },
    { field: "city", headerName: "Város", width: 100 },
    { field: "address", headerName: "Cím", width: 100 },
    { field: "type_of_delivery", headerName: "Szállítási mód", width: 100 },
    { field: "type_of_paid", headerName: "Fizetési mód", width: 80 },
    {
      field: "ordered_data",
      headerName: "Termékek",
      width: 400,
      renderCell: (params) => (
        <div className="flex flex-wrap overflow-x-auto max-w-xs">
          {params.value.map((item, index) => (
            <div key={index} className="flex flex-col border p-2">
              <div className="font-bold">{item.product_name}</div>
              <div>{item.quantity}db</div>
            </div>
          ))}
        </div>
      ),
    },
    { field: "price", headerName: "Ár(Ft)", type: "number", width: 80 },
    {
      field: "Action",
      headerName: "",
      width: 120,
      renderCell: (params) => (
        <div className="flex justify-center items-center gap-2 h-full">
          <button className="py-1 px-2 text-red-600 hover:text-red-800" onClick={() => confirmDeleteChange(params.id)}>
            <FaTrashAlt size={20} />
          </button>
          {orderStatus === "active" ? (
            <div className="flex gap-2">
              <button className="py-1 px-2 text-green-600 hover:text-green-800" onClick={() => confirmActiveChange(params.id)}>
                <FaCheck size={20} />
              </button>
              <button className="py-1 px-2 text-blue-600 hover:text-blue-800" onClick={() => handleEdit(params.id)}>
                <FaEdit size={20} />
              </button>
            </div>
          ) : (
            <button className="py-1 px-2 text-yellow-600 hover:text-yellow-800" onClick={() => confirmActiveChange(params.id)}>
              <FaBackward size={20} />
            </button>
          )}
        </div>
      ),
    },
    {
      field: "print_invoice",
      headerName: "Számla nyomtatás",
      width: 150,
      renderCell: (params) => (
        <button
          className="py-1 px-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => handlePrintInvoice(params.id)}
        >
          Nyomtatás
        </button>
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
    type_of_paid: item.type_of_paid,
    type_of_delivery: item.type_of_delivery
  }));

  const handlePrintInvoice = (id) => {
    const order = data.find(item => item._id === id);

    if (!order) {
        setError("Rendelés nem található!");
        return;
    }

    // Létrehozzuk a PDF dokumentumot
    const doc = new jsPDF();

    // Cég információk
    doc.setFontSize(22);
    doc.text('Eladó neve és címe', 14, 22);
    doc.setFontSize(10);
    doc.text('Cég Cím: Bp Madách Imre utca 22', 14, 30);
    doc.text('Telefonszám: 123-456-789', 14, 36);
    doc.text('Email: info@ceg.hu', 14, 42);

    // Vevő információk
    doc.setFontSize(22);
    doc.text('Vevő neve és címe', 100, 22);
    doc.setFontSize(10);
    doc.text('Név: ' + order.name, 100, 30); // Jobb felső sarok
    doc.text('Cím: ' + order.address, 100, 36);
    doc.text('Telefonszám: ' + order.phone_number, 100, 42);
    doc.text('Email: ' + order.email, 100, 48);

    // Rendelés információk
    doc.setFontSize(16);
    doc.text('Rendelési Száma: ' + order.order_number, 14, 80);
    doc.text('Dátum: ' + new Date().toLocaleDateString(), 14, 86);

    // Rendelési termékek táblázata
    autoTable(doc, {
        startY: 100,
        head: [['Termék Neve', 'Mennyiség', 'Ár']],
        body: order.ordered_data.map(item => [item.product_name, item.quantity, item.price]),
    });

    // Összesen
    const totalY = doc.lastAutoTable.finalY + 10; // Az utolsó táblázat utáni pozíció
    doc.text(`Összesen: ${order.price} Ft`, 14, totalY);

    // Aláírások helye
    const pageHeight = doc.internal.pageSize.height;
    const signatureY = pageHeight - 40; // Az aláírások pozíciója 40 egységgel az aljától

    // Aláírások vonal
    doc.line(14, signatureY, 80, signatureY); // Első vonal
    doc.line(100, signatureY, 186, signatureY); // Második vonal

    // Aláírás szövegek
    doc.setFontSize(12);
    doc.text('Aláírás: ', 14, signatureY + 6); // Első aláírás szöveg
    doc.text('Aláírás: ', 100, signatureY + 6); // Második aláírás szöveg

    // Lábléc
    doc.setFontSize(10);
    doc.text('Köszönjük, hogy minket választott!', 14, pageHeight - 20);

    // PDF letöltése
    doc.save('szamla.pdf');
};



  return (
    <div>
      <AdminNavbar />
      <div className="flex">
        <AdminOrderSidebar onStatusChange={handleStatusChange} />
        <div className="ml-80 pl-20 pt-20">
          {error && <p className="text-red-500">{error}</p>}
          <div className='flex justify-end w-1100'>
              <button 
                  onClick={()=>(pageRefreshed())}
                  className="mb-4 py-2 px-4 flex items-center gap-2"
              >
                  <IoMdRefresh size={30} className="text-blue-500"/>
              </button>
          </div>
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
            setPopupConfirmCallback(()=>()=>(setPopupMessage(""), setPopupNavigate("")))
          }}
          popupWindowCancelButtonPreview={popupWindowCancelButtonPreview}
        />
      )}
    </div>
  );
};

export default AdminOrderingPage;
