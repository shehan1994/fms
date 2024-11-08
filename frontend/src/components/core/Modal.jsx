import React from 'react';

export default function Modal({ show, onClose, children }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-1/2">
        <button className="float-right text-gray-700" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
