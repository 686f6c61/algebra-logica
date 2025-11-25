/**
 * =============================================================================
 * ALGEBRA LOGICA - Constantes de la Aplicación
 * =============================================================================
 *
 * @file constants.js
 * @description Define las constantes globales utilizadas en toda la aplicación,
 *              incluyendo operadores lógicos, variables y símbolos de agrupación.
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
 * TABLA DE OPERADORES LÓGICOS
 * =============================================================================
 *
 * | Símbolo | Nombre      | Operación                                        |
 * |---------|-------------|--------------------------------------------------|
 * | ∧       | AND         | Conjunción (verdadero si ambos son verdaderos)   |
 * | ∨       | OR          | Disyunción (verdadero si al menos uno es verdadero)|
 * | ¬       | NOT         | Negación (invierte el valor de verdad)           |
 * | ⊼       | NAND        | Negación del AND                                 |
 * | ⊽       | NOR         | Negación del OR                                  |
 * | ⊕       | XOR         | Disyunción exclusiva (verdadero si son diferentes)|
 * | ↔       | XNOR        | Bicondicional (verdadero si son iguales)         |
 * | →       | IMPLICATION | Implicación material                             |
 *
 * =============================================================================
 */

// =============================================================================
// OPERADORES LÓGICOS
// =============================================================================

/**
 * Diccionario de operadores lógicos soportados por la aplicación.
 *
 * Cada operador incluye:
 * - `name`: Nombre del operador en inglés (para uso interno)
 * - `description`: Descripción en español de su comportamiento
 *
 * @constant {Object.<string, {name: string, description: string}>}
 *
 * @example
 * // Acceder a la información de un operador
 * console.log(OPERATORS['∧'].name);        // 'AND'
 * console.log(OPERATORS['∧'].description); // 'Verdadero solo si ambos...'
 */
export const OPERATORS = {
  // ---------------------------------------------------------------------------
  // Operadores básicos
  // ---------------------------------------------------------------------------

  /**
   * AND (Conjunción) - ∧
   * Tabla de verdad:
   * | p | q | p ∧ q |
   * |---|---|-------|
   * | V | V |   V   |
   * | V | F |   F   |
   * | F | V |   F   |
   * | F | F |   F   |
   */
  '∧': {
    name: 'AND',
    description: 'Verdadero solo si ambos operandos son verdaderos'
  },

  /**
   * OR (Disyunción) - ∨
   * Tabla de verdad:
   * | p | q | p ∨ q |
   * |---|---|-------|
   * | V | V |   V   |
   * | V | F |   V   |
   * | F | V |   V   |
   * | F | F |   F   |
   */
  '∨': {
    name: 'OR',
    description: 'Verdadero si al menos un operando es verdadero'
  },

  /**
   * NOT (Negación) - ¬
   * Tabla de verdad:
   * | p | ¬p |
   * |---|----|
   * | V |  F |
   * | F |  V |
   */
  '¬': {
    name: 'NOT',
    description: 'Invierte el valor de verdad'
  },

  // ---------------------------------------------------------------------------
  // Operadores derivados
  // ---------------------------------------------------------------------------

  /**
   * NAND (Negación del AND) - ⊼
   * Equivalente a: ¬(p ∧ q)
   * Nota: Es funcionalmente completo (puede expresar cualquier función booleana)
   */
  '⊼': {
    name: 'NAND',
    description: 'Negación del AND'
  },

  /**
   * NOR (Negación del OR) - ⊽
   * Equivalente a: ¬(p ∨ q)
   * Nota: También es funcionalmente completo
   */
  '⊽': {
    name: 'NOR',
    description: 'Negación del OR'
  },

  /**
   * XOR (Disyunción exclusiva) - ⊕
   * Tabla de verdad:
   * | p | q | p ⊕ q |
   * |---|---|-------|
   * | V | V |   F   |
   * | V | F |   V   |
   * | F | V |   V   |
   * | F | F |   F   |
   */
  '⊕': {
    name: 'XOR',
    description: 'Verdadero si los operandos son diferentes'
  },

  /**
   * XNOR (Bicondicional / Equivalencia) - ↔
   * Equivalente a: (p → q) ∧ (q → p)
   * También conocido como "si y solo si"
   */
  '↔': {
    name: 'XNOR',
    description: 'Verdadero si los operandos son iguales'
  },

  /**
   * IMPLICATION (Implicación material) - →
   * Tabla de verdad:
   * | p | q | p → q |
   * |---|---|-------|
   * | V | V |   V   |
   * | V | F |   F   |
   * | F | V |   V   |
   * | F | F |   V   |
   *
   * Nota: Solo es falsa cuando el antecedente es verdadero
   * y el consecuente es falso.
   */
  '→': {
    name: 'IMPLICATION',
    description: 'Falso solo si el antecedente es verdadero y el consecuente falso'
  }
};

// =============================================================================
// VARIABLES PROPOSICIONALES
// =============================================================================

/**
 * Lista de variables proposicionales disponibles en la aplicación.
 *
 * En lógica proposicional, las variables representan proposiciones
 * que pueden ser verdaderas (V) o falsas (F).
 *
 * Por convención:
 * - p, q, r: Variables principales (más comunes en ejemplos)
 * - x, y, z: Variables adicionales para expresiones más complejas
 *
 * @constant {string[]}
 *
 * @example
 * // Usar las variables en una expresión
 * const expression = `${VARIABLES[0]} ∧ ${VARIABLES[1]}`; // "p ∧ q"
 */
export const VARIABLES = ['p', 'q', 'r', 'x', 'y', 'z'];

// =============================================================================
// SÍMBOLOS DE AGRUPACIÓN (PARÉNTESIS)
// =============================================================================

/**
 * Símbolos de paréntesis para agrupar subexpresiones.
 *
 * Los paréntesis permiten:
 * - Modificar el orden de evaluación (precedencia)
 * - Agrupar operaciones para mayor claridad
 * - Formar subexpresiones complejas
 *
 * @constant {Array.<{symbol: string, description: string}>}
 *
 * @example
 * // Expresión sin paréntesis: p ∧ q ∨ r (se evalúa como (p ∧ q) ∨ r)
 * // Expresión con paréntesis: p ∧ (q ∨ r) (primero q ∨ r, luego AND con p)
 */
export const PARENTHESES = [
  {
    symbol: '(',
    description: 'Abre un grupo de operaciones'
  },
  {
    symbol: ')',
    description: 'Cierra un grupo de operaciones'
  }
];
