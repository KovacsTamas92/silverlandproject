import React, { useState } from "react";

function SideBar() {
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);

  const toggleDropdown = (index) => {
    setActiveDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const menuItems = [
    {
      title: "Magyar nyelvű szerepjátékok",
      subMenu: [
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
    },
    {
      title: "Angol nyelvű szerepjátékok",
      subMenu: [
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
        "Kalandjáték könyvek angolul / Fighting Fantasy",
      ],
    },
    {
      title: "Magyar nyelvű könyvek",
      subMenu: [
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
    },
    {
      title: "Angol nyelvű könyvek",
      subMenu: [
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
    },
    {
      title: "Gyüjthető kártyajátékok",
      subMenu: ["Magyar kártyajátékok", "Angol kártyajátékok"],
    },
    {
      title: "Társasjátékok",
      subMenu: [
        "Magyar játékok",
        "Angol táblás játékok / Boardgames",
        "Egyéb angol játékok",
      ],
    },
    {
      title: "Figurák és figurás játékok",
      subMenu: [
        "DnD és más fantasy figurák",
        "Gyűrűk Ura",
        "Mage Knight",
        "Shadowrun",
        "Történelmi játékok",
        "Warhammer Univerzum",
        "World of Darkness",
        "Egyéb figurás játékok",
        "Egyéb figurák",
      ],
    },
    {
      title: "Magazinok",
      subMenu: [
        "Alanori Krónika",
        "Bíborhold",
        "Dragon",
        "Fanfár",
        "Rúna",
        "Egyéb magyar magazinok",
        "Angol magazinok",
      ],
    },
    {
      title: "Egyebek",
      subMenu: [
        "Dobókockák",
        "Festékek, ecsetek, modellezés",
        "Puzzle",
        "Zene",
        "Film",
        "Művészeti mindenféle",
        "Kiegészítők",
      ],
    },
  ];

  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {menuItems.map((menuItem, index) => (
            <li key={index}>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={() => toggleDropdown(index)}
              >
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  {menuItem.title}
                </span>
              </button>
              <ul
                className={`${
                  activeDropdownIndex === index ? "" : "hidden"
                } py-2 space-y-2`}
              >
                {menuItem.subMenu.map((subMenuItem, subIndex) => (
                  <li key={subIndex}>
                    <a
                      href="#"
                      className="flex items-center w-full p-2 text-gray-700 text-sm transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      {subMenuItem}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
