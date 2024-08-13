import React, { useState, useEffect } from 'react';
import AdminNavbar from '../components/adminNavbar';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminPopupWindows from './AdminPopupWindows';

const AdminUpload = () => {
    const mainCategories = [
        "Magyar nyelvű szerepjátékok",
        "Angol nyelvű szerepjátékok",
        "Magyar nyelvű könyvek",
        "Angol nyelvű könyvek",
        "Gyűjthető kártyajátékok",
        "Társasjátékok",
        "Figurák és figurás játékok",
        "Magazinok",
        "Egyebek"
    ];

    const subCategories = {
        "Magyar nyelvű szerepjátékok": [
            "7tenger",
            "D&D (2.kiadás)",
            "Armageddon",
            "Ars Magica",
            "Auvron",
            "Codex",
            "D&D (3.kiadás)",
            "Gallia",
            "Gyűrűk Ura",
            "Harc és Varázslat",
            "Káosz",
            "Középfölde (MERP)",
            "MAGUS",
            "Requiem",
            "Shadowrun",
            "Vampire",
            "Egyéb magyar szerepjátékok",
            "Kalandjáték-könyvek",
        ],
        "Angol nyelvű szerepjátékok": [
            "AD&D 2nd edition",
            "AD&D 3rd edition",
            "AD&D 4th edition",
            "Egyéb D20 / Other D20",
            "Ars Magica",
            "Battletech",
            "Call of Cthulhu",
            "Cyberpunk",
            "Earthdown",
            "GURPS",
            "Middle Earth / Rolemaster",
            "Rifts / Palladium Universe",
            "Shadowrun",
            "Star Trek",
            "Star Wars (d6)",
            "Warhammer RPGs",
            "World of Darkness",
            "Egyéb külföldi szerepjátékok / Other RPGs in English",
            "Kalandjáték könyvek angolul / Fighting Fantasy",
        ],
        "Magyar nyelvű könyvek": [
            "AD&D, D&D",
            "Battletech reények",
            "Cherubion",
            "Cyberpunk regények",
            "David Gemmel",
            "Dark Fantasy, Horror",
            "Dragonlance regények",
            "Forgotten realms regények",
            "J.R.R. Tolkien",
            "Magic the Gathering regények",
            "MAGUS regények",
            "R.A. Salvatore egyéb világai",
            "Ravenloft regények",
            "Raymond E. Feist",
            "Robert E. Howard / Conan",
            "Robert Jordan",
            "Sci-fi",
            "Shadowrun regények",
            "Terry Goodkind",
            "Terry Pratchett",
            "Warcraft",
            "Warhammer regények",
            "Weis & Hickman egyéb világai",
            "World of Darkness regények",
            "További regények",
        ],
        "Angol nyelvű könyvek": [
            "Dragonlance",
            "Forgotten Realms",
            "Greyhawk",
            "Magic te Gatering",
            "Ravenloft",
            "Other Dungeons and Dragons",
            "Salvatore Other Worlds",
            "Weis & Hickman Other Worlds",
            "Battletech",
            "Earthdawn",
            "Shadowrun",
            "Mage",
            "Vampire",
            "Werewolf",
            "Other World of Darkness",
            "Warhammer Universe",
            "Dune Series",
            "Star Trek Series",
            "Star Wars Series",
            "J.R.R. Tolkien",
            "R.E. Feist",
            "Robin Hood",
            "Terry Goodkind",
            "Terry Pratchet / Discworld",
            "The Wheel of Time / Robert Jordan",
            "William Gibson",
            "Warcraft and other computer game related",
            "Other Writers",
        ],
        "Gyűjthető kártyajátékok": [
            "Magyar kártyajátékok",
            "Angol kártyajátékok"
        ],
        "Társasjátékok": [
            "Magyar játékok",
            "Angol táblás játékok / Boardgames",
            "Egyéb angol játékok"
        ],
        "Figurák és figurás játékok": [
            "DnD és más fantasy figurák",
            "Gyűrűk Ura",
            "Mage Knight",
            "Shadowrun",
            "Történelmi játékok",
            "Warhammer Univerzum",
            "World of Darkness",
            "Egyéb figurás játékok",
            "Egyéb figurák"
        ],
        "Magazinok": [
            "Alanori Krónika",
            "Bíborhold",
            "Dragon",
            "Fanfár",
            "Rúna",
            "Egyéb magyar magazinok",
            "Angol magazinok"
        ],
        "Egyebek": [
            "Dobókockák",
            "Festékek, ecsetek, modellezés",
            "Puzzle",
            "Zene",
            "Film",
            "Művészeti mindenféle",
            "Kiegészítők"
        ]
    };

    const location = useLocation();
    const navigate = useNavigate();
    const [selectedMainCategory, setSelectedMainCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(''); // Fájl előnézet
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [dateOfPublication, setDateOfPublication] = useState(new Date().toISOString().split('T')[0]);
    const [dateOfUpload, setDateOfUpload] = useState(new Date().toISOString().split('T')[0]); // Az aktuális dátum
    const [numberOfItems, setNumberOfItems] = useState(0);
    const [itemId, setItemId] = useState(null);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupNavigate, setPopupNavigate] = useState('');
    const [popupConfirmCallback, setPopupConfirmCallback] = useState(() => () => (setPopupMessage(""), setPopupNavigate("")));
    const [popupWindowCancelButtonPreview, setPopupWindowCancelButtonPreview] = useState(false);

    useEffect(() => {
        if (location.state && location.state.id) {
            // Ha van ID, akkor töltsük be a termék adatait
            const fetchItem = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/api/data/${location.state.id}`);
                    if (!response.ok) {
                        throw new Error('Hiba történt a termék adatainak lekérdezésekor!');
                    }
                    const item = await response.json();
                    setItemId(item._id);
                    setSelectedMainCategory(item.maincategory);
                    setSelectedSubCategory(item.subcategory);
                    setName(item.name);
                    setPrice(item.price);
                    setDescription(item.description);
                    setFilePreview(item.file);
                    setDateOfPublication(item.date_of_publication);
                    setNumberOfItems(item.number_of_items);
                } catch (error) {
                    console.error('Hiba a termék adatainak betöltése során:', error);
                    setPopupMessage(`Hiba történt az adatainak betöltése során:${error}`)
                }
            };
            fetchItem();
        }
    }, [location.state]);

    // Aktuális kép beállítása
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
            setFilePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    // handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedMainCategory || !selectedSubCategory || !name || !price || !description) {
            setPopupMessage('Minden mezőt ki kell tölteni!')
            return;
        }

        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64File = reader.result.split(',')[1]; // Base64 kódolt adat
                await saveData(base64File);
            };
            reader.readAsDataURL(file);
        } else {
            await saveData(); // Ha nincs fájl, akkor is hívjuk meg a saveData-t
        }
    };

    const saveData = async (base64File) => {
        const data = {
            file: base64File ? `data:${file.type};base64,${base64File}` : filePreview,
            name,
            price,
            description,
            maincategory: selectedMainCategory,
            subcategory: selectedSubCategory,
            date_of_publication: dateOfPublication,
            date_of_upload: dateOfUpload,
            number_of_items: numberOfItems
        };

        try {
            const method = itemId ? 'PUT' : 'POST'; // Ha van itemId, PUT kérést használunk
            const url = itemId ? `http://localhost:3000/api/data/${itemId}` : 'http://localhost:3000/api/data';
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Hiba történt az adat mentése során!');
            }
            setPopupNavigate('/adminmain')
            setPopupMessage('Termék sikeresen mentve!')
        } catch (error) {
            setPopupMessage(`Hiba történt az adat mentése során:${error}`)
        }
    };


    const handleBack = () => {
        navigate('/adminmain');
    };

    const incrementNumberOfItems = () => {
        setNumberOfItems((prevValue) => prevValue + 1);
    };

    const decrementNumberOfItems = () => {
        setNumberOfItems((prevValue) => Math.max(0, prevValue - 1));
    };

    return (
        <div className="flex justify-center">
            <div className="mt-20 p-4 max-w-2xl w-full">
                <AdminNavbar />
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maincategory">
                            Fő Kategória
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="maincategory"
                            value={selectedMainCategory}
                            onChange={(e) => setSelectedMainCategory(e.target.value)}
                        >
                            <option value="" disabled>Válassz egy fő kategóriát</option>
                            {mainCategories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subcategory">
                            Al Kategória
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="subcategory"
                            value={selectedSubCategory}
                            onChange={(e) => setSelectedSubCategory(e.target.value)}
                        >
                            <option value="" disabled>Válassz egy alkategóriát</option>
                            {subCategories[selectedMainCategory]?.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Név
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Termék neve"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            Ár (Ft)
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="price"
                            type="text"
                            placeholder="Termék ára"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Leírás
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            placeholder="Termék leírása"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfPublication">
                            Megjelenés dátuma
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="dateOfPublication"
                            type="date"
                            placeholder="Megjelenés dátuma"
                            value={dateOfPublication}
                            onChange={(e) => setDateOfPublication(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 flex flex-col items-start">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Termékek száma
                        </label>
                        <div className="flex items-center space-x-2">
                            <button 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-8 h-8 rounded-full focus:outline-none focus:shadow-outline text-sm flex items-center justify-center"
                                type="button" 
                                onClick={decrementNumberOfItems}>
                                <span className="text-lg">-</span>
                            </button>
                            <span className="text-lg font-semibold">{numberOfItems}</span>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-8 h-8 rounded-full focus:outline-none focus:shadow-outline text-sm flex items-center justify-center"
                                type="button" 
                                onClick={incrementNumberOfItems}>
                                <span className="text-lg">+</span>
                            </button>
                        </div>
                    </div>
                    <div className="mb-4 flex items-center">
                        <div className="flex-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                                Fájl feltöltés (csak új fájl esetén)
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="file"
                                type="file"
                                onChange={handleFileChange}
                            />
                        </div>
                        {filePreview && (
                            <div className="ml-4">
                                <img src={filePreview} alt="Fájl előnézete" className="w-24 h-auto" />
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleBack}
                        >
                            Vissza
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Mentés
                        </button>
                    </div>
                </form>
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
}

export default AdminUpload;
