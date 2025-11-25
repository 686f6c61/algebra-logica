import React from 'react';
import { FaCircleNotch, FaCode, FaLightbulb } from 'react-icons/fa';

const LogicCircuitsTheory = () => {
  return (
    <div className="space-y-6">
      <section>
        <p className="mb-4">
          Los circuitos lógicos son representaciones físicas de expresiones lógicas que utilizan compuertas lógicas para
          implementar operaciones como la conjunción (AND), disyunción (OR), negación (NOT), entre otras. Estos 
          circuitos son fundamentales en el diseño de sistemas digitales y computadoras.
        </p>
        
        <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 shadow-sm">
          <h4 className="font-semibold mb-2">Elementos básicos de los circuitos lógicos:</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Compuerta AND (∧):</strong> Produce una salida verdadera solo cuando todas sus entradas son verdaderas.
            </li>
            <li>
              <strong>Compuerta OR (∨):</strong> Produce una salida verdadera cuando al menos una de sus entradas es verdadera.
            </li>
            <li>
              <strong>Compuerta NOT (¬):</strong> Invierte el valor lógico de su entrada (de verdadero a falso o viceversa).
            </li>
            <li>
              <strong>Compuerta NAND:</strong> Equivale a una compuerta AND seguida de una NOT.
            </li>
            <li>
              <strong>Compuerta NOR:</strong> Equivale a una compuerta OR seguida de una NOT.
            </li>
            <li>
              <strong>Compuerta XOR:</strong> Produce una salida verdadera cuando exactamente una de sus entradas es verdadera.
            </li>
          </ul>
        </div>
      </section>
      
      <section>
        <h3 className="text-lg font-semibold mb-2">Conversión de Expresiones a Circuitos</h3>
        <p className="mb-4">
          Cualquier expresión lógica puede representarse como un circuito siguiendo la estructura de su árbol sintáctico.
          Las variables se convierten en entradas, los operadores en compuertas lógicas, y el flujo sigue la jerarquía de la expresión.
        </p>
        
        <div className="space-y-6 mb-6">
          <div className="bg-gray-100 p-5 rounded-lg border border-gray-300">
            <h4 className="font-semibold mb-3 text-center text-lg">Expresión: p ∧ ¬q</h4>
            <div className="flex justify-center my-4">
              <div className="bg-white px-5 py-4 rounded-lg border border-gray-300 w-full max-w-md">
                <div className="font-mono whitespace-pre text-center">
                  p --------------┐
                                  │
                                  ▼
                                 AND ───{'>'}{'>'} Salida
                                  ▲
                                  │
                  q ──{'>'}{'>'} NOT ─────┘
                </div>
              </div>
            </div>
            <p className="text-center">
              Este circuito toma dos entradas (p y q), niega q, y luego aplica la operación AND a p y ¬q.
            </p>
          </div>
          
          <div className="bg-gray-100 p-5 rounded-lg border border-gray-300">
            <h4 className="font-semibold mb-3 text-center text-lg">Expresión: (p ∨ q) → r</h4>
            <div className="flex justify-center my-4">
              <div className="bg-white px-5 py-4 rounded-lg border border-gray-300 w-full max-w-md">
                <div className="font-mono whitespace-pre text-center">
                  p ───┐
                       │
                       ▼
                  q ──{'>'}{'>'} OR ──{'>'}{'>'} NOT ──┐
                                               │
                                               ▼
                  r ────────────────────────{'>'}{'>'} OR ──{'>'}{'>'} Salida
                </div>
              </div>
            </div>
            <p className="text-center">
              Este circuito implementa la expresión (p ∨ q) → r, que es equivalente a ¬(p ∨ q) ∨ r.
            </p>
          </div>
        </div>
      </section>
      
      <section>
        <h3 className="text-lg font-semibold mb-2">Ventajas de los Circuitos Lógicos</h3>
        <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
          <div className="flex items-start mb-3">
            <FaLightbulb className="text-gray-700 mt-1 mr-3 text-lg" />
            <p className="text-lg">
              Los circuitos lógicos tienen varias aplicaciones importantes:
            </p>
          </div>
          <ul className="ml-8 pl-3 space-y-2 list-disc">
            <li><strong>Implementación física:</strong> Permiten convertir expresiones lógicas abstractas en dispositivos físicos.</li>
            <li><strong>Optimización:</strong> Al visualizar el circuito, es posible identificar simplificaciones y optimizaciones.</li>
            <li><strong>Análisis de rendimiento:</strong> Facilitan la evaluación de la eficiencia y tiempo de respuesta de un sistema.</li>
            <li><strong>Diseño modular:</strong> Permiten construir sistemas complejos a partir de componentes más simples.</li>
          </ul>
        </div>
      </section>
      
      <section>
        <h3 className="text-lg font-semibold mb-2">Minimización de Circuitos</h3>
        <p className="mb-4">
          La reducción de complejidad en circuitos lógicos se conoce como minimización. Los métodos más comunes incluyen:
        </p>
        <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
          <ul className="space-y-3">
            <li>
              <strong>Álgebra de Boole:</strong> Aplicar leyes y propiedades algebraicas para simplificar expresiones.
            </li>
            <li>
              <strong>Mapas de Karnaugh:</strong> Método gráfico que facilita la identificación de términos redundantes.
            </li>
            <li>
              <strong>Método de Quine-McCluskey:</strong> Algoritmo sistemático para simplificar funciones booleanas.
            </li>
          </ul>
        </div>
      </section>
      
      <section>
        <h3 className="text-lg font-semibold mb-2">Simulación de Circuitos</h3>
        <p className="mb-4">
          La simulación de circuitos lógicos permite verificar el comportamiento esperado antes de su implementación física:
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
            <h4 className="font-semibold text-center mb-2">Tabla de Entradas y Salidas</h4>
            <div className="overflow-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">p</th>
                    <th className="border border-gray-300 p-2">q</th>
                    <th className="border border-gray-300 p-2">p ∧ ¬q</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 text-center p-2">F</td>
                    <td className="border border-gray-300 text-center p-2">F</td>
                    <td className="border border-gray-300 text-center p-2">F</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 text-center p-2">F</td>
                    <td className="border border-gray-300 text-center p-2">V</td>
                    <td className="border border-gray-300 text-center p-2">F</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 text-center p-2">V</td>
                    <td className="border border-gray-300 text-center p-2">F</td>
                    <td className="border border-gray-300 text-center p-2">V</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 text-center p-2">V</td>
                    <td className="border border-gray-300 text-center p-2">V</td>
                    <td className="border border-gray-300 text-center p-2">F</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <FaCircleNotch className="text-3xl mx-auto mb-2 text-gray-700" />
                <p>
                  La simulación permite verificar todas las combinaciones posibles de entradas y validar que las salidas sean correctas.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
          <p className="text-lg">
            Los simuladores de circuitos permiten probar diseños complejos de manera virtual, ahorrando tiempo y recursos en la fase de implementación.
          </p>
        </div>
      </section>
      
      <section>
        <h3 className="text-lg font-semibold mb-2">Aplicaciones Prácticas</h3>
        <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 shadow-sm">
          <div className="flex items-start mb-3">
            <FaCircleNotch className="text-gray-700 mt-1 mr-3 text-lg" />
            <p className="text-lg">
              Los circuitos lógicos son fundamentales en:
            </p>
          </div>
          <ul className="ml-8 pl-3 space-y-2 list-disc">
            <li>Diseño de procesadores y unidades aritméticas</li>
            <li>Sistemas de control automatizados</li>
            <li>Memoria de computadoras</li>
            <li>Construcción de decodificadores y multiplexores</li>
            <li>Sistemas de seguridad y verificación</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default LogicCircuitsTheory;
