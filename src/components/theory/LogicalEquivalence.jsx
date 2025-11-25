import React from 'react';
import TheoryCard from './TheoryCard';

function LogicalEquivalence() {
  const equivalences = [
    {
      name: 'Leyes de De Morgan',
      rules: [
        '¬(p ∧ q) ≡ ¬p ∨ ¬q',
        '¬(p ∨ q) ≡ ¬p ∧ ¬q'
      ]
    },
    {
      name: 'Leyes de Idempotencia',
      rules: [
        'p ∧ p ≡ p',
        'p ∨ p ≡ p'
      ]
    },
    {
      name: 'Leyes Conmutativas',
      rules: [
        'p ∧ q ≡ q ∧ p',
        'p ∨ q ≡ q ∨ p'
      ]
    },
    {
      name: 'Leyes Asociativas',
      rules: [
        '(p ∧ q) ∧ r ≡ p ∧ (q ∧ r)',
        '(p ∨ q) ∨ r ≡ p ∨ (q ∨ r)'
      ]
    },
    {
      name: 'Leyes Distributivas',
      rules: [
        'p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)',
        'p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r)'
      ]
    }
  ];

  return (
    <TheoryCard
      title="Equivalencias Lógicas"
      icon="equals"
    >
      <div className="space-y-6">
        <p className="text-gray-700">
          Las equivalencias lógicas son expresiones que tienen el mismo valor de verdad para todas las posibles
          combinaciones de valores de sus variables proposicionales.
        </p>

        {equivalences.map((eq) => (
          <div key={eq.name} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{eq.name}</h3>
            <ul className="space-y-2">
              {eq.rules.map((rule, index) => (
                <li key={index} className="font-mono text-gray-700">{rule}</li>
              ))}
            </ul>
          </div>
        ))}

        <section>
          <h3 className="text-lg font-semibold mb-2">Importancia</h3>
          <ul className="list-disc list-inside pl-4 text-gray-600 space-y-2">
            <li>Simplificación de expresiones lógicas</li>
            <li>Demostración de teoremas</li>
            <li>Optimización de circuitos digitales</li>
            <li>Verificación de argumentos lógicos</li>
          </ul>
        </section>
      </div>
    </TheoryCard>
  );
}

export default LogicalEquivalence;