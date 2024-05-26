import React from 'react';

interface PopupProps {
  message: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md max-w-md text-center">
        <p className="text-lg">{message}</p>
        <div className="flex justify-center mt-4">
          <button onClick={onClose} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">OK</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;