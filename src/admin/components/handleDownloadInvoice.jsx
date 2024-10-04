import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const handleDownloadInvoice = (id, data) => {
    const order = data.find(item => item._id === id);

    if (!order) {
        setError("Rendelés nem található!");
        return;
    }

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text('Eladó neve és címe', 14, 22);
    doc.setFontSize(10);
    doc.text('Cég Cím: Bp Madách Imre utca 22', 14, 30);
    doc.text('Telefonszám: 123-456-789', 14, 36);
    doc.text('Email: info@ceg.hu', 14, 42);
    doc.text('Adószám: 01230123123-123123', 14, 48);

    doc.setFontSize(22);
    doc.text('Vevo neve és címe', 100, 22);
    doc.setFontSize(10);
    doc.text('Név: ' + order.name, 100, 30); 
    doc.text('Cím: ' + order.address, 100, 36);
    doc.text('Telefonszám: ' + order.phone_number, 100, 42);
    doc.text('Email: ' + order.email, 100, 48);

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
    const totalY = doc.lastAutoTable.finalY + 10; 
    doc.text(`Összesen: ${order.price} Ft`, 14, totalY);

    // Aláírások helye
    const pageHeight = doc.internal.pageSize.height;
    const signatureY = pageHeight - 40; 

    // Aláírások vonal
    doc.line(14, signatureY, 80, signatureY); 
    doc.line(100, signatureY, 186, signatureY); 

    // Aláírás szövegek
    doc.setFontSize(12);
    doc.text('Aláírás: ', 14, signatureY + 6); 
    doc.text('Aláírás: ', 100, signatureY + 6); 

    // Lábléc
    doc.setFontSize(10);
    doc.text('Köszönjük, hogy minket választott!', 14, pageHeight - 20);

    // PDF letöltése
    doc.save('szamla.pdf');
};

export default handleDownloadInvoice