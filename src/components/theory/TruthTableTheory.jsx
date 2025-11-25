import React from 'react';
import TheoryCard from './TheoryCard';

function TruthTableTheory() {
  return (
    <TheoryCard
      title="Tablas de Verdad"
      icon="table"
    >
      <div className="space-y-4">
        <section>
          <h3 className="text-lg font-semibold mb-2">¿Qué es una tabla de verdad?</h3>
          <p className="text-gray-700">
            Una tabla de verdad es una herramienta que muestra todos los posibles valores de verdad de una expresión
            lógica basándose en todas las combinaciones posibles de los valores de verdad de sus proposiciones componentes.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Construcción de tablas de verdad</h3>
          <ol className="list-decimal list-inside pl-4 text-gray-600 space-y-2">
            <li>Identificar todas las variables proposicionales</li>
            <li>Determinar el número de filas (2^n, donde n es el número de variables)</li>
            <li>Escribir todas las combinaciones posibles de V y F</li>
            <li>Evaluar la expresión paso a paso</li>
          </ol>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Ejemplo completo</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-mono mb-2">Expresión: (p ∧ q) ∨ ¬r</p>
            <table className="min-w-full text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">p</th>
                  <th className="px-4 py-2">q</th>
                  <th className="px-4 py-2">r</th>
                  <th className="px-4 py-2">p ∧ q</th>
                  <th className="px-4 py-2">¬r</th>
                  <th className="px-4 py-2">(p ∧ q) ∨ ¬r</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border px-4 py-2">V</td><td className="border px-4 py-2">V</td><td className="border px-4 py-2">V</td><td className="border px-4 py-2">V</td><td className="border px-4 py-2">F</td><td className="border px-4 py-2">V</td></tr>
                <tr><td className="border px-4 py-2">V</td><td className="border px-4 py-2">V</td><td className="border px-4 py-2">F</td><td className="border px-4 py-2">V</td><td className="border px-4 py-2">V</td><td className="border px-4 py-2">V</td></tr>
                <tr><td className="border px-4 py-2">V</td><td className="border px-4 py-2">F</td><td className="border px-4 py-2">V</td><td className="border px-4 py-2">F</td><td className="border px-4 py-2">F</td><td className="border px-4 py-2">F</td></tr>
                <tr><td className="border px-4 py-2">V</td><td className="border px-4 py-2">F</td><td className="border px-4 py-2">F</td><td className="border px-4 py-2">F</td><td className="border px-4 py-2">V</td><td className="border px-4 py-2">V</td></tr>
                <tr><td className="border px-4 py-2">F</td><td className="border px-4 py-2">V</td><td className="border px-4 py-2">V</td><td className="border px-4 py-2">F</td><td className="border px-4 py-2">F</td><td className="border px-4 py-2">F</td></tr>
                <tr><td className="border px-4 py-2">F</td><td className="border px-4 py-2">V</td><td className="border px-4 py-2">F</td><td className="border px-4 py-2">F</td><td className="border px-4 py-2">V</td><td className="border px-4 py-2">V</td></tr>
                <tr><td className="border px-4 py-2">F</td><td className="border px-4 py-2">F</td><td className="border px-4 py-2">V</td><td className="border px-4 py-2">F</td><td className="border px-4 py-2">F</td><td className="border px-4 py-2">F</td></tr>
                <tr><td className="border px-4 py-2">F</td><td className="border px-4 py-2">F</td><td className="border px-4 py-2">F</td><td className="border px-4 py-2">F</td><td className="border px-4 py-2">V</td><td className="border px-4 py-2">V</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </TheoryCard>
  );
}

export default TruthTableTheory;