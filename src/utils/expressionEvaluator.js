/**
 * =============================================================================
 * ALGEBRA LOGICA - Evaluador de Expresiones Lógicas
 * =============================================================================
 *
 * @file expressionEvaluator.js
 * @description Motor de evaluación para expresiones de lógica proposicional.
 *              Soporta todos los operadores lógicos estándar y permite
 *              obtener el resultado paso a paso.
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
 * OPERADORES SOPORTADOS
 * =============================================================================
 *
 * | Símbolo | Operación    | Precedencia |
 * |---------|--------------|-------------|
 * | ¬       | NOT          | 1 (mayor)   |
 * | ∧       | AND          | 2           |
 * | ∨       | OR           | 3           |
 * | ⊼       | NAND         | 4           |
 * | ⊽       | NOR          | 5           |
 * | ⊕       | XOR          | 6           |
 * | ↔       | XNOR         | 7           |
 * | →       | IMPLICATION  | 8 (menor)   |
 *
 * =============================================================================
 * ALGORITMO DE EVALUACIÓN
 * =============================================================================
 *
 * 1. Sustituir variables por valores (0 o 1)
 * 2. Evaluar paréntesis de dentro hacia fuera
 * 3. Evaluar operadores por precedencia:
 *    - Primero: NOT (¬)
 *    - Luego: Operadores binarios en orden
 * 4. Retornar resultado final como booleano
 *
 * =============================================================================
 */

// =============================================================================
// DEFINICIÓN DE OPERADORES
// =============================================================================

/**
 * Mapa de operadores lógicos con sus funciones de evaluación.
 *
 * Cada operador es una función que recibe uno o dos operandos booleanos
 * y retorna el resultado de la operación.
 *
 * @constant {Object.<string, Function>}
 */
const operators = {
  // ---------------------------------------------------------------------------
  // Operador unario (un solo operando)
  // ---------------------------------------------------------------------------

  /**
   * NOT (Negación): Invierte el valor de verdad
   * @param {boolean} a - Operando
   * @returns {boolean} La negación de a
   */
  '¬': (a) => !a,

  // ---------------------------------------------------------------------------
  // Operadores binarios (dos operandos)
  // ---------------------------------------------------------------------------

  /**
   * AND (Conjunción): Verdadero solo si ambos son verdaderos
   * @param {boolean} a - Primer operando
   * @param {boolean} b - Segundo operando
   * @returns {boolean} a AND b
   */
  '∧': (a, b) => a && b,

  /**
   * OR (Disyunción): Verdadero si al menos uno es verdadero
   * @param {boolean} a - Primer operando
   * @param {boolean} b - Segundo operando
   * @returns {boolean} a OR b
   */
  '∨': (a, b) => a || b,

  /**
   * NAND: Negación del AND
   * @param {boolean} a - Primer operando
   * @param {boolean} b - Segundo operando
   * @returns {boolean} NOT(a AND b)
   */
  '⊼': (a, b) => !(a && b),

  /**
   * NOR: Negación del OR
   * @param {boolean} a - Primer operando
   * @param {boolean} b - Segundo operando
   * @returns {boolean} NOT(a OR b)
   */
  '⊽': (a, b) => !(a || b),

  /**
   * XOR (Disyunción exclusiva): Verdadero si son diferentes
   * @param {boolean} a - Primer operando
   * @param {boolean} b - Segundo operando
   * @returns {boolean} a XOR b
   */
  '⊕': (a, b) => a !== b,

  /**
   * XNOR (Bicondicional): Verdadero si son iguales
   * @param {boolean} a - Primer operando
   * @param {boolean} b - Segundo operando
   * @returns {boolean} a XNOR b (equivalencia)
   */
  '↔': (a, b) => a === b,

  /**
   * IMPLICATION (Implicación material): p → q equivale a ¬p ∨ q
   * Solo es falso cuando p es verdadero y q es falso
   * @param {boolean} a - Antecedente
   * @param {boolean} b - Consecuente
   * @returns {boolean} a → b
   */
  '→': (a, b) => !a || b
};

// =============================================================================
// EVALUACIÓN DE SUBEXPRESIONES
// =============================================================================

/**
 * Evalúa una subexpresión sin paréntesis.
 *
 * Esta función procesa una expresión que solo contiene operadores y
 * valores (0 o 1), evaluándolos según la precedencia de operadores.
 *
 * @param {string} expr - Expresión a evaluar (ej: "1∧0∨1")
 * @param {Array|null} steps - Array donde registrar los pasos (opcional)
 * @returns {boolean} Resultado de la evaluación
 *
 * @example
 * evaluateSubExpression("1∧0")  // false
 * evaluateSubExpression("¬0")   // true
 * evaluateSubExpression("1∨0")  // true
 */
const evaluateSubExpression = (expr, steps = null) => {
  let result = expr;

  // =========================================================================
  // PASO 1: Evaluar operador NOT (¬) - Mayor precedencia
  // =========================================================================

  // Buscar y reemplazar todas las negaciones
  // El patrón ¬[01] encuentra negación seguida de un valor
  while (result.includes('¬')) {
    const prevResult = result;

    result = result.replace(/¬([01])/g, (match, value) => {
      // Convertir el carácter '0' o '1' a booleano
      const val = value === '1';

      // Aplicar la negación
      const res = operators['¬'](val);

      // Registrar el paso si se está haciendo seguimiento
      if (steps) {
        steps.push({
          operation: match,
          description: `¬${val ? 'V' : 'F'} = ${res ? 'V' : 'F'}`,
          result: res ? '1' : '0'
        });
      }

      // Retornar el resultado como '0' o '1'
      return res ? '1' : '0';
    });

    // Prevenir bucle infinito si no hubo cambios
    if (prevResult === result) break;
  }

  // =========================================================================
  // PASO 2: Evaluar operadores binarios por precedencia
  // =========================================================================

  // Orden de evaluación de operadores (de mayor a menor precedencia)
  const operatorOrder = ['∧', '∨', '⊼', '⊽', '⊕', '↔', '→'];

  // Nombres legibles para mostrar en los pasos
  const operatorNames = {
    '∧': 'AND',
    '∨': 'OR',
    '⊼': 'NAND',
    '⊽': 'NOR',
    '⊕': 'XOR',
    '↔': 'BICONDICIONAL',
    '→': 'IMPLICACIÓN'
  };

  // Evaluar cada operador en orden de precedencia
  for (const operator of operatorOrder) {
    // Crear expresión regular para buscar el patrón: valor-operador-valor
    // El \\ antes del operador es necesario porque algunos son caracteres especiales
    const regex = new RegExp(`([01])\\${operator}([01])`, 'g');

    // Evaluar todas las ocurrencias de este operador
    while (result.match(regex)) {
      const prevResult = result;

      result = result.replace(regex, (match, a, b) => {
        // Convertir caracteres a booleanos
        const valA = a === '1';
        const valB = b === '1';

        // Aplicar el operador
        const res = operators[operator](valA, valB);

        // Registrar el paso si se está haciendo seguimiento
        if (steps) {
          steps.push({
            operation: match,
            description: `${valA ? 'V' : 'F'} ${operator} ${valB ? 'V' : 'F'} = ${res ? 'V' : 'F'} (${operatorNames[operator]})`,
            result: res ? '1' : '0'
          });
        }

        // Retornar resultado
        return res ? '1' : '0';
      });

      // Prevenir bucle infinito
      if (prevResult === result) break;
    }
  }

  // Retornar el resultado final como booleano
  return result === '1';
};

// =============================================================================
// FUNCIÓN PRINCIPAL DE EVALUACIÓN
// =============================================================================

/**
 * Evalúa una expresión lógica completa con valores de variables dados.
 *
 * Esta es la función principal que debe usarse para evaluar expresiones.
 * Soporta paréntesis anidados y todos los operadores lógicos.
 *
 * @param {string} expression - Expresión lógica a evaluar (ej: "p ∧ (q ∨ r)")
 * @param {Object.<string, boolean>} values - Valores de las variables
 * @param {boolean} [includeSteps=false] - Si true, incluye pasos detallados
 * @returns {{result: boolean, steps: Array, substitutionSteps?: Array, expression?: string}}
 *
 * @example
 * // Evaluación simple
 * evaluateExpression('p ∧ q', { p: true, q: false })
 * // { result: false, steps: [] }
 *
 * @example
 * // Evaluación con pasos
 * evaluateExpression('p ∧ q', { p: true, q: true }, true)
 * // { result: true, steps: [...], substitutionSteps: [...], expression: 'p ∧ q' }
 *
 * @throws {Error} Si la expresión contiene caracteres no válidos
 */
export const evaluateExpression = (expression, values, includeSteps = false) => {
  // =========================================================================
  // VALIDACIÓN DE ENTRADA
  // =========================================================================

  // Si no hay expresión, retornar resultado falso
  if (!expression) {
    return { result: false, steps: [] };
  }

  // Variable de trabajo para ir transformando la expresión
  let result = expression;

  // Arrays para almacenar los pasos (solo si se solicitan)
  const steps = includeSteps ? [] : null;
  const substitutionSteps = includeSteps ? [] : null;

  // =========================================================================
  // PASO 1: Registrar expresión original
  // =========================================================================

  if (includeSteps) {
    substitutionSteps.push({
      operation: 'Expresión original',
      description: expression,
      result: expression
    });
  }

  // =========================================================================
  // PASO 2: Sustituir variables por valores (0 o 1)
  // =========================================================================

  // Iterar sobre cada variable y su valor
  Object.entries(values).forEach(([variable, value]) => {
    // Crear regex para buscar la variable como palabra completa
    // \b asegura que no coincida con partes de otras palabras
    const regex = new RegExp(`\\b${variable}\\b`, 'g');

    const oldResult = result;

    // Reemplazar variable por '1' (verdadero) o '0' (falso)
    result = result.replace(regex, value ? '1' : '0');

    // Registrar el paso de sustitución
    if (includeSteps && oldResult !== result) {
      substitutionSteps.push({
        operation: `Sustitución: ${variable}`,
        description: `${variable} = ${value ? 'V' : 'F'}`,
        result: result
      });
    }
  });

  // =========================================================================
  // PASO 3: Registrar expresión con valores sustituidos
  // =========================================================================

  if (includeSteps) {
    steps.push({
      operation: 'Sustitución de variables',
      description: `Expresión con valores: ${result}`,
      result: result
    });
  }

  // =========================================================================
  // PASO 4: Evaluar paréntesis (de dentro hacia fuera)
  // =========================================================================

  // Mientras haya paréntesis en la expresión
  while (result.includes('(')) {
    const oldResult = result;

    // Buscar paréntesis más internos: (contenido-sin-paréntesis)
    // [^()]+ significa "uno o más caracteres que no sean paréntesis"
    result = result.replace(/\(([^()]+)\)/g, (match, subExpr) => {
      // Array para almacenar pasos de esta subexpresión
      const subSteps = includeSteps ? [] : null;

      // Evaluar el contenido del paréntesis
      const subResult = evaluateSubExpression(subExpr, subSteps);

      // Registrar la evaluación del paréntesis
      if (includeSteps) {
        steps.push({
          operation: `Evaluación: ${match}`,
          description: `Paréntesis: ${subResult ? 'V' : 'F'}`,
          result: subResult ? '1' : '0',
          subSteps: subSteps
        });
      }

      // Retornar el resultado para reemplazar el paréntesis
      return subResult ? '1' : '0';
    });

    // Salir si no hubo cambios (prevenir bucle infinito)
    if (oldResult === result) break;
  }

  // =========================================================================
  // PASO 5: Evaluar expresión final (sin paréntesis)
  // =========================================================================

  const finalResult = evaluateSubExpression(result, steps);

  // =========================================================================
  // RETORNO DE RESULTADOS
  // =========================================================================

  if (includeSteps) {
    return {
      result: finalResult,
      steps: steps,
      substitutionSteps: substitutionSteps,
      expression: expression
    };
  }

  return { result: finalResult, steps: [] };
};
