import React, { useState } from 'react';
import AdminNavbar from '../components/adminNavbar';

const AdminUpload = () => {
    const mainCategories = [
        "Magyar nyelvű szerepjátékok",
        "Angol nyelvű szerepjátékok",
        "Magyar nyelvű könyvek",
        "Angol nyelvű könyvek",
        "Gyüjthető kártyajátékok",
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
            "Kalandjáték-könyvek"
        ],
        "Angol nyelvű szerepjátékok": [
            "AD&D 2nd edition",
            "AD&D 3nd edition",
            "AD&D 4nd edition",
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
            "Kalandjáték könyvek angolul / Fighting Fantasy"
        ]
    };

    const [selectedMainCategory, setSelectedMainCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const handleMainCategoryChange = (e) => {
        setSelectedMainCategory(e.target.value);
        setSelectedSubCategory('');
    };

    const handleSubCategoryChange = (e) => {
        setSelectedSubCategory(e.target.value);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedMainCategory || !selectedSubCategory || !name || !price || !description || !file) {
            alert('Minden mezőt ki kell tölteni!');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64File = reader.result.split(',')[1];
    
            const data = {
                file: `data:${file.type};base64,${base64File}`,
                name,
                price,
                description,
                maincategory: selectedMainCategory,
                subcategory: selectedSubCategory
            };

            try {
                const response = await fetch('http://localhost:3000/api/data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Adatok sikeresen feltöltve!');
                    setSelectedMainCategory('');
                    setSelectedSubCategory('');
                    setName('');
                    setPrice('');
                    setDescription('');
                    setFile(null);
                } else {
                    throw new Error('Hiba történt az adatok feltöltésekor!');
                }
            } catch (error) {
                console.error('Hiba a feltöltés során:', error);
                alert('Hiba történt az adatok feltöltésekor!');
            }
        };
        reader.readAsDataURL(file);
    };

    const handleBack = () => {
        setSelectedMainCategory('');
        setSelectedSubCategory('');
        setName('');
        setPrice('');
        setDescription('');
        setFile(null);
    };

    return (
        <div>
            <AdminNavbar />
            <div className="max-w-lg mx-auto p-4 mt-20 bg-white shadow-md rounded-md">
                {!selectedMainCategory ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-center">Válassz Kategóriát</h2>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedMainCategory}
                            onChange={handleMainCategoryChange}
                        >
                            <option value="" disabled>Válassz egy fő kategóriát</option>
                            {mainCategories.map((mainCategory) => (
                                <option key={mainCategory} value={mainCategory}>{mainCategory}</option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-center">{selectedMainCategory}</h2>
                        <form onSubmit={handleSubmit}>
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
                                    type="number"
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                                    Kategória
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="category"
                                    value={selectedSubCategory}
                                    onChange={handleSubCategoryChange}
                                >
                                    <option value="" disabled>Válassz egy alkategóriát</option>
                                    {subCategories[selectedMainCategory]?.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                                    Fájl feltöltés
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="file"
                                    type="file"
                                    onChange={handleFileChange}
                                />
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
                                    Feltöltés
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminUpload;


