import React from 'react';
import TheoryCard from './TheoryCard';

function PropositionalBasics() {
  return (
    <TheoryCard
      title="Fundamentos de Lógica Proposicional"
      icon="basics"
    >
      <div className="space-y-4">
        <section>
          <h3 className="text-lg font-semibold mb-2">¿Qué es una proposición?</h3>
          <p className="text-gray-700">
            Una proposición es una oración declarativa que puede ser verdadera o falsa, pero no ambas simultáneamente.
          </p>
          <div className="mt-2 space-y-2">
            <h4 className="font-medium">Ejemplos:</h4>
            <ul className="list-disc list-inside pl-4 text-gray-600">
              <li>"La Tierra es redonda" (Verdadero)</li>
              <li>"2 + 2 = 5" (Falso)</li>
              <li>"Madrid es la capital de España" (Verdadero)</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Características principales</h3>
          <ul className="list-disc list-inside pl-4 text-gray-600 space-y-2">
            <li>Debe tener un valor de verdad definido (V o F)</li>
            <li>No puede ser ambigua</li>
            <li>No puede ser una pregunta</li>
            <li>No puede ser una orden</li>
            <li>No puede ser una exclamación</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Variables proposicionales</h3>
          <p className="text-gray-700">
            Las variables proposicionales (p, q, r, ...) son símbolos que representan proposiciones simples y pueden
            tomar valores de verdadero (V) o falso (F).
          </p>
        </section>
      </div>
    </TheoryCard>
  );
}

export default PropositionalBasics;