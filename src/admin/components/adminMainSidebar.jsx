import React, { useState, useEffect } from 'react';

function AdminMainSidebar({ onCategorySelect, onSubCategorySelect }) {

    const [mainCategories, setMainCategories] =useState([])
    const [subCategories, setSubCategories] =useState([])
    const [openCategory, setOpenCategory] = useState(null);
    const [error, setError] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/maincategory');
                if (!response.ok) {
                    throw new Error('Hiba történt az adatok lekérdezésekor!');
                }
                const result = await response.json();

                setMainCategories(result[0].mainCategories);  
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
        
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/subcategories');
                if (!response.ok) {
                    throw new Error('Hiba történt az adatok lekérdezésekor!');
                }
                const result = await response.json();
                setSubCategories(result[0].mainCategories);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
        
    }, []);


    const toggleCategory = (category) => {
        setOpenCategory(openCategory === category ? null : category);
    };

    return (
        <div className="w-80 bg-gray-800 text-white h-[calc(100vh-4rem)] p-4 fixed top-16 left-0 overflow-y-auto">
            {mainCategories.map((category) => (
                <div className="mb-2">
                    <button 
                        onClick={() =>{
                            toggleCategory(category)
                            onCategorySelect(category === "Összes termék" ? null : category);
                            onSubCategorySelect(null);
                        }} 
                        className={`w-full text-left py-2 px-4 bg-gray-800 hover:bg-gray-600 transition duration-300 rounded ${openCategory === category ? 'bg-gray-600' : ''}`}
                    >
                        {category}
                    </button>
                    {openCategory === category && subCategories[category] && (
                        <ul className="pl-4 mt-2 space-y-1">
                            {subCategories[category].map((subCategory) => (
                                <li className="py-1 px-4 hover:bg-gray-600 transition duration-300">
                                    <button 
                                        onClick={() => onSubCategorySelect(subCategory)}
                                        className="block text-white"
                                    >
                                        {subCategory}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}

export default AdminMainSidebar;
