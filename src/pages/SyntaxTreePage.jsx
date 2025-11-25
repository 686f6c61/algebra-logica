/**
 * =============================================================================
 * ALGEBRA LOGICA - Página de Árboles Sintácticos
 * =============================================================================
 *
 * @file SyntaxTreePage.jsx
 * @description Generador de árboles de análisis sintáctico para expresiones
 *              lógicas. Visualiza la estructura jerárquica de operadores y
 *              subexpresiones en formato ASCII.
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
 * ÁRBOL SINTÁCTICO
 * =============================================================================
 *
 * Un árbol sintáctico representa la estructura de una expresión donde:
 * - La raíz es el operador principal
 * - Los hijos son las subexpresiones u operandos
 * - Las hojas son las variables proposicionales
 *
 * Ejemplo: p ∧ (q ∨ r)
 *          ∧
 *         / \
 *        p   ∨
 *           / \
 *          q   r
 *
 * =============================================================================
 */

import React, { useState } from 'react';
import { FaTree, FaCode } from 'react-icons/fa';
import { extractVariables } from '../utils/logicOperations';
import { OPERATORS, VARIABLES, PARENTHESES } from '../utils/constants';

const SyntaxTreePage = () => {
  const [expression, setExpression] = useState('');
  const [tree, setTree] = useState(null);
  const [error, setError] = useState('');

  // Ejemplos predefinidos para árboles sintácticos
  const examples = [
    { name: "Conjunción simple", expression: "p ∧ q" },
    { name: "Disyunción simple", expression: "p ∨ q" },
    { name: "Implicación", expression: "p → q" },
    { name: "Negación", expression: "¬p" },
    { name: "Expresión compuesta", expression: "p ∧ (q ∨ ¬r)" },
    { name: "Doble implicación", expression: "(p → q) ∧ (q → p)" }
  ];

  // Función para generar el árbol sintáctico a partir de una expresión
  const generateTree = () => {
    if (!expression.trim()) {
      setError('Por favor, introduce una expresión lógica.');
      setTree(null);
      return;
    }

    try {
      // Generar representación de árbol (versión simple ASCII)
      const asciiTree = generateAsciiTree(expression);
      setTree(asciiTree);
      setError('');
    } catch (err) {
      setError('Error al generar el árbol: ' + err.message);
      setTree(null);
    }
  };

  // Función para generar un árbol ASCII a partir de una expresión
  const generateAsciiTree = (expr) => {
    // Limpieza inicial de la expresión
    expr = expr.trim();
    
    // Función para analizar la expresión y encontrar su estructura
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
        '¬': 5, // negación (mayor precedencia)
        '∧': 4, // conjunción
        '∨': 3, // disyunción
        '→': 2, // implicación
        '↔': 1  // bicondicional (menor precedencia)
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
          // (o igual precedencia para operadores asociativos por la izquierda)
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
    
    // Función para generar la representación ASCII del árbol
    const generateAscii = (node, prefix = '', isLeft = true, isRoot = true) => {
      if (!node) return '';
      
      // Diferentes prefijos según la posición en el árbol
      const connector = isLeft ? '└─ ' : '┌─ ';
      const currentPrefix = isRoot ? '' : prefix + connector;
      let nextPrefix = prefix + (isLeft ? '   ' : '│  ');
      
      let result = '';
      
      if (node.type === 'variable') {
        // Es una hoja (variable o constante)
        result = currentPrefix + node.value + '\n';
      } else {
        // Es un nodo operador
        result = currentPrefix + node.operator + '\n';
        
        // Añadir subárboles
        if (node.operator === '¬') {
          // Negación solo tiene hijo derecho
          result += generateAscii(node.right, nextPrefix, false, false);
        } else {
          // Operadores binarios tienen dos hijos
          result += generateAscii(node.left, nextPrefix, true, false);
          result += generateAscii(node.right, nextPrefix, false, false);
        }
      }
      
      return result;
    };
    
    try {
      // Analizamos la expresión y generamos su representación
      const syntaxTree = parseExpression(expr);
      return generateAscii(syntaxTree);
    } catch (error) {
      return `Error al generar árbol: ${error.message}`;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-2 mb-6">  
        <FaTree className="text-3xl text-gray-700" />
        <h1 className="text-3xl font-bold">Árboles de Análisis Sintáctico</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Visualiza la estructura de expresiones lógicas</h2>
          <p className="text-lg mb-4">
            Los árboles sintácticos permiten visualizar cómo se estructura una expresión lógica, 
            mostrando la jerarquía de operadores y subexpresiones. Ingresa una expresión o selecciona 
            un ejemplo para generar su árbol correspondiente.
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
              placeholder="Ejemplo: p ∧ (q ∨ ¬r)"
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
            onClick={generateTree}
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
          >
            Generar Árbol
          </button>
        </div>
      </div>
      
      {tree && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Árbol de Análisis Sintáctico</h2>
          
          <div className="p-4 mb-6 bg-gray-100 border border-gray-300 rounded-lg">
            <h3 className="font-semibold text-xl mb-2">
              Expresión: {expression}
            </h3>
            <div className="mt-4 p-4 bg-white border border-gray-300 rounded font-mono whitespace-pre overflow-x-auto">
              {tree}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Interpretación del árbol</h3>
            <div className="p-4 border border-gray-300 bg-gray-50 rounded-md shadow-sm">
              <div className="flex items-start mb-3">
                <FaCode className="text-gray-700 mt-1 mr-3 text-lg" />
                <p className="text-lg">
                  El árbol muestra la estructura jerárquica de la expresión lógica, donde:
                </p>
              </div>
              <ul className="ml-8 pl-3 space-y-2 list-disc">
                <li>La raíz representa el operador principal</li>
                <li>Las ramas representan subexpresiones</li>
                <li>Las hojas representan variables o constantes</li>
                <li>El orden de evaluación sigue un recorrido postorden (primero ramas izquierdas, luego derechas, finalmente raíz)</li>
              </ul>
            </div>
          </div>
          
          <div className="p-5 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">¿Cómo evaluar usando el árbol?</h3>
            <p className="text-lg leading-relaxed">
              Para evaluar la expresión usando el árbol, comienza por las hojas (variables) asignándoles valores 
              de verdad (V o F). Luego, ve subiendo por el árbol aplicando los operadores lógicos 
              correspondientes hasta llegar a la raíz.
            </p>
            <div className="mt-3 p-3 bg-white border-l-4 border-gray-500 rounded">
              <p className="text-lg">
                Por ejemplo, para "p ∧ (q ∨ r)" con p=V, q=F, r=V:<br />
                1. Evalúa q ∨ r = F ∨ V = V<br />
                2. Evalúa p ∧ (q ∨ r) = V ∧ V = V
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SyntaxTreePage;
