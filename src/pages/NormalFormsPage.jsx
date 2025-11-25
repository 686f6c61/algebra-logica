/**
 * =============================================================================
 * ALGEBRA LOGICA - Página de Formas Normales
 * =============================================================================
 *
 * @file NormalFormsPage.jsx
 * @description Conversor de expresiones lógicas a Forma Normal Conjuntiva (FNC)
 *              y Forma Normal Disyuntiva (FND). Utiliza el método de tabla de
 *              verdad para generar las formas normales equivalentes.
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
 * FORMAS NORMALES
 * =============================================================================
 *
 * FNC (Forma Normal Conjuntiva):
 * - Conjunción de disyunciones: (A ∨ B) ∧ (C ∨ D)
 * - Se construye a partir de las filas FALSAS de la tabla de verdad
 *
 * FND (Forma Normal Disyuntiva):
 * - Disyunción de conjunciones: (A ∧ B) ∨ (C ∧ D)
 * - Se construye a partir de las filas VERDADERAS de la tabla de verdad
 *
 * =============================================================================
 */

import React, { useState } from 'react';
import { FaExchangeAlt, FaCode } from 'react-icons/fa';
import { extractVariables, generateCombinations } from '../utils/logicOperations';
import { evaluateExpression } from '../utils/expressionEvaluator';
import { OPERATORS, VARIABLES, PARENTHESES } from '../utils/constants';

const NormalFormsPage = () => {
  const [expression, setExpression] = useState('');
  const [conversionType, setConversionType] = useState('cnf'); // 'cnf' o 'dnf'
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState('');
  
  // Ejemplos predefinidos para FNC y FND
  const examples = {
    // Ejemplos para FNC
    cnf: [
      { name: "Implicación simple", expression: "p → q" },
      { name: "Doble implicación", expression: "p ↔ q" },
      { name: "Expresión con disyunción", expression: "p ∨ (q ∧ r)" },
      { name: "Expresión con negación", expression: "¬p ∨ ¬q" },
      { name: "Modus Ponens", expression: "(p → q) ∧ p → q" }
    ],
    // Ejemplos para FND
    dnf: [
      { name: "Conjunción simple", expression: "p ∧ q" },
      { name: "Expresión con implicación", expression: "p → (q ∨ r)" },
      { name: "Negación de conjunción", expression: "¬(p ∧ q)" },
      { name: "Ley distributiva", expression: "p ∧ (q ∨ r)" },
      { name: "Bicondicional complejo", expression: "(p ↔ q) ∨ r" }
    ]
  };

  // Función para convertir a FNC usando tabla de verdad
  const convertToCNF = (expr) => {
    try {
      // Extraer variables y generar todas las combinaciones
      const vars = extractVariables(expr);
      const combinations = generateCombinations(vars);
      
      // Evaluar la expresión para cada combinación
      const evaluations = combinations.map(combo => {
        const values = {};
        vars.forEach((name, index) => {
          values[name] = combo[index];
        });
        const result = evaluateExpression(expr, values);
        return { 
          combination: combo, 
          result: typeof result === 'object' ? result.result : result 
        };
      });
      
      // Generar FNC mediante el método de tabla de verdad
      // Para FNC: Se toman las filas que evalúan a falso y se crean disyunciones
      const falseCombinations = evaluations.filter(evalItem => !evalItem.result);
      
      // Si todas las combinaciones son verdaderas, es una tautología (FNC = true)
      if (falseCombinations.length === 0) {
        setSteps([
          { 
            description: "Se evalúa la expresión para todas las combinaciones posibles", 
            result: "La expresión es una tautología (siempre verdadera)"
          },
          { 
            description: "Forma Normal Conjuntiva de una tautología", 
            result: "Verdadero (no hay cláusulas)"
          }
        ]);
        return "Verdadero (tautología)";
      }
      
      // Si todas las combinaciones son falsas, es una contradicción (FNC = false)
      if (falseCombinations.length === combinations.length) {
        setSteps([
          { 
            description: "Se evalúa la expresión para todas las combinaciones posibles", 
            result: "La expresión es una contradicción (siempre falsa)"
          },
          { 
            description: "Forma Normal Conjuntiva de una contradicción", 
            result: "Falso (contradicción)"
          }
        ]);
        return "Falso (contradicción)";
      }
      
      // Construir las cláusulas disyuntivas para cada combinación falsa
      const clauses = falseCombinations.map(evalItem => {
        // Para cada literal en la combinación, tomar su negación si es V, o dejarlo como está si es F
        const literals = evalItem.combination.map((val, idx) => {
          const variable = vars[idx];
          return val ? `¬${variable}` : variable;
        });
        return `(${literals.join(' ∨ ')})`;
      });
      
      // Completar los pasos para mostrar el proceso
      const stepsToShow = [
        { 
          description: "Se evalúa la expresión para todas las combinaciones posibles", 
          result: `Evaluaciones: ${evaluations.map(e => e.result ? 'V' : 'F').join(', ')}`
        },
        { 
          description: "Se identifican las combinaciones que evalúan a falso", 
          result: `Filas falsas: ${falseCombinations.length} de ${combinations.length}`
        },
        { 
          description: "Se construye una cláusula disyuntiva para cada combinación falsa", 
          result: `Cláusulas: ${clauses.join('; ')}`
        },
        { 
          description: "Se forma la conjunción de todas las cláusulas disyuntivas", 
          result: clauses.join(' ∧ ')
        }
      ];
      
      setSteps(stepsToShow);
      
      // La FNC es la conjunción de todas estas cláusulas
      return clauses.join(' ∧ ');
    } catch (err) {
      setError(`Error al convertir a FNC: ${err.message}`);
      return null;
    }
  };

  // Función para convertir a FND usando tabla de verdad
  const convertToDNF = (expr) => {
    try {
      // Extraer variables y generar todas las combinaciones
      const vars = extractVariables(expr);
      const combinations = generateCombinations(vars);
      
      // Evaluar la expresión para cada combinación
      const evaluations = combinations.map(combo => {
        const values = {};
        vars.forEach((name, index) => {
          values[name] = combo[index];
        });
        const result = evaluateExpression(expr, values);
        return { 
          combination: combo, 
          result: typeof result === 'object' ? result.result : result 
        };
      });
      
      // Generar FND mediante el método de tabla de verdad
      // Para FND: Se toman las filas que evalúan a verdadero y se crean conjunciones
      const trueCombinations = evaluations.filter(evalItem => evalItem.result);
      
      // Si todas las combinaciones son falsas, es una contradicción (FND = falso)
      if (trueCombinations.length === 0) {
        setSteps([
          { 
            description: "Se evalúa la expresión para todas las combinaciones posibles", 
            result: "La expresión es una contradicción (siempre falsa)"
          },
          { 
            description: "Forma Normal Disyuntiva de una contradicción", 
            result: "Falso (no hay cláusulas)"
          }
        ]);
        return "Falso (contradicción)";
      }
      
      // Si todas las combinaciones son verdaderas, es una tautología (FND = verdadero)
      if (trueCombinations.length === combinations.length) {
        setSteps([
          { 
            description: "Se evalúa la expresión para todas las combinaciones posibles", 
            result: "La expresión es una tautología (siempre verdadera)"
          },
          { 
            description: "Forma Normal Disyuntiva de una tautología", 
            result: "Verdadero (tautología)"
          }
        ]);
        return "Verdadero (tautología)";
      }
      
      // Construir las cláusulas conjuntivas para cada combinación verdadera
      const clauses = trueCombinations.map(evalItem => {
        // Para cada literal en la combinación, dejarlo como está si es V, o tomar su negación si es F
        const literals = evalItem.combination.map((val, idx) => {
          const variable = vars[idx];
          return val ? variable : `¬${variable}`;
        });
        return `(${literals.join(' ∧ ')})`;
      });
      
      // Completar los pasos para mostrar el proceso
      const stepsToShow = [
        { 
          description: "Se evalúa la expresión para todas las combinaciones posibles", 
          result: `Evaluaciones: ${evaluations.map(e => e.result ? 'V' : 'F').join(', ')}`
        },
        { 
          description: "Se identifican las combinaciones que evalúan a verdadero", 
          result: `Filas verdaderas: ${trueCombinations.length} de ${combinations.length}`
        },
        { 
          description: "Se construye una cláusula conjuntiva para cada combinación verdadera", 
          result: `Cláusulas: ${clauses.join('; ')}`
        },
        { 
          description: "Se forma la disyunción de todas las cláusulas conjuntivas", 
          result: clauses.join(' ∨ ')
        }
      ];
      
      setSteps(stepsToShow);
      
      // La FND es la disyunción de todas estas cláusulas
      return clauses.join(' ∨ ');
    } catch (err) {
      setError(`Error al convertir a FND: ${err.message}`);
      return null;
    }
  };

  // Función para cargar un ejemplo según el tipo de conversión
  const loadExample = (exampleIndex) => {
    if (examples[conversionType] && examples[conversionType][exampleIndex]) {
      setExpression(examples[conversionType][exampleIndex].expression);
    }
  };
  
  // Función para manejar la conversión
  const handleConvert = () => {
    if (!expression.trim()) {
      setError('Por favor, introduce una expresión lógica para convertir.');
      setResult(null);
      setSteps([]);
      return;
    }
    
    setError('');
    
    if (conversionType === 'cnf') {
      const cnf = convertToCNF(expression);
      setResult(cnf);
    } else {
      const dnf = convertToDNF(expression);
      setResult(dnf);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-2 mb-6">  
        <FaExchangeAlt className="text-3xl text-gray-700" />
        <h1 className="text-3xl font-bold">Conversor de Formas Normales</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Convertir expresión a forma normal</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            <button
              className={`px-4 py-2 rounded-md ${
                conversionType === 'cnf' ? 'bg-gray-900 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setConversionType('cnf')}
            >
              Forma Normal Conjuntiva (FNC)
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                conversionType === 'dnf' ? 'bg-gray-900 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setConversionType('dnf')}
            >
              Forma Normal Disyuntiva (FND)
            </button>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Ejemplos predefinidos:</h3>
            <div className="flex flex-wrap gap-2">
              {examples[conversionType].map((example, index) => (
                <button
                  key={index}
                  onClick={() => setExpression(example.expression)}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  {example.name}: {example.expression}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">
              Expresión lógica
            </label>
            <input
              type="text"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Ejemplo: p → (q ∨ r)"
            />
            
            {/* Botones para facilitar la entrada de expresiones */}
            <div className="mt-2 space-y-3">
              <div>
                <h3 className="text-sm font-semibold mb-1">Variables:</h3>
                <div className="flex flex-wrap gap-1">
                  {VARIABLES.map((variable) => (
                    <button
                      key={variable}
                      onClick={() => setExpression(prev => prev + variable)}
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
                      onClick={() => setExpression(prev => prev + symbol)}
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
                      onClick={() => setExpression(prev => prev + symbol)}
                      className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded-md transition-colors text-sm"
                    >
                      {symbol}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setExpression('')}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors text-sm"
                >
                  Limpiar
                </button>
                <button
                  onClick={() => setExpression(prev => prev.slice(0, -1))}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors text-sm"
                >
                  ← Borrar
                </button>
              </div>
            </div>
          </div>
          
          {error && (
            <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <button
            onClick={handleConvert}
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
          >
            Convertir
          </button>
        </div>
      </div>
      
      {result && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Resultado de la conversión</h2>
          
          <div className="p-4 mb-6 bg-gray-100 border border-gray-300 rounded-lg">
            <h3 className="font-semibold text-xl mb-2">
              {conversionType === 'cnf' ? 'Forma Normal Conjuntiva (FNC)' : 'Forma Normal Disyuntiva (FND)'}
            </h3>
            <p className="font-mono text-2xl my-3 p-2 bg-gray-50 border-l-4 border-gray-400 pl-4">
              {result}
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Proceso de conversión paso a paso</h3>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="p-4 border border-gray-300 bg-gray-50 rounded-md shadow-sm">
                  <div className="flex items-start mb-3">
                    <FaCode className="text-gray-700 mt-1 mr-3 text-lg" />
                    <p className="font-semibold text-lg">{step.description}</p>
                  </div>
                  <p className="ml-7 pl-3 border-l-3 border-gray-400 py-2 text-lg">{step.result}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-5 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Explicación</h3>
            <p className="text-lg leading-relaxed">
              {conversionType === 'cnf' 
                ? "La Forma Normal Conjuntiva (FNC) representa una expresión como una conjunción (AND) de disyunciones (OR). " +
                  "Cada disyunción es una cláusula compuesta por literales (variables o sus negaciones)."
                : "La Forma Normal Disyuntiva (FND) representa una expresión como una disyunción (OR) de conjunciones (AND). " +
                  "Cada conjunción es una cláusula compuesta por literales (variables o sus negaciones)."
              }
            </p>
            <div className="mt-3 p-3 bg-white border-l-4 border-gray-500 rounded">
              <p className="text-lg">
                {conversionType === 'cnf' 
                  ? "Ejemplo FNC: (p ∨ q) ∧ (p ∨ ¬r) ∧ (¬q ∨ r)"
                  : "Ejemplo FND: (p ∧ q) ∨ (p ∧ ¬r) ∨ (¬q ∧ r)"
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NormalFormsPage;
