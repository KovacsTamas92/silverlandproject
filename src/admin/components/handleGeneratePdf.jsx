import jsPDF from 'jspdf';
import 'jspdf-autotable';

const replaceAccents = (str) => {
    const accents = [
        { base: 'a', letters: /[\u00E0-\u00E5\u0100-\u0105\u01CE\u01FB\u0200-\u0204\u0227\u023A\u0250-\u0259\u1E9A]/g },
        { base: 'e', letters: /[\u00E8-\u00EB\u0112-\u0113\u0128\u014D\u0152\u01DD\u0204-\u0207\u0229\u0236\u025B-\u025D\u0262\u1EBC-\u1EBD]/g },
        { base: 'i', letters: /[\u00EC-\u00EF\u0128\u012B\u0140\u0143\u0152\u019D\u01F2\u0208\u0209\u0269\u1E2D-\u1E2F]/g },
        { base: 'o', letters: /[\u00F2-\u00F6\u014D\u0151\u0153\u019F\u01A1\u01A3\u01A5\u01A7\u01B1\u01B3\u01D2\u020C-\u020F\u022D\u0231\u0254\u026F\u0275-\u0277\u1E4F-\u1E51]/g },
        { base: 'u', letters: /[\u00F9-\u00FC\u0169\u016B\u016D\u016F\u0171\u0173\u01B5\u01D4\u0208-\u020D\u022F\u0233\u0249\u0250-\u0257\u0279\u1E77]/g },
        { base: 'c', letters: /[\u00E7\u0107\u010D\u011D\u0123\u023C\u0255\u1E09]/g },
        { base: 'n', letters: /[\u00F1\u0148\u0149\u014B\u0151\u1E2D-\u1E2F]/g },
        { base: 'y', letters: /[\u00FD\u0177\u0178\u01B4]/g },
        { base: 's', letters: /[\u015F\u0219\u023F\u1E9E]/g },
        { base: 'z', letters: /[\u017A\u017C\u017E\u01B6\u1E91]/g }
    ];

    accents.forEach(accent => {
        str = str.replace(accent.letters, accent.base);
    });

    return str;
};

const handleGeneratePDF = (data) => {
    if (!data || data.length === 0) {
        console.error('No data available to generate PDF');
        return;
    }

    const doc = new jsPDF();
    const tableColumn = [
        "Name", "Price", "Description", "Main Category", "Sub Category", "Number of Items", "Actual Number"
    ];

    const tableRows = data.map(item => [
        replaceAccents(item.name),
        item.price,
        replaceAccents(item.description),
        replaceAccents(item.maincategory),
        replaceAccents(item.subcategory),
        item.number_of_items
    ]);

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 20
    });

    doc.save('data-grid.pdf');
};

export default handleGeneratePDF;
