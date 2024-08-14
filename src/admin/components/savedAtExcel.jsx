import * as XLSX from 'xlsx';

export const exportToExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data.map(item => ({
        Név: item.name,
        Ár: item.price,
        Leírás: item.description,
        Fő_Kategória: item.maincategory,
        Al_Kategória: item.subcategory,
        Termék_darabszáma: item.number_of_items,
        Valós_darabszám:null,
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Adatok");

    XLSX.writeFile(workbook, 'leltar.xlsx');
};
