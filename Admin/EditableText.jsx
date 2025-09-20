import React, { useState } from "react";

const EditableText = ({ text, onSave, className }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);

  const handleSave = () => {
    setIsEditing(false);
    onSave(value);
  };

  return (
    <div className="inline-block group relative">
      {isEditing ? (
        <div className="flex space-x-2">
          <input
            className="border rounded px-2 py-1"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-2 rounded"
          >
            ✔
          </button>
        </div>
      ) : (
        <>
          <span className={className}>{value}</span>
          <button
            onClick={() => setIsEditing(true)}
            className="ml-2 text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition"
          >
            ✏️
          </button>
        </>
      )}
    </div>
  );
};

export default EditableText;

