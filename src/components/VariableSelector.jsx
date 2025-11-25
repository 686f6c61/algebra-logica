import React from 'react';

const VariableSelector = ({ onVariableCountChange }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Selecciona el número de variables:</h2>
      <div className="flex gap-2">
        {[2, 3, 4, 5, 6].map((count) => (
          <button
            key={count}
            onClick={() => onVariableCountChange(count)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
          >
            {count} variables
          </button>
        ))}
      </div>
    </div>
  );
}

export default VariableSelector;