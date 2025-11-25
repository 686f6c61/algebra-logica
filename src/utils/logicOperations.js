/**
 * =============================================================================
 * ALGEBRA LOGICA - Operaciones Lógicas Fundamentales
 * =============================================================================
 *
 * @file logicOperations.js
 * @description Funciones utilitarias para trabajar con expresiones lógicas,
 *              incluyendo extracción de variables y generación de combinaciones.
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
 * FUNCIONES DISPONIBLES
 * =============================================================================
 *
 * - extractVariables(expression): Extrae las variables únicas de una expresión
 * - generateCombinations(variables): Genera todas las combinaciones de valores
 *
 * =============================================================================
 */

// =============================================================================
// EXTRACCIÓN DE VARIABLES
// =============================================================================

/**
 * Extrae las variables únicas presentes en una expresión lógica.
 *
 * Esta función busca las variables proposicionales (p, q, r, x, y, z)
 * en la expresión dada y devuelve un array ordenado de las encontradas.
 *
 * @param {string} expression - La expresión lógica a analizar
 * @returns {string[]} Array ordenado de variables únicas encontradas
 *
 * @example
 * extractVariables('p ∧ q')           // ['p', 'q']
 * extractVariables('p ∨ (q ∧ r)')     // ['p', 'q', 'r']
 * extractVariables('¬p')              // ['p']
 * extractVariables('p ∧ p ∨ q')       // ['p', 'q'] (sin duplicados)
 *
 * @algorithm
 * 1. Define el conjunto de variables válidas
 * 2. Filtra las que están presentes en la expresión
 * 3. Usa Set para eliminar duplicados
 * 4. Ordena alfabéticamente para consistencia
 */
export const extractVariables = (expression) => {
  // Variables proposicionales disponibles en la aplicación
  const variables = ['p', 'q', 'r', 'x', 'y', 'z'];

  // Filtrar solo las variables que aparecen en la expresión
  // Set elimina duplicados automáticamente
  // sort() ordena alfabéticamente para resultados consistentes
  return [...new Set(variables.filter(v => expression.includes(v)))].sort();
};

// =============================================================================
// GENERACIÓN DE COMBINACIONES (TABLA DE VERDAD)
// =============================================================================

/**
 * Genera todas las combinaciones posibles de valores de verdad para
 * un conjunto de variables proposicionales.
 *
 * Para n variables, genera 2^n combinaciones (filas de la tabla de verdad).
 *
 * @param {string[]} variables - Array de variables proposicionales
 * @returns {boolean[][]} Array de combinaciones, cada una es un array de booleanos
 *
 * @example
 * generateCombinations(['p'])
 * // Retorna: [[true], [false]]
 *
 * generateCombinations(['p', 'q'])
 * // Retorna: [[true, true], [true, false], [false, true], [false, false]]
 *
 * generateCombinations(['p', 'q', 'r'])
 * // Retorna 8 combinaciones (2^3)
 *
 * @algorithm
 * La función utiliza operaciones bit a bit para generar las combinaciones:
 *
 * 1. Calcula el número total de filas: 2^n (donde n = número de variables)
 * 2. Para cada fila (0 hasta 2^n - 1):
 *    - Itera sobre cada posición de variable (de derecha a izquierda)
 *    - Usa operación AND bit a bit para determinar si el bit está activo
 *    - Convierte el resultado a booleano con !!
 *
 * Ejemplo para 2 variables (p, q):
 * i=0: 00 → [false, false]
 * i=1: 01 → [false, true]
 * i=2: 10 → [true, false]
 * i=3: 11 → [true, true]
 *
 * @note El orden de las combinaciones sigue el estándar de tablas de verdad:
 *       comenzando con todos los valores en true y terminando en todos false
 *       (aunque el orden real es por valor binario ascendente del índice)
 */
export const generateCombinations = (variables) => {
  // Número de variables en la expresión
  const numVariables = variables.length;

  // Array para almacenar todas las combinaciones
  const combinations = [];

  // Número total de combinaciones: 2^n
  // Math.pow(2, n) calcula 2 elevado a n
  const totalRows = Math.pow(2, numVariables);

  // Generar cada combinación
  for (let i = 0; i < totalRows; i++) {
    // Array para almacenar los valores de esta combinación
    const combination = [];

    // Iterar sobre cada variable (de la más significativa a la menos)
    // j representa la posición del bit (0 = menos significativo)
    for (let j = numVariables - 1; j >= 0; j--) {
      // Determinar el valor de verdad para esta variable en esta fila
      // 1 << j: desplaza 1 a la izquierda j posiciones (crea máscara de bit)
      // i & (1 << j): aplica AND para ver si el bit j está activo en i
      // !!: convierte a booleano (0 → false, cualquier otro → true)
      combination.unshift(!!(i & (1 << j)));
    }

    // Agregar la combinación al array de resultados
    combinations.push(combination);
  }

  return combinations;
};

// =============================================================================
// FUNCIONES AUXILIARES (para uso futuro)
// =============================================================================

/**
 * Crea un objeto que mapea variables a sus valores de verdad.
 *
 * @param {string[]} variables - Array de nombres de variables
 * @param {boolean[]} values - Array de valores correspondientes
 * @returns {Object.<string, boolean>} Objeto con el mapeo variable → valor
 *
 * @example
 * createVariableMap(['p', 'q'], [true, false])
 * // Retorna: { p: true, q: false }
 */
export const createVariableMap = (variables, values) => {
  const map = {};
  variables.forEach((variable, index) => {
    map[variable] = values[index];
  });
  return map;
};
