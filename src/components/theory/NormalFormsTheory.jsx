import React from 'react';
import TheoryCard from './TheoryCard';

function NormalFormsTheory() {
  return (
    <TheoryCard title="Formas Normales">
      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold mb-2">¿Qué son las Formas Normales?</h3>
          <p className="mb-4">
            Las formas normales son representaciones estandarizadas de fórmulas lógicas que facilitan el análisis, 
            comparación y procesamiento. Las dos formas normales principales son:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <h4 className="font-semibold mb-2">Forma Normal Conjuntiva (FNC)</h4>
              <p className="mb-2">Es una conjunción de disyunciones de literales (variables o sus negaciones).</p>
              <p className="mb-2">Estructura: (L₁ ∨ L₂ ∨ ...) ∧ (L₃ ∨ L₄ ∨ ...) ∧ ...</p>
              <div className="mt-2 p-2 bg-white border border-gray-300 rounded">
                <p className="font-mono">(p ∨ q) ∧ (¬p ∨ r)</p>
                <p className="text-sm mt-1">Conjunción de cláusulas disyuntivas</p>
              </div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <h4 className="font-semibold mb-2">Forma Normal Disyuntiva (FND)</h4>
              <p className="mb-2">Es una disyunción de conjunciones de literales.</p>
              <p className="mb-2">Estructura: (L₁ ∧ L₂ ∧ ...) ∨ (L₃ ∧ L₄ ∧ ...) ∨ ...</p>
              <div className="mt-2 p-2 bg-white border border-gray-300 rounded">
                <p className="font-mono">(p ∧ q) ∨ (¬p ∧ r)</p>
                <p className="text-sm mt-1">Disyunción de cláusulas conjuntivas</p>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h3 className="text-lg font-semibold mb-2">Importancia de las Formas Normales</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Aplicaciones en computación:</strong> Las formas normales facilitan la implementación de algoritmos para satisfacibilidad lógica (SAT).</li>
            <li><strong>Diseño de circuitos:</strong> Los circuitos digitales pueden optimizarse mediante formas normales.</li>
            <li><strong>Comparación de fórmulas:</strong> Permiten determinar si dos fórmulas son equivalentes de manera más sistemática.</li>
            <li><strong>Bases de datos:</strong> Las consultas en bases de datos relacionales a menudo se expresan en forma normal conjuntiva.</li>
          </ul>
        </section>
        
        <section>
          <h3 className="text-lg font-semibold mb-2">Proceso de Conversión a Formas Normales</h3>
          
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Pasos para convertir a FNC:</h4>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Eliminar bicondicionales:</strong> Reemplazar p ↔ q por (p → q) ∧ (q → p)</li>
              <li><strong>Eliminar implicaciones:</strong> Reemplazar p → q por ¬p ∨ q</li>
              <li><strong>Aplicar leyes de De Morgan:</strong> Mover negaciones hacia adentro usando ¬(p ∧ q) ≡ ¬p ∨ ¬q y ¬(p ∨ q) ≡ ¬p ∧ ¬q</li>
              <li><strong>Aplicar distributividad:</strong> Distribuir ∨ sobre ∧ usando p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r)</li>
            </ol>
          </div>
          
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Pasos para convertir a FND:</h4>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Eliminar bicondicionales e implicaciones:</strong> Igual que para FNC</li>
              <li><strong>Aplicar leyes de De Morgan:</strong> Mover negaciones hacia adentro</li>
              <li><strong>Aplicar distributividad:</strong> Distribuir ∧ sobre ∨ usando p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)</li>
            </ol>
          </div>
        </section>
        
        <section>
          <h3 className="text-lg font-semibold mb-2">Ejemplo de Conversión</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Paso</th>
                  <th className="border border-gray-300 px-4 py-2">Operación</th>
                  <th className="border border-gray-300 px-4 py-2">Resultado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Expresión original</td>
                  <td className="border border-gray-300 px-4 py-2">-</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">p → (q ∨ r)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Eliminar implicación</td>
                  <td className="border border-gray-300 px-4 py-2">p → q ≡ ¬p ∨ q</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">¬p ∨ (q ∨ r)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Simplificar</td>
                  <td className="border border-gray-300 px-4 py-2">Asociatividad</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">¬p ∨ q ∨ r</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">FNC</td>
                  <td className="border border-gray-300 px-4 py-2">Ya es una sola cláusula disyuntiva</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">(¬p ∨ q ∨ r)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg">
            <p className="font-semibold mb-2">¿Cómo usar el convertidor de formas normales?</p>
            <p>
              En la sección "Formas Normales" de la aplicación, puedes introducir cualquier expresión lógica 
              y convertirla automáticamente a FNC o FND, visualizando cada paso del proceso.
            </p>
          </div>
        </section>
      </div>
    </TheoryCard>
  );
}

export default NormalFormsTheory;
