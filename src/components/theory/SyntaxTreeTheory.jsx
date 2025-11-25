import React from 'react';
import TheoryCard from './TheoryCard';

function SyntaxTreeTheory() {
  return (
    <TheoryCard title="Árboles de Análisis Sintáctico">
      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold mb-2">¿Qué son los árboles de análisis sintáctico?</h3>
          <p className="mb-4">
            Los árboles de análisis sintáctico son representaciones gráficas que muestran la estructura 
            jerárquica de una expresión lógica. Estos árboles permiten visualizar claramente el orden de evaluación 
            de los operadores y la agrupación de subexpresiones, facilitando la comprensión del proceso de evaluación.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mb-6">
            <h4 className="font-semibold mb-2">Características principales:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Cada nodo interno representa un operador lógico (∧, ∨, ¬, →, etc.)</li>
              <li>Las hojas del árbol representan variables o constantes lógicas (p, q, V, F)</li>
              <li>La raíz del árbol representa el operador principal de la expresión</li>
              <li>La estructura del árbol refleja la precedencia y asociatividad de los operadores</li>
            </ul>
          </div>
        </section>
        
        <section>
          <h3 className="text-lg font-semibold mb-2">Construcción de un Árbol Sintáctico</h3>
          <p className="mb-4">
            Para construir un árbol sintáctico, se sigue un proceso recursivo que descompone la expresión 
            en sus componentes más básicos, respetando la precedencia de los operadores.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <h4 className="font-semibold mb-2">Ejemplo: p ∧ (q ∨ r)</h4>
              <div className="flex justify-center my-4">
                <pre className="font-mono text-base overflow-visible whitespace-pre p-3 bg-white rounded border">
                    ∧
                   / \\
                  p   ∨
                     / \\
                    q   r
                </pre>
              </div>
              <p className="text-sm">
                En este árbol, el operador principal es la conjunción (∧), que tiene como operandos 
                la variable p y la subexpresión (q ∨ r). A su vez, la disyunción (∨) tiene como 
                operandos las variables q y r.
              </p>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <h4 className="font-semibold mb-2">Ejemplo: ¬(p → q) ∨ r</h4>
              <div className="flex justify-center my-4">
                <pre className="font-mono text-base overflow-visible whitespace-pre p-3 bg-white rounded border">
                    ∨
                   / \\
                  ¬   r
                  |
                  →
                 / \\
                p   q
                </pre>
              </div>
              <p className="text-sm">
                El operador principal es la disyunción (∨). Su operando izquierdo es la negación (¬) 
                de la implicación (p → q), y su operando derecho es la variable r.
              </p>
            </div>
          </div>
        </section>
        
        <section>
          <h3 className="text-lg font-semibold mb-2">Proceso de Evaluación</h3>
          <p className="mb-4">
            La evaluación de una expresión mediante un árbol sintáctico sigue un recorrido postorden:
          </p>
          <ol className="list-decimal pl-5 space-y-2 mb-6">
            <li>Evaluar recursivamente el subárbol izquierdo</li>
            <li>Evaluar recursivamente el subárbol derecho</li>
            <li>Aplicar el operador en el nodo actual a los resultados obtenidos</li>
          </ol>
          
          <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
            <h4 className="font-semibold mb-2">Ejemplo de evaluación: p ∧ (q ∨ r) con p = V, q = F, r = V</h4>
            <div className="flex justify-center mt-4 mb-6">
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-gray-50 p-3 rounded border">
                  <pre className="font-mono text-base overflow-visible whitespace-pre">
                    ∧
                   / \\
                  p   ∨
                 |   / \\
                 V  q   r
                    |   |
                    F   V
                  </pre>
                </div>
                <div className="bg-gray-50 p-3 rounded border">
                  <p className="mb-1"><strong>Paso 1:</strong> Evaluamos p = V</p>
                  <p className="mb-1"><strong>Paso 2:</strong> Evaluamos q ∨ r: F ∨ V = V</p>
                  <p className="mb-1"><strong>Paso 3:</strong> Evaluamos p ∧ (q ∨ r): V ∧ V = V</p>
                </div>
              </div>
            </div>
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              <li>Evaluamos p y obtenemos V</li>
              <li>Evaluamos q ∨ r: primero q = F, luego r = V, por lo tanto q ∨ r = V</li>
              <li>Evaluamos el nodo raíz: p ∧ (q ∨ r) = V ∧ V = V</li>
            </ol>
          </div>
        </section>
        
        <section>
          <h3 className="text-lg font-semibold mb-2">Ventajas de los Árboles Sintácticos</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <h4 className="font-semibold mb-2">Ventajas Pedagógicas</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Facilitan la comprensión del orden de evaluación</li>
                <li>Ilustran claramente la estructura de la expresión</li>
                <li>Ayudan a identificar subexpresiones y su valor</li>
                <li>Permiten seguir paso a paso el proceso de evaluación</li>
              </ul>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <h4 className="font-semibold mb-2">Aplicaciones Prácticas</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Implementación de evaluadores de expresiones</li>
                <li>Análisis de equivalencia de fórmulas</li>
                <li>Optimización de expresiones lógicas</li>
                <li>Depuración de errores en fórmulas complejas</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section>
          <h3 className="text-lg font-semibold mb-2">Herramientas para la Visualización</h3>
          <p className="mb-4">
            En el contexto de la enseñanza y aprendizaje de la lógica proposicional, existen diversas 
            herramientas que permiten generar automáticamente árboles sintácticos para cualquier 
            expresión lógica, facilitando así su análisis y comprensión.
          </p>
          
          <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg">
            <p className="font-semibold mb-2">Principales características de estas herramientas:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Generación automática del árbol a partir de una expresión</li>
              <li>Visualización interactiva que permite explorar la estructura</li>
              <li>Evaluación paso a paso con diferentes valores de verdad</li>
              <li>Exportación de los árboles en diversos formatos gráficos</li>
            </ul>
          </div>
        </section>
      </div>
    </TheoryCard>
  );
}

export default SyntaxTreeTheory;
