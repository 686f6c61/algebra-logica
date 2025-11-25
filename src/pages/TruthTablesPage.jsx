/**
 * =============================================================================
 * ALGEBRA LOGICA - Página de Tablas de Verdad
 * =============================================================================
 *
 * @file TruthTablesPage.jsx
 * @description Generador interactivo de tablas de verdad para expresiones
 *              de lógica proposicional. Permite editar expresiones y ver
 *              todas las combinaciones de valores con sus resultados.
 *
 * @author 686f6c61
 * @github https://github.com/686f6c61
 * @repository https://github.com/686f6c61/algebra-logica
 * @version 2.1.0
 * @license MIT
 *
 * @created 2024
 * @updated 2025-11-25
 *
 * =============================================================================
 * FUNCIONALIDADES
 * =============================================================================
 *
 * - Editor de expresiones con botones para operadores
 * - Generación automática de tabla de verdad
 * - Explicación paso a paso de cada fila
 * - Exportación a PDF, TXT, CSV y PNG
 *
 * =============================================================================
 */

import React, { useState, useEffect } from 'react';
import ExpressionEditor from '../components/ExpressionEditor';
import TruthTable from '../components/TruthTable';
import { generateCombinations, extractVariables } from '../utils/logicOperations';

function TruthTablesPage() {
  const [expression, setExpression] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [combinations, setCombinations] = useState([]);

  useEffect(() => {
    if (expression) {
      const variables = extractVariables(expression);
      setCombinations(generateCombinations(variables));
    }
  }, [expression]);

  const handleGenerate = () => {
    if (expression.trim()) {
      setShowTable(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-8">
      <ExpressionEditor onExpressionChange={setExpression} />
      
      <div className="text-center mb-8">
        <button
          onClick={handleGenerate}
          disabled={!expression.trim()}
          className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors ${
            expression.trim() 
              ? 'bg-gray-900 hover:bg-gray-800' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Generar tabla de verdad
        </button>
      </div>
      
      {showTable && combinations.length > 0 && (
        <div className="mt-8">
          <TruthTable
            expression={expression}
            combinations={combinations}
          />
        </div>
      )}

      <div className="mt-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Instrucciones:</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Usa las variables disponibles: p, q, r, x, y, z</li>
          <li>Construye tu expresión usando el editor de expresiones</li>
          <li>Utiliza los operadores lógicos y paréntesis para crear expresiones complejas</li>
          <li>Presiona "Generar tabla de verdad" para ver los resultados</li>
          <li>La tabla mostrará solo las variables utilizadas en tu expresión</li>
          <li>Puedes exportar la tabla en formato PDF o TXT</li>
        </ul>
      </div>
    </div>
  );
}

export default TruthTablesPage;