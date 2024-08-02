function AdminOrderSidebar() {

    const mainCategories = [
        "Aktuális Rendelések",
        "Kész Rendelések",
    ];

    return (
        <div className="w-80 bg-gray-800 text-white h-[calc(100vh-4rem)] p-4 fixed top-16 left-0 overflow-y-auto">
            {mainCategories.map((category) => (
                <div className="mb-2">
                    <button 
                        onClick={() =>{}}
                        className={`w-full text-left py-2 px-4 bg-gray-800 hover:bg-gray-600 transition duration-300 rounded`}
                    >
                        {category}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default AdminOrderSidebar;
