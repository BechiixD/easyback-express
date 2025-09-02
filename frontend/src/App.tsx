import { useState } from "react";
import ModalBox from "./components/ModalBox";
import "./App.css";
import EndpointList from "./components/EndpointList";
import { EndpointProvider } from "./context/EndpointContext";

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <EndpointProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              EasyBack on Express
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Welcome to EasyBack on Express! Create and manage your API
              endpoints easily.
            </p>
          </div>

          {/* Action Button */}
          <div className="flex justify-center mb-8">
            <button
              className="bg-green-600 hover:bg-green-700 transition duration-200 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg flex items-center space-x-2"
              onClick={handleShowModal}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Create New Endpoint</span>
            </button>
          </div>

          {/* Endpoints List */}
          <EndpointList />

          {/* Modal */}
          {isModalVisible && <ModalBox onClose={handleCloseModal} />}
        </div>
      </div>
    </EndpointProvider>
  );
}

export default App;
