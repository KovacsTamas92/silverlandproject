import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const AdminPopupWindows = ({ message, popupNavigate }) => {
    
    const navigate = useNavigate();
    const [showUpPopup, setShowUpPopUp] = useState(true)

    if (!message) {
        return null;
    }

    const onClose = () => {
        popupNavigate ?  navigate(popupNavigate) : setShowUpPopUp(false)
    };

    return (
        <div> 
            {showUpPopup &&
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm mx-4 sm:mx-8">
                  <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
                      Rendszer üzenet:
                  </h2>
                  <p className="text-lg text-gray-700 mb-4 text-center">
                      {message}
                  </p>
                  <div className="flex justify-center">
                      <button
                          onClick={onClose}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                          Rendben
                      </button>
                  </div>
              </div>
          </div>
            }
        </div>
    );
};

export default AdminPopupWindows;
