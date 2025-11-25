import React from 'react';
import TheoryCard from './TheoryCard';

function LogicalOperators() {
  const operators = [
    {
      symbol: '∧',
      name: 'Conjunción (AND)',
      description: 'Verdadero solo si ambas proposiciones son verdaderas',
      example: 'p ∧ q',
      truthTable: [
        ['p', 'q', 'p ∧ q'],
        ['V', 'V', 'V'],
        ['V', 'F', 'F'],
        ['F', 'V', 'F'],
        ['F', 'F', 'F']
      ]
    },
    {
      symbol: '∨',
      name: 'Disyunción (OR)',
      description: 'Verdadero si al menos una proposición es verdadera',
      example: 'p ∨ q',
      truthTable: [
        ['p', 'q', 'p ∨ q'],
        ['V', 'V', 'V'],
        ['V', 'F', 'V'],
        ['F', 'V', 'V'],
        ['F', 'F', 'F']
      ]
    },
    {
      symbol: '¬',
      name: 'Negación (NOT)',
      description: 'Invierte el valor de verdad de la proposición',
      example: '¬p',
      truthTable: [
        ['p', '¬p'],
        ['V', 'F'],
        ['F', 'V']
      ]
    },
    {
      symbol: '→',
      name: 'Implicación',
      description: 'Falso solo si el antecedente es verdadero y el consecuente falso',
      example: 'p → q',
      truthTable: [
        ['p', 'q', 'p → q'],
        ['V', 'V', 'V'],
        ['V', 'F', 'F'],
        ['F', 'V', 'V'],
        ['F', 'F', 'V']
      ]
    }
  ];

  return (
    <TheoryCard
      title="Operadores Lógicos"
      icon="operators"
    >
      <div className="space-y-6">
        {operators.map((op) => (
          <div key={op.symbol} className="border-b pb-4 last:border-b-0">
            <h3 className="text-lg font-semibold mb-2">
              {op.name} ({op.symbol})
            </h3>
            <p className="text-gray-700 mb-3">{op.description}</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-mono mb-2">Ejemplo: {op.example}</p>
              <table className="min-w-[200px] text-center">
                <thead className="bg-gray-100">
                  <tr>
                    {op.truthTable[0].map((header, i) => (
                      <th key={i} className="px-4 py-2">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {op.truthTable.slice(1).map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j} className="px-4 py-2 border">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </TheoryCard>
  );
}

export default LogicalOperators;