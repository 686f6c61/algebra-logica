import React from 'react';
import { FaCode } from 'react-icons/fa';

const DNFConverter = ({ combinations, results, variables }) => {
  const getDNF = () => {
    const trueRows = combinations.reduce((acc, combination, index) => {
      if (results[index]) {
        acc.push(combination);
      }
      return acc;
    }, []);

    if (trueRows.length === 0) {
      return 'La expresión es una contradicción (siempre falsa)';
    }

    if (trueRows.length === combinations.length) {
      return 'La expresión es una tautología (siempre verdadera)';
    }

    return trueRows.map(combination => {
      const terms = combination.map((value, index) => {
        const variable = variables[index];
        return value ? variable : `¬${variable}`;
      });
      return `(${terms.join(' ∧ ')})`;
    }).join(' ∨ ');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      <div className="flex items-center space-x-2 mb-3">
        <FaCode className="text-xl text-gray-700" />
        <h3 className="text-lg font-semibold">Forma Normal Disyuntiva (DNF)</h3>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="font-mono text-lg break-words">{getDNF()}</p>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>La Forma Normal Disyuntiva (DNF) es una disyunción (OR) de conjunciones (AND) que representa todos los casos donde la expresión es verdadera.</p>
      </div>
    </div>
  );
};

export default DNFConverter;