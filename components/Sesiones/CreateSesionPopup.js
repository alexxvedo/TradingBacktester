import React from "react";

const CreateSessionPopup = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg p-4 w-96 bg-zinc-800">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-white">
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default CreateSessionPopup;
