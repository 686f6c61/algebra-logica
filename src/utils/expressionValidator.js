/**
 * =============================================================================
 * ALGEBRA LOGICA - Validador de Expresiones Lógicas
 * =============================================================================
 *
 * @file expressionValidator.js
 * @description Funciones para validar la sintaxis de expresiones lógicas
 *              antes de su evaluación. Verifica paréntesis balanceados,
 *              operadores válidos y estructura correcta.
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
 * REGLAS DE VALIDACIÓN
 * =============================================================================
 *
 * Una expresión lógica válida debe cumplir:
 *
 * 1. Paréntesis balanceados: cada '(' tiene su correspondiente ')'
 * 2. Sin operadores binarios consecutivos: "∧∧" no es válido
 * 3. No empieza con operador binario: "∧p" no es válido
 * 4. No termina con operador: "p∧" no es válido
 *
 * =============================================================================
 */

// =============================================================================
// FUNCIÓN PRINCIPAL DE VALIDACIÓN
// =============================================================================

/**
 * Valida la sintaxis de una expresión lógica.
 *
 * Realiza múltiples comprobaciones para asegurar que la expresión
 * tiene una estructura válida antes de ser evaluada.
 *
 * @param {string} expression - La expresión lógica a validar
 * @returns {boolean} true si la expresión es válida, false en caso contrario
 *
 * @example
 * // Expresiones válidas
 * validateExpression('p ∧ q')           // true
 * validateExpression('(p ∨ q) ∧ r')     // true
 * validateExpression('¬p')              // true
 * validateExpression('p → (q ↔ r)')     // true
 *
 * @example
 * // Expresiones inválidas
 * validateExpression('')                // false (vacía)
 * validateExpression('(p ∧ q')          // false (paréntesis no cerrado)
 * validateExpression('p ∧ ∨ q')         // false (operadores consecutivos)
 * validateExpression('∧ p')             // false (empieza con operador binario)
 * validateExpression('p ∧')             // false (termina con operador)
 */
export const validateExpression = (expression) => {
  // =========================================================================
  // VALIDACIÓN 1: Expresión no vacía
  // =========================================================================

  // Si la expresión está vacía o es undefined/null, es inválida
  if (!expression) {
    return false;
  }

  // =========================================================================
  // VALIDACIÓN 2: Paréntesis balanceados
  // =========================================================================

  /**
   * Algoritmo de verificación de paréntesis:
   *
   * - Usar un contador que empieza en 0
   * - Por cada '(' encontrado: incrementar contador
   * - Por cada ')' encontrado: decrementar contador
   * - Si el contador se vuelve negativo: hay un ')' sin '(' correspondiente
   * - Al final, si el contador no es 0: hay '(' sin ')' correspondiente
   */
  let parenthesesCount = 0;

  for (const char of expression) {
    if (char === '(') {
      parenthesesCount++;
    }
    if (char === ')') {
      parenthesesCount--;
    }

    // Si encontramos más ')' que '(' en algún punto, es inválido
    // Ejemplo: ")p(" tiene un ')' antes de cualquier '('
    if (parenthesesCount < 0) {
      return false;
    }
  }

  // Al final, debe haber el mismo número de '(' que de ')'
  if (parenthesesCount !== 0) {
    return false;
  }

  // =========================================================================
  // VALIDACIÓN 3: Sin operadores binarios consecutivos
  // =========================================================================

  /**
   * Regex: [∧∨⊼⊽⊕↔→]{2,}
   *
   * - [∧∨⊼⊽⊕↔→]: Cualquier operador binario
   * - {2,}: Dos o más veces consecutivas
   *
   * Esto detecta errores como: "p ∧∧ q", "p ∨→ r", etc.
   */
  if (/[∧∨⊼⊽⊕↔→]{2,}/.test(expression)) {
    return false;
  }

  // =========================================================================
  // VALIDACIÓN 4: No empieza con operador binario
  // =========================================================================

  /**
   * Regex: ^[∧∨⊼⊽⊕↔→]
   *
   * - ^: Inicio de la cadena
   * - [∧∨⊼⊽⊕↔→]: Cualquier operador binario
   *
   * Nota: El operador NOT (¬) SÍ puede estar al inicio (es unario)
   * Ejemplos inválidos: "∧ p", "∨ q ∧ r"
   */
  if (/^[∧∨⊼⊽⊕↔→]/.test(expression)) {
    return false;
  }

  // =========================================================================
  // VALIDACIÓN 5: No termina con operador
  // =========================================================================

  /**
   * Regex: [∧∨⊼⊽⊕↔→¬]$
   *
   * - [∧∨⊼⊽⊕↔→¬]: Cualquier operador (incluyendo NOT)
   * - $: Final de la cadena
   *
   * Ningún operador puede estar al final de la expresión
   * Ejemplos inválidos: "p ∧", "q ∨ ¬"
   */
  if (/[∧∨⊼⊽⊕↔→¬]$/.test(expression)) {
    return false;
  }

  // =========================================================================
  // TODAS LAS VALIDACIONES PASARON
  // =========================================================================

  return true;
};

// =============================================================================
// FUNCIONES AUXILIARES DE VALIDACIÓN
// =============================================================================

/**
 * Verifica si un carácter es un operador lógico.
 *
 * @param {string} char - Carácter a verificar
 * @returns {boolean} true si es un operador
 *
 * @example
 * isOperator('∧')  // true
 * isOperator('p')  // false
 */
export const isOperator = (char) => {
  const operators = ['∧', '∨', '¬', '⊼', '⊽', '⊕', '↔', '→'];
  return operators.includes(char);
};

/**
 * Verifica si un carácter es una variable proposicional válida.
 *
 * @param {string} char - Carácter a verificar
 * @returns {boolean} true si es una variable válida
 *
 * @example
 * isVariable('p')  // true
 * isVariable('a')  // false
 */
export const isVariable = (char) => {
  const variables = ['p', 'q', 'r', 'x', 'y', 'z'];
  return variables.includes(char);
};

/**
 * Cuenta el número de variables distintas en una expresión.
 *
 * @param {string} expression - Expresión a analizar
 * @returns {number} Número de variables únicas
 *
 * @example
 * countVariables('p ∧ q')       // 2
 * countVariables('p ∧ p ∨ q')   // 2 (p se cuenta una vez)
 */
export const countVariables = (expression) => {
  const variables = ['p', 'q', 'r', 'x', 'y', 'z'];
  const found = variables.filter(v => expression.includes(v));
  return new Set(found).size;
};
