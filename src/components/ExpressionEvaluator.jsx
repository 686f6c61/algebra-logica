import React, { useState, useEffect } from 'react';
import { FaQuestion } from 'react-icons/fa';
import { evaluateExpression } from '../utils/expressionEvaluator';

const ExpressionEvaluator = ({ expression, variables }) => {
  const [values, setValues] = useState(() => 
    Object.fromEntries(variables.map(v => [v, undefined]))
  );
  const [result, setResult] = useState(null);

  useEffect(() => {
    setValues(Object.fromEntries(variables.map(v => [v, undefined])));
    setResult(null);
  }, [variables]);

  const handleToggleValue = (variable) => {
    setValues(prev => ({
      ...prev,
      [variable]: prev[variable] === undefined ? true : !prev[variable]
    }));
  };

  const handleEvaluate = () => {
    if (!Object.values(values).includes(undefined)) {
      const evaluationResult = evaluateExpression(expression, values);
      setResult(evaluationResult);
    }
  };

  const allValuesSet = !Object.values(values).includes(undefined);

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      <div className="flex items-center space-x-2 mb-3">
        <FaQuestion className="text-xl text-gray-700" />
        <h3 className="text-lg font-semibold">Evaluador de casos específicos</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Selecciona los valores para cada variable y evalúa el resultado
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        {variables.map(variable => (
          <button
            key={variable}
            onClick={() => handleToggleValue(variable)}
            className={`px-4 py-2 rounded-md border ${
              values[variable] !== undefined
                ? values[variable]
                  ? 'bg-green-100 border-green-500 text-green-700'
                  : 'bg-red-100 border-red-500 text-red-700'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {variable} = {values[variable] === undefined ? '?' : values[variable] ? 'V' : 'F'}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleEvaluate}
          disabled={!allValuesSet}
          className={`px-4 py-2 rounded-md transition-colors ${
            allValuesSet
              ? 'bg-gray-900 text-white hover:bg-gray-800'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Evaluar
        </button>

        {result !== null && (
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Resultado:</span>
            <span className={`font-mono ${result ? 'text-green-600' : 'text-red-600'}`}>
              {result ? 'Verdadero' : 'Falso'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpressionEvaluator;