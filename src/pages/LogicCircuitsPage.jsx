/**
 * =============================================================================
 * ALGEBRA LOGICA - Página de Circuitos Lógicos
 * =============================================================================
 *
 * @file LogicCircuitsPage.jsx
 * @description Simulador de circuitos lógicos digitales. Convierte expresiones
 *              lógicas en representaciones de circuitos y permite simular su
 *              comportamiento con diferentes combinaciones de entrada.
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
 * - Conversión de expresiones lógicas a diagramas de circuitos ASCII
 * - Simulación interactiva con selección de valores de entrada
 * - Generación automática de tabla de verdad
 * - Ejemplos predefinidos de circuitos comunes
 *
 * =============================================================================
 */

import React, { useState, useEffect } from 'react';
import { FaCircleNotch, FaCode, FaLightbulb } from 'react-icons/fa';
import { extractVariables, generateCombinations } from '../utils/logicOperations';
import { OPERATORS, VARIABLES, PARENTHESES } from '../utils/constants';

const LogicCircuitsPage = () => {
  const [expression, setExpression] = useState('');
  const [circuitDiagram, setCircuitDiagram] = useState(null);
  const [truthTable, setTruthTable] = useState(null);
  const [error, setError] = useState('');
  const [selectedInputs, setSelectedInputs] = useState({});
  const [output, setOutput] = useState(null);
  
  // Ejemplos predefinidos para circuitos lógicos
  const examples = [
    { name: "Conjunción simple", expression: "p ∧ q" },
    { name: "Disyunción simple", expression: "p ∨ q" },
    { name: "Negación", expression: "¬p" },
    { name: "AND-OR", expression: "(p ∧ q) ∨ r" },
    { name: "Implicación", expression: "p → q" },
    { name: "XOR (exclusivo)", expression: "(p ∨ q) ∧ ¬(p ∧ q)" }
  ];

  // Función para generar el diagrama del circuito
  const generateCircuit = () => {
    if (!expression.trim()) {
      setError('Por favor, introduce una expresión lógica.');
      setCircuitDiagram(null);
      setTruthTable(null);
      return;
    }

    try {
      // Crear representación ASCII del circuito
      const circuitASCII = generateCircuitDiagram(expression);
      setCircuitDiagram(circuitASCII);
      
      // Generar tabla de verdad para simular el circuito
      generateTruthTable(expression);
      
      setError('');
    } catch (err) {
      setError('Error al generar el circuito: ' + err.message);
      setCircuitDiagram(null);
      setTruthTable(null);
    }
  };

  // Simula el comportamiento del circuito con entradas específicas
  const simulateCircuit = () => {
    if (!truthTable) return;
    
    const variables = Object.keys(selectedInputs);
    
    // Convertir los valores seleccionados a arreglo de booleanos para comparar con la tabla
    const selectedValues = variables.map(v => selectedInputs[v] === true);
    
    // Buscar la fila correspondiente en la tabla de verdad
    const matchingRow = truthTable.rows.find(row => {
      return row.inputs.every((val, idx) => val === selectedValues[idx]);
    });
    
    if (matchingRow) {
      setOutput(matchingRow.result);
    } else {
      setOutput(null);
    }
  };

  // Efecto para actualizar la simulación cuando cambien las entradas seleccionadas
  useEffect(() => {
    if (Object.keys(selectedInputs).length > 0) {
      simulateCircuit();
    }
  }, [selectedInputs]);

  // Función para generar una representación ASCII del circuito
  const generateCircuitDiagram = (expr) => {
    // Esta es una implementación simplificada - en una aplicación real 
    // se utilizaría una biblioteca de visualización más avanzada
    
    // Función para analizar la expresión
    const parseExpression = (expression) => {
      expression = expression.trim();
      
      // Eliminar paréntesis externos si existen
      if (expression[0] === '(' && expression[expression.length - 1] === ')') {
        // Verificar que los paréntesis están balanceados
        let balance = 0;
        let balanced = true;
        
        for (let i = 0; i < expression.length - 1; i++) {
          if (expression[i] === '(') balance++;
          if (expression[i] === ')') balance--;
          if (balance === 0 && i < expression.length - 1) {
            balanced = false;
            break;
          }
        }
        
        if (balanced) {
          expression = expression.substring(1, expression.length - 1);
        }
      }
      
      // Precedencia de operadores (menor número = mayor precedencia)
      const precedence = {
        '¬': 5,  // negación (mayor precedencia)
        '∧': 4,  // conjunción
        '∨': 3,  // disyunción
        '→': 2,  // implicación
        '↔': 1   // bicondicional (menor precedencia)
      };
      
      // Buscar el operador principal (el de menor precedencia, fuera de paréntesis)
      let level = 0;
      let mainOpIndex = -1;
      let mainOpPrecedence = 999;
      
      for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        
        if (char === '(') {
          level++;
        } else if (char === ')') {
          level--;
        } else if (level === 0 && precedence[char]) {
          // Si estamos en el nivel base (fuera de paréntesis) y es un operador
          const currentPrecedence = precedence[char];
          
          // Actualizamos el operador principal si tiene menor precedencia 
          if (currentPrecedence < mainOpPrecedence || 
              (currentPrecedence === mainOpPrecedence && char !== '¬')) {
            mainOpIndex = i;
            mainOpPrecedence = currentPrecedence;
          }
        }
      }
      
      // Si encontramos un operador principal
      if (mainOpIndex !== -1) {
        const operator = expression[mainOpIndex];
        
        // Caso especial para la negación
        if (operator === '¬') {
          const rightExpr = expression.substring(mainOpIndex + 1);
          return {
            type: 'operator',
            operator: operator,
            left: null,
            right: parseExpression(rightExpr)
          };
        } else {
          // Para operadores binarios
          const leftExpr = expression.substring(0, mainOpIndex).trim();
          const rightExpr = expression.substring(mainOpIndex + 1).trim();
          
          return {
            type: 'operator',
            operator: operator,
            left: parseExpression(leftExpr),
            right: parseExpression(rightExpr)
          };
        }
      }
      
      // Si no hay operadores, debe ser una variable o constante
      return {
        type: 'variable',
        value: expression
      };
    };
    
    // Convierte operadores lógicos a nombres de compuertas
    const operatorToGate = {
      '∧': 'AND',
      '∨': 'OR',
      '¬': 'NOT',
      '→': 'IMPLIES',
      '↔': 'XNOR'
    };
    
    // Función que genera el diagrama ASCII del circuito
    const generateCircuitASCII = (node, depth = 0, isRoot = true) => {
      if (!node) return [];
      
      const indent = ' '.repeat(depth * 4);
      const lines = [];
      
      if (node.type === 'variable') {
        lines.push(`${indent}${node.value} --------+`);
      } else if (node.type === 'operator') {
        // Casos especiales para algunos operadores
        if (node.operator === '¬') {
          const rightLines = generateCircuitASCII(node.right, depth + 1, false);
          lines.push(...rightLines);
          if (isRoot) {
            lines.push(`${indent}${' '.repeat(rightLines[0].indexOf('-'))}NOT ---> Salida`);
          } else {
            lines.push(`${indent}${' '.repeat(rightLines[0].indexOf('-'))}NOT ---+`);
          }
        } else {
          // Operadores binarios
          let gateName = operatorToGate[node.operator] || node.operator;
          
          if (node.left) {
            const leftLines = generateCircuitASCII(node.left, depth + 1, false);
            lines.push(...leftLines);
          }
          
          if (node.right) {
            const rightLines = generateCircuitASCII(node.right, depth + 1, false);
            lines.push(...rightLines);
          }
          
          // Línea de la compuerta
          if (isRoot) {
            lines.push(`${indent}${' '.repeat(Math.max(0, lines[0].indexOf('-') - gateName.length))}${gateName} ---> Salida`);
          } else {
            lines.push(`${indent}${' '.repeat(Math.max(0, lines[0].indexOf('-') - gateName.length))}${gateName} ---+`);
          }
        }
      }
      
      return lines;
    };
    
    // Analizar la expresión y generar el circuito ASCII
    const syntaxTree = parseExpression(expr);
    const circuitLines = generateCircuitASCII(syntaxTree);
    
    // Agregar conexiones entre líneas (versión simplificada)
    const enhancedLines = [...circuitLines];
    
    // Conectar las entradas a las compuertas
    for (let i = 0; i < enhancedLines.length - 1; i++) {
      const line = enhancedLines[i];
      if (line.includes('---+')) {
        const gateLineIndex = enhancedLines.findIndex((l, idx) => 
          idx > i && l.includes('---> Salida') || l.includes(' ---+')
        );
        
        if (gateLineIndex > -1) {
          // Conectar esta entrada con la línea de la compuerta
          const inputEndPos = line.indexOf('-+') + 1;
          const lineChars = line.split('');
          lineChars[inputEndPos] = '|';
          enhancedLines[i] = lineChars.join('');
        }
      }
    }
    
    return enhancedLines.join('\\n');
  };

  // Función para generar la tabla de verdad
  const generateTruthTable = (expr) => {
    try {
      const variables = extractVariables(expr);
      const combinations = generateCombinations(variables);
      
      // Inicializar los valores seleccionados
      const initialInputs = {};
      variables.forEach(v => {
        initialInputs[v] = false;
      });
      setSelectedInputs(initialInputs);
      
      // Función para evaluar una expresión lógica (simplificada)
      const evaluateExpression = (expression, values) => {
        // En una implementación real, se utilizaría un evaluador más completo
        // Esta es una versión muy simplificada para demostración
        let result = expression;
        
        // Reemplazar variables con sus valores
        variables.forEach((variable, index) => {
          result = result.replace(new RegExp(variable, 'g'), values[index] ? 'true' : 'false');
        });
        
        // Reemplazar operadores
        result = result
          .replace(/¬ *true/g, 'false')
          .replace(/¬ *false/g, 'true')
          .replace(/true *∧ *true/g, 'true')
          .replace(/true *∧ *false/g, 'false')
          .replace(/false *∧ *true/g, 'false')
          .replace(/false *∧ *false/g, 'false')
          .replace(/true *∨ *true/g, 'true')
          .replace(/true *∨ *false/g, 'true')
          .replace(/false *∨ *true/g, 'true')
          .replace(/false *∨ *false/g, 'false')
          .replace(/true *→ *true/g, 'true')
          .replace(/true *→ *false/g, 'false')
          .replace(/false *→ *true/g, 'true')
          .replace(/false *→ *false/g, 'true')
          .replace(/true *↔ *true/g, 'true')
          .replace(/true *↔ *false/g, 'false')
          .replace(/false *↔ *true/g, 'false')
          .replace(/false *↔ *false/g, 'true');
        
        // Esto es claramente incompleto, pero sirve como ejemplo
        return result === 'true';
      };
      
      // Crear filas para la tabla de verdad
      const rows = combinations.map(combination => {
        // Intentar evaluar la expresión con esta combinación
        let result;
        try {
          result = evaluateExpression(expr, combination);
        } catch (e) {
          result = 'Error';
        }
        
        return {
          inputs: combination,
          result
        };
      });
      
      setTruthTable({
        variables,
        rows
      });
      
    } catch (err) {
      setError('Error al generar la tabla de verdad: ' + err.message);
      setTruthTable(null);
    }
  };

  // Función para manejar cambios en las entradas de simulación
  const handleInputChange = (variable, value) => {
    setSelectedInputs(prev => ({
      ...prev,
      [variable]: value
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-2 mb-6">  
        <FaCircleNotch className="text-3xl text-gray-700" />
        <h1 className="text-3xl font-bold">Circuitos Lógicos</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Análisis y Simulación de Circuitos</h2>
          <p className="text-lg mb-4">
            Convierte expresiones lógicas en circuitos digitales y simula su comportamiento
            con diferentes combinaciones de entradas.
          </p>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Ejemplos predefinidos:</h3>
            <div className="flex flex-wrap gap-2">
              {examples.map((example, index) => (
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
              placeholder="Ejemplo: p ∧ ¬q"
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
            onClick={generateCircuit}
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
          >
            Generar Circuito
          </button>
        </div>
      </div>
      
      {circuitDiagram && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Circuito Lógico</h2>
          
          <div className="p-4 mb-6 bg-gray-100 border border-gray-300 rounded-lg">
            <h3 className="font-semibold text-xl mb-2">
              Expresión: {expression}
            </h3>
            <div className="mt-4 p-4 bg-white border border-gray-300 rounded font-mono whitespace-pre overflow-x-auto">
              {circuitDiagram.split('\\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Interpretación del Circuito</h3>
            <div className="p-4 border border-gray-300 bg-gray-50 rounded-md shadow-sm">
              <div className="flex items-start mb-3">
                <FaCode className="text-gray-700 mt-1 mr-3 text-lg" />
                <p className="text-lg">
                  El circuito muestra la conversión directa de la expresión lógica a compuertas digitales:
                </p>
              </div>
              <ul className="ml-8 pl-3 space-y-2 list-disc">
                <li>Las variables (p, q, r...) son las entradas del circuito</li>
                <li>Las compuertas lógicas (AND, OR, NOT...) implementan las operaciones</li>
                <li>Las conexiones muestran el flujo de señales lógicas</li>
                <li>La salida final representa el resultado de la expresión completa</li>
              </ul>
            </div>
          </div>
          
          {truthTable && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Simulación del Circuito</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                  <h4 className="font-semibold mb-3">Configurar Entradas</h4>
                  <div className="space-y-3">
                    {truthTable.variables.map(variable => (
                      <div key={variable} className="flex items-center">
                        <span className="w-8 font-bold">{variable}:</span>
                        <div className="flex space-x-2 ml-2">
                          <button
                            onClick={() => handleInputChange(variable, false)}
                            className={`px-4 py-1 rounded ${selectedInputs[variable] === false ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
                          >
                            F
                          </button>
                          <button
                            onClick={() => handleInputChange(variable, true)}
                            className={`px-4 py-1 rounded ${selectedInputs[variable] === true ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
                          >
                            V
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 flex flex-col justify-center">
                  <h4 className="font-semibold mb-2">Resultado de la Simulación</h4>
                  <div className="p-4 border border-gray-300 bg-white rounded-md text-center">
                    <span className="text-2xl font-bold">
                      {output === null ? '?' : output === true ? 'V' : 'F'}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-center">
                    Al evaluar {expression} con los valores de entrada seleccionados,
                    el circuito produce el resultado mostrado.
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Tabla de Verdad Completa</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200">
                        {truthTable.variables.map(variable => (
                          <th key={variable} className="border border-gray-300 p-2">
                            {variable}
                          </th>
                        ))}
                        <th className="border border-gray-300 p-2">
                          {expression}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {truthTable.rows.map((row, index) => (
                        <tr key={index} className={
                          row.inputs.every((val, idx) => val === (selectedInputs[truthTable.variables[idx]] === true))
                          ? 'bg-gray-100'
                          : ''
                        }>
                          {row.inputs.map((value, columnIndex) => (
                            <td key={columnIndex} className="border border-gray-300 text-center p-2">
                              {value ? 'V' : 'F'}
                            </td>
                          ))}
                          <td className="border border-gray-300 text-center p-2 font-semibold">
                            {typeof row.result === 'boolean' ? (row.result ? 'V' : 'F') : row.result}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          <div className="p-5 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Aplicaciones Prácticas</h3>
            <p className="text-lg leading-relaxed mb-3">
              Los circuitos lógicos son fundamentales en el diseño de sistemas digitales como:
            </p>
            <ul className="ml-8 pl-3 space-y-1 list-disc">
              <li>Procesadores y ALUs (Unidades Aritmético-Lógicas)</li>
              <li>Memorias y sistemas de almacenamiento</li>
              <li>Interfaces de entrada/salida</li>
              <li>Sistemas de control automatizados</li>
              <li>Electrónica de consumo</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogicCircuitsPage;
