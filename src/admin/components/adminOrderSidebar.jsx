function AdminOrderSidebar({ onStatusChange }) {
    const mainCategories = [
        { name: "Aktuális Rendelések", value: "active" },
        { name: "Kész Rendelések", value: "completed" }
    ];

    return (
        <div className="w-80 bg-gray-800 text-white h-[calc(100vh-4rem)] p-4 fixed top-16 left-0 overflow-y-auto">
            {mainCategories.map((category) => (
                <div className="mb-2" key={category.value}> 
                    <button 
                        onClick={() => onStatusChange(category.value)}
                        className={`w-full text-left py-2 px-4 bg-gray-800 hover:bg-gray-600 transition duration-300 rounded`}
                    >
                        {category.name}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default AdminOrderSidebar
