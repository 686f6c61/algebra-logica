import React from 'react';
import TheoryCard from './TheoryCard';

function LogicalPropertiesTheory() {
  return (
    <TheoryCard title="Análisis de Propiedades Lógicas">
      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold mb-2">Propiedades fundamentales de las fórmulas lógicas</h3>
          <p className="mb-4">
            Las expresiones de la lógica proposicional pueden clasificarse según sus valores de verdad
            en todas las posibles asignaciones de valores a sus variables.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <h4 className="font-semibold mb-2">Tautología</h4>
              <p>Es una expresión que siempre tiene valor verdadero, sin importar qué valores tomen sus variables.</p>
              <div className="mt-2 p-2 bg-white border border-gray-300 rounded">
                <p className="font-mono">p ∨ ¬p</p>
                <p className="text-sm mt-1">El principio del tercero excluido</p>
              </div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <h4 className="font-semibold mb-2">Contradicción</h4>
              <p>Es una expresión que siempre tiene valor falso, sin importar qué valores tomen sus variables.</p>
              <div className="mt-2 p-2 bg-white border border-gray-300 rounded">
                <p className="font-mono">p ∧ ¬p</p>
                <p className="text-sm mt-1">El principio de no contradicción</p>
              </div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <h4 className="font-semibold mb-2">Contingencia</h4>
              <p>Es una expresión que puede tomar valores verdaderos o falsos dependiendo de los valores de sus variables.</p>
              <div className="mt-2 p-2 bg-white border border-gray-300 rounded">
                <p className="font-mono">p ∨ q</p>
                <p className="text-sm mt-1">Tiene diferentes valores según p y q</p>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h3 className="text-lg font-semibold mb-2">Equivalencia Lógica</h3>
          <p className="mb-4">
            Dos fórmulas son lógicamente equivalentes si tienen el mismo valor de verdad en todas las posibles 
            asignaciones de valores a sus variables. La equivalencia lógica se denota con el símbolo "≡".
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Ley lógica</th>
                  <th className="border border-gray-300 px-4 py-2">Equivalencia</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Doble negación</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">¬¬p ≡ p</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Leyes de De Morgan</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">¬(p ∧ q) ≡ ¬p ∨ ¬q</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Leyes de De Morgan</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">¬(p ∨ q) ≡ ¬p ∧ ¬q</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Implicación material</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">p → q ≡ ¬p ∨ q</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Ley de contraposición</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">p → q ≡ ¬q → ¬p</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        <section>
          <h3 className="text-lg font-semibold mb-2">Aplicación de las Propiedades Lógicas</h3>
          <p className="mb-4">
            El análisis de propiedades lógicas tiene numerosas aplicaciones prácticas:
          </p>
          
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Verificación de argumentos:</strong> Determinar si un argumento es válido comprobando si la implicación entre premisas y conclusión es una tautología.</li>
            <li><strong>Simplificación de circuitos:</strong> Las equivalencias lógicas permiten simplificar circuitos electrónicos.</li>
            <li><strong>Diseño de algoritmos:</strong> Identificar tautologías y contradicciones puede ayudar a optimizar algoritmos.</li>
            <li><strong>Detección de paradojas:</strong> Las contradicciones pueden indicar la presencia de paradojas en un sistema lógico.</li>
          </ul>
          
          <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
            <p className="font-semibold mb-2">¿Cómo usar el analizador de propiedades?</p>
            <p>
              En la sección "Análisis de propiedades" de esta aplicación, puedes introducir expresiones lógicas 
              y determinar automáticamente si son tautologías, contradicciones o contingencias, así como 
              verificar si dos expresiones son lógicamente equivalentes.
            </p>
          </div>
        </section>
      </div>
    </TheoryCard>
  );
}

export default LogicalPropertiesTheory;
