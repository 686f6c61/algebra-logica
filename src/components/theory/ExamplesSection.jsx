import React from 'react';
import { Link } from 'react-router-dom';
import TheoryCard from './TheoryCard';
import { FaExternalLinkAlt } from 'react-icons/fa';

function ExamplesSection() {
  // Ejemplos y ejercicios organizados por categorías
  const sections = [
    {
      title: "Tablas de Verdad",
      description: "Evalúa expresiones lógicas y genera sus tablas de verdad completas",
      linkTo: "/truth-tables",
      examples: [
        {
          title: 'Ejercicio 1: Evaluar una implicación',
          problem: 'Genera la tabla de verdad para la expresión p → q',
          steps: [
            'Identifica las variables: p y q',
            'Genera las combinaciones posibles de valores de verdad',
            'Evalúa la expresión para cada combinación',
            'Recuerda que la implicación es falsa solo cuando el antecedente es verdadero y el consecuente falso'
          ],
          expression: 'p → q'
        },
        {
          title: 'Ejercicio 2: Expresión compuesta',
          problem: 'Crea la tabla de verdad para (p ∧ q) → r',
          steps: [
            'Primero evalúa la subexpresión (p ∧ q)',
            'Luego evalúa la implicación con el resultado anterior y r',
            'Identifica en qué casos la expresión completa es verdadera'
          ],
          expression: '(p ∧ q) → r'
        }
      ]
    },
    {
      title: "Análisis de Propiedades",
      description: "Determina si una expresión es una tautología, contradicción o contingencia",
      linkTo: "/properties-analysis",
      examples: [
        {
          title: 'Ejercicio 1: Identificar una tautología',
          problem: 'Determina si p ∨ ¬p es una tautología',
          steps: [
            'Genera la tabla de verdad completa',
            'Verifica si todas las filas de la evaluación final son V',
            'Si es así, la expresión es una tautología'
          ],
          expression: 'p ∨ ¬p'
        },
        {
          title: 'Ejercicio 2: Verificar equivalencia lógica',
          problem: 'Comprueba si ¬(p ∧ q) es equivalente a ¬p ∨ ¬q',
          steps: [
            'Genera las tablas de verdad para ambas expresiones',
            'Compara los resultados finales columna por columna',
            'Si son idénticos, las expresiones son equivalentes'
          ],
          expression: '¬(p ∧ q) ≡ ¬p ∨ ¬q'
        }
      ]
    },
    {
      title: "Formas Normales",
      description: "Convierte expresiones a Forma Normal Conjuntiva (FNC) y Forma Normal Disyuntiva (FND)",
      linkTo: "/normal-forms",
      examples: [
        {
          title: 'Ejercicio 1: Conversión a FNC',
          problem: 'Convierte p → q a su Forma Normal Conjuntiva',
          steps: [
            'Reescribe la implicación como: ¬p ∨ q',
            'Verifica si ya está en FNC (conjunción de disyunciones)',
            'En este caso, ¬p ∨ q ya está en FNC como una única cláusula'
          ],
          expression: 'p → q ≡ ¬p ∨ q'
        },
        {
          title: 'Ejercicio 2: Conversión a FND',
          problem: 'Convierte ¬(p ∧ q) a su Forma Normal Disyuntiva',
          steps: [
            'Aplica las leyes de De Morgan: ¬(p ∧ q) ≡ ¬p ∨ ¬q',
            'Verifica si está en FND (disyunción de conjunciones)',
            'En este caso, debemos reescribir como: (¬p ∧ q) ∨ (¬p ∧ ¬q) ∨ (p ∧ ¬q)'
          ],
          expression: '¬(p ∧ q) ≡ ¬p ∨ ¬q'
        }
      ]
    },
    {
      title: "Árboles de Análisis Sintáctico",
      description: "Visualiza la estructura jerárquica de operadores y subexpresiones de una fórmula",
      linkTo: "/syntax-trees",
      examples: [
        {
          title: 'Ejercicio 1: Construir un árbol sintáctico',
          problem: 'Genera el árbol sintáctico para p ∧ (q ∨ r)',
          steps: [
            'Identifica el operador principal: ∧',
            'Coloca las subexpresiones como hijos: p y (q ∨ r)',
            'Descompón recursivamente cada subexpresión',
            'Para (q ∨ r), el operador es ∨ con hijos q y r'
          ],
          expression: 'p ∧ (q ∨ r)'
        },
        {
          title: 'Ejercicio 2: Árbol para una expresión compleja',
          problem: 'Construye el árbol para (p → q) ∧ (q → r)',
          steps: [
            'Identifica el operador principal: ∧',
            'Descompón las subexpresiones (p → q) y (q → r)',
            'Continúa el proceso hasta llegar a las variables'
          ],
          expression: '(p → q) ∧ (q → r)'
        }
      ]
    },
    {
      title: "Circuitos Lógicos",
      description: "Representa expresiones como circuitos y simula su comportamiento con diferentes entradas",
      linkTo: "/logic-circuits",
      examples: [
        {
          title: 'Ejercicio 1: Circuito para una conjunción',
          problem: 'Diseña un circuito lógico para p ∧ q',
          steps: [
            'Utiliza una compuerta AND con dos entradas: p y q',
            'La salida de la compuerta representa el resultado de la expresión',
            'Prueba el circuito con diferentes combinaciones de valores'
          ],
          expression: 'p ∧ q'
        },
        {
          title: 'Ejercicio 2: Circuito para una expresión compuesta',
          problem: 'Construye un circuito para p ∧ ¬q',
          steps: [
            'Utiliza una compuerta NOT para negar q',
            'Conecta p y la salida de NOT a una compuerta AND',
            'Verifica el funcionamiento con todas las combinaciones de entrada'
          ],
          expression: 'p ∧ ¬q'
        }
      ]
    }
  ];

  return (
    <TheoryCard
      title="Ejemplos y Ejercicios Prácticos"
      icon="examples"
    >
      <div className="space-y-8">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{section.title}</h3>
              <Link 
                to={section.linkTo} 
                className="flex items-center px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                <span>Ir a la herramienta</span>
                <FaExternalLinkAlt className="ml-2 text-sm" />
              </Link>
            </div>
            
            <p className="text-gray-700 mb-4">{section.description}</p>
            
            <div className="space-y-4">
              {section.examples.map((example, exampleIndex) => (
                <div key={exampleIndex} className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="text-lg font-semibold mb-2">{example.title}</h4>
                  <p className="text-gray-700 mb-3">{example.problem}</p>
                  
                  <div className="mb-3">
                    <h5 className="font-medium mb-2">Pasos a seguir:</h5>
                    <ol className="list-decimal list-inside pl-4 space-y-1">
                      {example.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="text-gray-600">{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="font-mono p-2 bg-gray-50 rounded mb-3">
                    Expresión: {example.expression}
                  </div>

                  <Link 
                    to={section.linkTo} 
                    className="inline-block mt-2 text-gray-700 hover:text-gray-900 underline"
                  >
                    Probar en la herramienta
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </TheoryCard>
  );
}

export default ExamplesSection;