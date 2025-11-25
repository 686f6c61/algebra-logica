/**
 * =============================================================================
 * ALGEBRA LOGICA - Página de Análisis de Propiedades
 * =============================================================================
 *
 * @file PropertiesAnalysisPage.jsx
 * @description Herramienta para analizar propiedades lógicas de expresiones:
 *              detección de tautologías, contradicciones, contingencias y
 *              verificación de equivalencia lógica entre dos expresiones.
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
 * PROPIEDADES LÓGICAS ANALIZADAS
 * =============================================================================
 *
 * - Tautología: Expresión siempre verdadera (ej: p ∨ ¬p)
 * - Contradicción: Expresión siempre falsa (ej: p ∧ ¬p)
 * - Contingencia: Expresión a veces verdadera y a veces falsa
 * - Equivalencia: Dos expresiones con los mismos valores de verdad
 *
 * =============================================================================
 */

import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaEquals, FaRandom, FaEdit } from 'react-icons/fa';
import { evaluateExpression } from '../utils/expressionEvaluator';
import { extractVariables, generateCombinations } from '../utils/logicOperations';
import { OPERATORS, VARIABLES, PARENTHESES } from '../utils/constants';

const PropertiesAnalysisPage = () => {
  const [expression1, setExpression1] = useState('');
  const [expression2, setExpression2] = useState('');
  const [analysisType, setAnalysisType] = useState('single');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const examples = {
    tautology: 'p ∨ ¬p',
    contradiction: 'p ∧ ¬p',
    contingency: 'p ∨ q',
    equivalent1: ['p → q', '¬p ∨ q'],
    equivalent2: ['p ∧ q', '¬(¬p ∨ ¬q)']
  };

  const analyzeSingleExpression = () => {
    if (!expression1.trim()) {
      setError('Por favor, introduce una expresión lógica.');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const variables = extractVariables(expression1);
      const combinations = generateCombinations(variables);
      
      let trueCount = 0;
      const evaluationResults = [];
      
      for (const combination of combinations) {
        const values = {};
        variables.forEach((name, index) => {
          values[name] = combination[index];
        });
        
        const evaluationResult = evaluateExpression(expression1, values);
        // Manejar tanto el formato antiguo (booleano directo) como el nuevo (objeto con propiedad result)
        const resultValue = typeof evaluationResult === 'object' ? evaluationResult.result : evaluationResult;
        
        evaluationResults.push({
          combination,
          values,
          result: resultValue
        });
        
        if (resultValue) {
          trueCount++;
        }
      }
      
      let propertyType = '';
      if (trueCount === combinations.length) {
        propertyType = 'tautology';
      } else if (trueCount === 0) {
        propertyType = 'contradiction';
      } else {
        propertyType = 'contingency';
      }
      
      setAnalysisResult({
        type: 'single',
        propertyType,
        trueCount,
        totalCount: combinations.length,
        evaluationResults
      });
    } catch (err) {
      setError('Error al analizar la expresión: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeEquivalence = () => {
    if (!expression1.trim() || !expression2.trim()) {
      setError('Por favor, introduce dos expresiones lógicas para comparar.');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Combinar variables de ambas expresiones
      const variables1 = extractVariables(expression1);
      const variables2 = extractVariables(expression2);
      const allVariables = [...new Set([...variables1, ...variables2])];
      
      const combinations = generateCombinations(allVariables);
      
      let equivalentCount = 0;
      const comparisonResults = [];
      
      for (const combination of combinations) {
        const values = {};
        allVariables.forEach((name, index) => {
          values[name] = combination[index];
        });
        
        const evaluationResult1 = evaluateExpression(expression1, values);
        const evaluationResult2 = evaluateExpression(expression2, values);
        
        // Manejar tanto el formato antiguo (booleano directo) como el nuevo (objeto con propiedad result)
        const result1Value = typeof evaluationResult1 === 'object' ? evaluationResult1.result : evaluationResult1;
        const result2Value = typeof evaluationResult2 === 'object' ? evaluationResult2.result : evaluationResult2;
        
        const isEquivalent = result1Value === result2Value;
        
        comparisonResults.push({
          combination,
          values,
          result1: result1Value,
          result2: result2Value,
          isEquivalent
        });
        
        if (isEquivalent) {
          equivalentCount++;
        }
      }
      
      const areEquivalent = equivalentCount === combinations.length;
      
      setAnalysisResult({
        type: 'equivalence',
        areEquivalent,
        equivalentCount,
        totalCount: combinations.length,
        comparisonResults
      });
    } catch (err) {
      setError('Error al analizar las expresiones: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = () => {
    if (analysisType === 'single') {
      analyzeSingleExpression();
    } else {
      analyzeEquivalence();
    }
  };

  const handleSetExample = (type) => {
    if (type.startsWith('equivalent')) {
      setAnalysisType('equivalence');
      setExpression1(examples[type][0]);
      setExpression2(examples[type][1]);
    } else {
      setAnalysisType('single');
      setExpression1(examples[type]);
      setExpression2('');
    }
  };

  // Renderizar resultados para una sola expresión
  const renderSingleResult = () => {
    if (!analysisResult || analysisResult.type !== 'single') return null;
    
    const { propertyType, trueCount, totalCount, evaluationResults } = analysisResult;
    
    return (
      <div className="mt-6">
        <div className="p-4 rounded-lg mb-4 bg-gray-100 border border-gray-300">
          <h3 className="text-xl font-bold mb-2">Resultado del análisis:</h3>
          {propertyType === 'tautology' && (
            <div className="flex items-center">
              <FaCheckCircle className="text-gray-800 mr-2 text-xl" />
              <p className="text-lg"><strong>Tautología:</strong> La expresión es siempre verdadera para todas las combinaciones posibles.</p>
            </div>
          )}
          {propertyType === 'contradiction' && (
            <div className="flex items-center">
              <FaTimesCircle className="text-gray-800 mr-2 text-xl" />
              <p className="text-lg"><strong>Contradicción:</strong> La expresión es siempre falsa para todas las combinaciones posibles.</p>
            </div>
          )}
          {propertyType === 'contingency' && (
            <div className="flex items-center">
              <FaRandom className="text-gray-800 mr-2 text-xl" />
              <p className="text-lg"><strong>Contingencia:</strong> La expresión es verdadera para {trueCount} de {totalCount} combinaciones ({Math.round(trueCount/totalCount*100)}%).</p>
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-semibold mb-2">Tabla de evaluaciones:</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                {extractVariables(expression1).map(variable => (
                  <th key={variable} className="border border-gray-300 px-4 py-2">{variable}</th>
                ))}
                <th className="border border-gray-300 px-4 py-2">Resultado</th>
              </tr>
            </thead>
            <tbody>
              {evaluationResults.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {row.combination.map((value, valIndex) => (
                    <td key={valIndex} className="border border-gray-300 px-4 py-2 text-center">
                      {value ? 'V' : 'F'}
                    </td>
                  ))}
                  <td 
                    className={`border border-gray-300 px-4 py-2 text-center font-semibold ${
                      row.result ? 'bg-gray-100' : 'bg-gray-200'
                    }`}
                  >
                    {row.result ? 'V' : 'F'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Renderizar resultados para equivalencia
  const renderEquivalenceResult = () => {
    if (!analysisResult || analysisResult.type !== 'equivalence') return null;
    
    const { areEquivalent, equivalentCount, totalCount, comparisonResults } = analysisResult;
    
    return (
      <div className="mt-6">
        <div className="p-4 rounded-lg mb-4 bg-gray-100 border border-gray-300">
          <h3 className="text-xl font-bold mb-2">Resultado del análisis:</h3>
          {areEquivalent ? (
            <div className="flex items-center">
              <FaEquals className="text-gray-800 mr-2 text-xl" />
              <p className="text-lg"><strong>Equivalentes:</strong> Las expresiones son lógicamente equivalentes. Tienen los mismos valores de verdad para todas las combinaciones posibles.</p>
            </div>
          ) : (
            <div className="flex items-center">
              <FaTimesCircle className="text-gray-800 mr-2 text-xl" />
              <p className="text-lg"><strong>No equivalentes:</strong> Las expresiones no son lógicamente equivalentes. Coinciden en {equivalentCount} de {totalCount} combinaciones ({Math.round(equivalentCount/totalCount*100)}%).</p>
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-semibold mb-2">Tabla de comparación:</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                {comparisonResults[0] && comparisonResults[0].combination.map((_, index) => {
                  const allVars = [...new Set([...extractVariables(expression1), ...extractVariables(expression2)])];
                  return <th key={index} className="border border-gray-300 px-4 py-2">{allVars[index]}</th>;
                })}
                <th className="border border-gray-300 px-4 py-2">Expresión 1</th>
                <th className="border border-gray-300 px-4 py-2">Expresión 2</th>
                <th className="border border-gray-300 px-4 py-2">¿Iguales?</th>
              </tr>
            </thead>
            <tbody>
              {comparisonResults.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {row.combination.map((value, valIndex) => (
                    <td key={valIndex} className="border border-gray-300 px-4 py-2 text-center">
                      {value ? 'V' : 'F'}
                    </td>
                  ))}
                  <td 
                    className={`border border-gray-300 px-4 py-2 text-center font-semibold ${
                      row.result1 ? 'bg-gray-100' : 'bg-gray-200'
                    }`}
                  >
                    {row.result1 ? 'V' : 'F'}
                  </td>
                  <td 
                    className={`border border-gray-300 px-4 py-2 text-center font-semibold ${
                      row.result2 ? 'bg-gray-100' : 'bg-gray-200'
                    }`}
                  >
                    {row.result2 ? 'V' : 'F'}
                  </td>
                  <td 
                    className={`border border-gray-300 px-4 py-2 text-center font-semibold ${
                      row.isEquivalent ? 'bg-gray-100' : 'bg-gray-200'
                    }`}
                  >
                    {row.isEquivalent ? '✓' : '✗'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-2 mb-6">  
        <FaEdit className="text-3xl text-gray-700" />
        <h1 className="text-3xl font-bold">Análisis de propiedades lógicas</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Tipo de análisis</h2>
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-md ${
                analysisType === 'single' ? 'bg-gray-900 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setAnalysisType('single')}
            >
              Propiedades de una expresión
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                analysisType === 'equivalence' ? 'bg-gray-900 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setAnalysisType('equivalence')}
            >
              Equivalencia lógica
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Ejemplos predefinidos</h2>
          <div className="flex flex-wrap gap-2">
            <button
              className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded-md"
              onClick={() => handleSetExample('tautology')}
            >
              Tautología: {examples.tautology}
            </button>
            <button
              className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded-md"
              onClick={() => handleSetExample('contradiction')}
            >
              Contradicción: {examples.contradiction}
            </button>
            <button
              className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded-md"
              onClick={() => handleSetExample('contingency')}
            >
              Contingencia: {examples.contingency}
            </button>
            <button
              className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded-md"
              onClick={() => handleSetExample('equivalent1')}
            >
              Equivalencia: {examples.equivalent1[0]} ≡ {examples.equivalent1[1]}
            </button>
            <button
              className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded-md"
              onClick={() => handleSetExample('equivalent2')}
            >
              Equivalencia: {examples.equivalent2[0]} ≡ {examples.equivalent2[1]}
            </button>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">
            Expresión 1
          </label>
          <input
            type="text"
            value={expression1}
            onChange={(e) => setExpression1(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ejemplo: p ∧ (q → r)"
          />
          
          {/* Botones para facilitar la entrada de expresiones */}
          <div className="mt-2 space-y-3">
            <div>
              <h3 className="text-sm font-semibold mb-1">Variables:</h3>
              <div className="flex flex-wrap gap-1">
                {VARIABLES.map((variable) => (
                  <button
                    key={variable}
                    onClick={() => setExpression1(prev => prev + variable)}
                    className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded-md transition-colors text-sm"
                  >
                    {variable}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-1">Operadores:</h3>
              <div className="flex flex-wrap gap-1">
                {Object.entries(OPERATORS).map(([symbol]) => (
                  <button
                    key={symbol}
                    onClick={() => setExpression1(prev => prev + symbol)}
                    className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded-md transition-colors text-sm"
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-1">Paréntesis:</h3>
              <div className="flex flex-wrap gap-1">
                {PARENTHESES.map(({ symbol }) => (
                  <button
                    key={symbol}
                    onClick={() => setExpression1(prev => prev + symbol)}
                    className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded-md transition-colors text-sm"
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setExpression1('')}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors text-sm"
              >
                Limpiar
              </button>
              <button
                onClick={() => setExpression1(prev => prev.slice(0, -1))}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors text-sm"
              >
                ← Borrar
              </button>
            </div>
          </div>
        </div>
        
        {analysisType === 'equivalence' && (
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">
              Expresión 2
            </label>
            <input
              type="text"
              value={expression2}
              onChange={(e) => setExpression2(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Ejemplo: p ∧ (¬q ∨ r)"
            />
            
            {/* Botones para facilitar la entrada de la segunda expresión */}
            <div className="mt-2 space-y-3">
              <div>
                <h3 className="text-sm font-semibold mb-1">Variables:</h3>
                <div className="flex flex-wrap gap-1">
                  {VARIABLES.map((variable) => (
                    <button
                      key={variable}
                      onClick={() => setExpression2(prev => prev + variable)}
                      className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded-md transition-colors text-sm"
                    >
                      {variable}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-1">Operadores:</h3>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(OPERATORS).map(([symbol]) => (
                    <button
                      key={symbol}
                      onClick={() => setExpression2(prev => prev + symbol)}
                      className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded-md transition-colors text-sm"
                    >
                      {symbol}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-1">Paréntesis:</h3>
                <div className="flex flex-wrap gap-1">
                  {PARENTHESES.map(({ symbol }) => (
                    <button
                      key={symbol}
                      onClick={() => setExpression2(prev => prev + symbol)}
                      className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded-md transition-colors text-sm"
                    >
                      {symbol}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setExpression2('')}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors text-sm"
                >
                  Limpiar
                </button>
                <button
                  onClick={() => setExpression2(prev => prev.slice(0, -1))}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors text-sm"
                >
                  ← Borrar
                </button>
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400"
        >
          {isLoading ? 'Analizando...' : 'Analizar'}
        </button>
      </div>
      
      {analysisResult && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          {analysisType === 'single' ? renderSingleResult() : renderEquivalenceResult()}
        </div>
      )}
    </div>
  );
};

export default PropertiesAnalysisPage;
