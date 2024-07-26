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

    const handleMainCategoryChange = (e) => {
        setSelectedMainCategory(e.target.value);
    };

    const handleSubCategoryChange = (e) => {
        setSelectedSubCategory(e.target.value);
    };

    const handleBack = () => {
        setSelectedMainCategory('');
    };

    return (
        <div>
            <AdminNavbar />
            <div className="max-w-lg mx-auto p-4 mt-8 bg-white shadow-md rounded-md">
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
                                <option value={mainCategory}>{mainCategory}</option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-center">{selectedMainCategory}</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Név
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    placeholder="Termék neve"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                    Ár
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="price"
                                    type="text"
                                    placeholder="Termék ára"
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
                                    {subCategories[selectedMainCategory].map((category) => (
                                        <option value={category}>{category}</option>
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
