import React, { useState } from 'react';

function AdminMainSidebar({ onCategorySelect, onSubCategorySelect }) {
    const mainCategories = [
        "Összes termék",
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
        "Magyar nyelvű könyvek":[
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
        "Angol nyelvű könyvek":[
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
        "Gyűjthető kártyajátékok":[
            "Magyar kártyajátékok", 
            "Angol kártyajátékok"
        ],
        "Társasjátékok":[
            "Magyar játékok",
            "Angol táblás játékok / Boardgames",
            "Egyéb angol játékok"
        ],
        "Figurák és figurás játékok":[
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
        "Magazinok":[
            "Alanori Krónika",
            "Bíborhold",
            "Dragon",
            "Fanfár",
            "Rúna",
            "Egyéb magyar magazinok",
            "Angol magazinok"
        ],
        "Egyebek":[
            "Dobókockák",
            "Festékek, ecsetek, modellezés",
            "Puzzle",
            "Zene",
            "Film",
            "Művészeti mindenféle",
            "Kiegészítők"
        ]
    };

    const [openCategory, setOpenCategory] = useState(null);

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
