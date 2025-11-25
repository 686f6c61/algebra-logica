import React, { useState, useEffect, useRef } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { evaluateExpression } from '../utils/expressionEvaluator';
import { extractVariables } from '../utils/logicOperations';
import { exportToTxt, exportToPdf, exportToCSV, exportToPNG } from '../utils/exportUtils';
import ExpressionEvaluator from './ExpressionEvaluator';

const TruthTable = ({ expression, combinations }) => {
  const usedVariables = extractVariables(expression);
  const [results, setResults] = useState([]);
  const [explanations, setExplanations] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const tableRef = useRef(null);
  const explanationRef = useRef(null);

  const evaluateRow = (combination, includeSteps = false) => {
    const values = {};
    usedVariables.forEach((name, index) => {
      values[name] = combination[index];
    });
    return evaluateExpression(expression, values, includeSteps);
  };

  useEffect(() => {
    if (combinations && combinations.length > 0) {
      const newResults = combinations.map(combo => evaluateRow(combo));
      setResults(newResults);
      
      // Preparar las explicaciones para cada fila
      const newExplanations = combinations.map(combo => evaluateRow(combo, true));
      setExplanations(newExplanations);
    }
  }, [combinations, expression]);
  
  const handleRowClick = (rowIndex) => {
    // Si hacemos clic en la misma fila, la deseleccionamos
    const newSelectedRow = selectedRow === rowIndex ? null : rowIndex;
    setSelectedRow(newSelectedRow);
    
    // Si seleccionamos una fila, hacer scroll suave hasta la explicación
    if (newSelectedRow !== null && explanationRef.current) {
      setTimeout(() => {
        explanationRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100); // Pequeño retraso para asegurar que el DOM está actualizado
    }
  };

  const handleExport = (format) => {
    // Extraer solo los resultados booleanos de los objetos de resultado
    const booleanResults = results.map(res => res.result);
    
    if (format === 'txt') {
      exportToTxt(expression, usedVariables, combinations, booleanResults);
    } else if (format === 'pdf') {
      exportToPdf(expression, usedVariables, combinations, booleanResults);
    } else if (format === 'csv') {
      exportToCSV(expression, usedVariables, combinations, booleanResults);
    } else if (format === 'png') {
      exportToPNG(tableRef);
    }
  };

  if (!combinations || combinations.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Expresión a evaluar:</h3>
        <p className="font-mono text-xl mt-2 p-2 bg-gray-100 rounded">{expression}</p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => handleExport('pdf')}
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
          >
            Exportar PDF
          </button>
          <button
            onClick={() => handleExport('txt')}
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
          >
            Exportar TXT
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
          >
            Exportar CSV
          </button>
          <button
            onClick={() => handleExport('png')}
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
          >
            Exportar PNG
          </button>
        </div>
      </div>
      
      <table ref={tableRef} className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {results.length > 0 && (
              <th className="border border-gray-300 px-4 py-2 w-16">
                #
              </th>
            )}
            {usedVariables.map((name) => (
              <th key={name} className="border border-gray-300 px-4 py-2">
                {name}
              </th>
            ))}
            <th className="border border-gray-300 px-4 py-2">
              Resultado
            </th>
            <th className="border border-gray-300 px-4 py-2">
              Explicación
            </th>
          </tr>
        </thead>
        <tbody>
          {combinations.map((combination, rowIndex) => {
            // Verificar que results[rowIndex] existe antes de usarlo
            const result = results[rowIndex] || { result: false, steps: [] };
            return (
              <tr 
                key={rowIndex} 
                className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${selectedRow === rowIndex ? 'bg-blue-50' : ''} cursor-pointer hover:bg-blue-100`}
                onClick={() => handleRowClick(rowIndex)}
              >
                {results.length > 0 && (
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-600">
                    {rowIndex + 1}
                  </td>
                )}
                {combination.map((value, colIndex) => (
                  <td key={colIndex} className="border border-gray-300 px-4 py-2 text-center">
                    {value ? 'V' : 'F'}
                  </td>
                ))}
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
                  {result.result ? 'V' : 'F'}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button 
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors focus:outline-none"
                    title="Ver explicación paso a paso"
                    onClick={(e) => {
                      e.stopPropagation(); // Evitar que se duplique con el onClick de la fila
                      handleRowClick(rowIndex);
                    }}
                  >
                    <FaInfoCircle className="text-gray-700" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ExpressionEvaluator 
        expression={expression}
        variables={usedVariables}
      />
      
      {selectedRow !== null && explanations[selectedRow] && (
        <div ref={explanationRef} className="mt-6 bg-white rounded-lg p-4 border border-gray-300 shadow">
          <h3 className="text-lg font-semibold mb-2">Explicación paso a paso - Fila #{selectedRow + 1}</h3>
          
          <div className="mb-4">
            <h4 className="font-medium">Expresión a evaluar:</h4>
            <div className="bg-gray-50 p-2 rounded font-mono">{explanations[selectedRow].expression}</div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2">Sustitución de variables:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {explanations[selectedRow].substitutionSteps && explanations[selectedRow].substitutionSteps.map((step, idx) => (
                <li key={idx} className="font-mono">
                  {step.operation === 'Expresión original' ? (
                    <span>{step.description}</span>
                  ) : (
                    <span>{step.description} → <span className="font-medium">{step.result}</span></span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Evaluación de la expresión:</h4>
            <ul className="space-y-2">
              {explanations[selectedRow].steps && explanations[selectedRow].steps.filter(step => step.operation !== 'Sustitución de variables').map((step, idx) => (
                <li key={idx} className="p-2 bg-gray-50 rounded">
                  {step.operation.startsWith('Evaluación:') ? (
                    <div>
                      <div className="font-mono">{step.operation}: <span className="font-medium">{step.result === '1' ? 'V' : 'F'}</span></div>
                      {step.subSteps && step.subSteps.length > 0 && (
                        <ul className="ml-6 mt-2 space-y-1 border-l-2 border-gray-300 pl-3">
                          {step.subSteps.map((subStep, subIdx) => (
                            <li key={subIdx} className="font-mono text-sm">
                              {subStep.description}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <div className="font-mono">{step.description}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-4 bg-gray-100 p-3 rounded-lg">
            <p className="font-medium">Resultado final: <span className={explanations[selectedRow].result ? 'text-green-600' : 'text-red-600'}>{explanations[selectedRow].result ? 'Verdadero' : 'Falso'}</span></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TruthTable;