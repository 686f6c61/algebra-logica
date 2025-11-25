import React, { useState, useEffect } from 'react';
import { FaEdit, FaLightbulb } from 'react-icons/fa';
import OperatorGuide from './OperatorGuide';
import { OPERATORS, VARIABLES, PARENTHESES } from '../utils/constants';
import { validateExpression } from '../utils/expressionValidator';

const ExpressionEditor = ({ onExpressionChange }) => {
  const [expression, setExpression] = useState('');
  const [isValid, setIsValid] = useState(false);
  
  // Ejemplos predefinidos de expresiones lógicas
  const examples = [
    { name: "Conjunción", expression: "p∧q" },
    { name: "Disyunción", expression: "p∨q" },
    { name: "Implicación", expression: "p→q" },
    { name: "Bicondicional", expression: "p↔q" },
    { name: "Negación", expression: "¬p" },
    { name: "Expresión compuesta", expression: "(p∧q)∨¬r" },
  ];

  useEffect(() => {
    const valid = validateExpression(expression);
    setIsValid(valid);
    onExpressionChange(valid ? expression : '');
  }, [expression, onExpressionChange]);

  const handleSymbolClick = (symbol) => {
    setExpression(prev => prev + symbol);
  };

  const handleClear = () => {
    setExpression('');
  };

  const handleBackspace = () => {
    setExpression(prev => prev.slice(0, -1));
  };

  const loadExample = (exampleExpression) => {
    setExpression(exampleExpression);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center space-x-2 mb-3">
        <FaEdit className="text-xl text-gray-700" />
        <h2 className="text-xl font-semibold">Editor de expresiones lógicas</h2>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className={`font-mono text-xl w-1/3 min-h-[40px] mb-4 p-2 border rounded ${
          expression ? (isValid ? 'border-green-500' : 'border-red-500') : 'border-gray-300'
        }`}>
          {expression || <span className="text-gray-400">Escribe tu expresión aquí</span>}
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-2">Variables:</h3>
            <div className="flex flex-wrap gap-2">
              {VARIABLES.map((variable) => (
                <button
                  key={variable}
                  onClick={() => handleSymbolClick(variable)}
                  className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {variable}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-2">Operadores:</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(OPERATORS).map(([symbol]) => (
                <button
                  key={symbol}
                  onClick={() => handleSymbolClick(symbol)}
                  className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">Paréntesis:</h3>
            <div className="flex flex-wrap gap-2">
              {PARENTHESES.map(({ symbol }) => (
                <button
                  key={symbol}
                  onClick={() => handleSymbolClick(symbol)}
                  className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-sm font-semibold mb-2 flex items-center">
            <FaLightbulb className="mr-1 text-gray-700" />
            Ejemplos predefinidos:
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {examples.map((example) => (
              <button
                key={example.name}
                onClick={() => loadExample(example.expression)}
                className="px-3 py-2 bg-gray-100 border border-gray-300 hover:bg-gray-200 rounded-md transition-colors text-sm"
                title={example.name}
              >
                {example.name}: {example.expression}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-white border border-gray-900 text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              Limpiar
            </button>
            <button
              onClick={handleBackspace}
              className="px-4 py-2 bg-white border border-gray-900 text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              ← Borrar
            </button>
          </div>
        </div>
      </div>
      
      <OperatorGuide operators={[...PARENTHESES, ...Object.entries(OPERATORS).map(([symbol, data]) => ({
        symbol,
        ...data
      }))]} />
    </div>
  );
};

export default ExpressionEditor;
