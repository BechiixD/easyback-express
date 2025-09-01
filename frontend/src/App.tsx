import { useState } from "react";
import ModalBox from "./components/ModalBox";
import "./App.css";

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        EasyBack on Express
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Welcome to EasyBack on Express!
      </p>
      <div className="relative">
        <button
          className="bg-green-600 hover:bg-green-500 transition duration-150
        text-white px-5 py-2 rounded-md absolute top-4 left-8 transform"
          onClick={handleShowModal}
        >
          Show Modal
        </button>
        {isModalVisible && <ModalBox onClose={handleCloseModal} />}
      </div>
    </>
  );
}

export default App;
