import React from 'react';
import { 
  FaBook, 
  FaCalculator, 
  FaTable, 
  FaEquals, 
  FaLightbulb 
} from 'react-icons/fa';

const icons = {
  basics: FaBook,
  operators: FaCalculator,
  table: FaTable,
  equals: FaEquals,
  examples: FaLightbulb
};

function TheoryCard({ title, icon, children }) {
  const Icon = icons[icon] || FaBook;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon className="text-2xl text-gray-700" />
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default TheoryCard;