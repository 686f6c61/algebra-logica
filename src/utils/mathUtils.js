/**
 * =============================================================================
 * ALGEBRA LOGICA - Utilidades Matemáticas
 * =============================================================================
 *
 * @file mathUtils.js
 * @description Funciones matemáticas fundamentales utilizadas en cálculos
 *              de fracciones y operaciones algebraicas.
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
 * - gcd(a, b): Máximo Común Divisor (Greatest Common Divisor)
 * - lcm(a, b): Mínimo Común Múltiplo (Least Common Multiple)
 *
 * =============================================================================
 */

// =============================================================================
// MÁXIMO COMÚN DIVISOR (GCD)
// =============================================================================

/**
 * Calcula el Máximo Común Divisor de dos números usando el algoritmo de Euclides.
 *
 * El algoritmo de Euclides es un método eficiente para calcular el MCD:
 * 1. Si b es 0, el MCD es a
 * 2. Si no, el MCD de (a, b) es igual al MCD de (b, a mod b)
 * 3. Repetir hasta que b sea 0
 *
 * @param {number} a - Primer número entero
 * @param {number} b - Segundo número entero
 * @returns {number} El máximo común divisor de a y b
 *
 * @example
 * gcd(12, 8)   // 4
 * gcd(17, 5)   // 1 (son coprimos)
 * gcd(100, 25) // 25
 * gcd(-12, 8)  // 4 (funciona con negativos)
 *
 * @complexity O(log(min(a, b))) - muy eficiente
 */
export function gcd(a, b) {
  // Trabajar con valores absolutos para manejar números negativos
  a = Math.abs(a);
  b = Math.abs(b);

  // Algoritmo de Euclides iterativo
  while (b) {
    const temp = b;      // Guardar b temporalmente
    b = a % b;           // b se convierte en el residuo de a/b
    a = temp;            // a se convierte en el antiguo b
  }

  // Cuando b es 0, a contiene el MCD
  return a;
}

// =============================================================================
// MÍNIMO COMÚN MÚLTIPLO (LCM)
// =============================================================================

/**
 * Calcula el Mínimo Común Múltiplo de dos números.
 *
 * Utiliza la relación matemática: lcm(a, b) = |a * b| / gcd(a, b)
 *
 * Esta fórmula es eficiente porque aprovecha el GCD ya calculado,
 * evitando la necesidad de factorizar los números.
 *
 * @param {number} a - Primer número entero
 * @param {number} b - Segundo número entero
 * @returns {number} El mínimo común múltiplo de a y b
 *
 * @example
 * lcm(4, 6)   // 12
 * lcm(3, 5)   // 15 (son coprimos, mcm = producto)
 * lcm(12, 8)  // 24
 *
 * @note El resultado siempre es positivo gracias a Math.abs()
 */
export function lcm(a, b) {
  // |a * b| / gcd(a, b)
  // Math.abs asegura resultado positivo
  return Math.abs(a * b) / gcd(a, b);
}
