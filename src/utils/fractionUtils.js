/**
 * =============================================================================
 * ALGEBRA LOGICA - Utilidades de Fracciones
 * =============================================================================
 *
 * @file fractionUtils.js
 * @description Clase Fraction para operaciones con números racionales.
 *              Permite trabajar con fracciones exactas evitando errores
 *              de punto flotante.
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
 * OPERACIONES SOPORTADAS
 * =============================================================================
 *
 * | Método       | Descripción                                    |
 * |--------------|------------------------------------------------|
 * | add          | Suma de fracciones                             |
 * | subtract     | Resta de fracciones                            |
 * | multiply     | Multiplicación de fracciones                   |
 * | divide       | División de fracciones                         |
 * | negate       | Negación (cambio de signo)                     |
 * | abs          | Valor absoluto                                 |
 * | simplify     | Simplificar a su forma irreducible             |
 * | equals       | Comparación de igualdad                        |
 *
 * =============================================================================
 */

// =============================================================================
// IMPORTS
// =============================================================================

import { gcd } from './mathUtils';

// =============================================================================
// CLASE FRACTION
// =============================================================================

/**
 * Clase que representa una fracción matemática (número racional).
 *
 * Las fracciones se almacenan siempre en su forma simplificada,
 * con el denominador positivo.
 *
 * @class Fraction
 *
 * @example
 * // Crear fracciones
 * const half = new Fraction(1, 2);        // 1/2
 * const three = new Fraction(3);          // 3/1 = 3
 * const negHalf = new Fraction(-1, 2);    // -1/2
 *
 * @example
 * // Operaciones
 * const a = new Fraction(1, 2);
 * const b = new Fraction(1, 3);
 * const sum = a.add(b);                   // 5/6
 * const product = a.multiply(b);          // 1/6
 */
export class Fraction {
  /**
   * Crea una nueva fracción.
   *
   * @param {number} numerator - El numerador de la fracción
   * @param {number} [denominator=1] - El denominador de la fracción
   * @throws {Error} Si el denominador es cero
   *
   * @example
   * new Fraction(3, 4)   // 3/4
   * new Fraction(5)      // 5/1 = 5
   * new Fraction(-2, 3)  // -2/3
   * new Fraction(2, -3)  // -2/3 (normalizado)
   */
  constructor(numerator, denominator = 1) {
    // =========================================================================
    // VALIDACIÓN
    // =========================================================================

    // No se puede dividir por cero
    if (denominator === 0) {
      throw new Error('Denominator cannot be zero');
    }

    // =========================================================================
    // NORMALIZACIÓN DEL SIGNO
    // =========================================================================

    // Asegurar que el denominador sea siempre positivo
    // El signo se guarda en el numerador
    if (denominator < 0) {
      numerator = -numerator;
      denominator = -denominator;
    }

    // =========================================================================
    // SIMPLIFICACIÓN
    // =========================================================================

    // Encontrar el MCD para simplificar la fracción
    const divisor = gcd(Math.abs(numerator), Math.abs(denominator));

    // Guardar la fracción simplificada
    this.numerator = numerator / divisor;
    this.denominator = denominator / divisor;
  }

  // ===========================================================================
  // MÉTODOS ESTÁTICOS
  // ===========================================================================

  /**
   * Crea una fracción a partir de un número decimal.
   *
   * @param {number} decimal - Número decimal a convertir
   * @returns {Fraction} Fracción equivalente al decimal
   *
   * @example
   * Fraction.fromDecimal(0.5)   // 1/2
   * Fraction.fromDecimal(0.25)  // 1/4
   * Fraction.fromDecimal(0.333) // aproximación de 1/3
   *
   * @note Usa precisión de 6 decimales para la conversión
   */
  static fromDecimal(decimal) {
    // Precisión: 6 lugares decimales
    const precision = 1000000;

    // Multiplicar por la precisión y redondear
    const numerator = Math.round(decimal * precision);

    // Crear fracción y simplificar
    const fraction = new Fraction(numerator, precision);
    return fraction.simplify();
  }

  // ===========================================================================
  // OPERACIONES ARITMÉTICAS
  // ===========================================================================

  /**
   * Suma esta fracción con otra.
   *
   * Fórmula: a/b + c/d = (a*d + c*b) / (b*d)
   *
   * @param {Fraction} other - Fracción a sumar
   * @returns {Fraction} Resultado de la suma (simplificado)
   *
   * @example
   * new Fraction(1, 2).add(new Fraction(1, 3))  // 5/6
   */
  add(other) {
    return new Fraction(
      this.numerator * other.denominator + other.numerator * this.denominator,
      this.denominator * other.denominator
    ).simplify();
  }

  /**
   * Resta otra fracción de esta.
   *
   * Fórmula: a/b - c/d = (a*d - c*b) / (b*d)
   *
   * @param {Fraction} other - Fracción a restar
   * @returns {Fraction} Resultado de la resta (simplificado)
   *
   * @example
   * new Fraction(1, 2).subtract(new Fraction(1, 3))  // 1/6
   */
  subtract(other) {
    return new Fraction(
      this.numerator * other.denominator - other.numerator * this.denominator,
      this.denominator * other.denominator
    ).simplify();
  }

  /**
   * Multiplica esta fracción por otra.
   *
   * Fórmula: a/b * c/d = (a*c) / (b*d)
   *
   * @param {Fraction} other - Fracción por la cual multiplicar
   * @returns {Fraction} Resultado de la multiplicación (simplificado)
   *
   * @example
   * new Fraction(2, 3).multiply(new Fraction(3, 4))  // 1/2
   */
  multiply(other) {
    return new Fraction(
      this.numerator * other.numerator,
      this.denominator * other.denominator
    ).simplify();
  }

  /**
   * Divide esta fracción entre otra.
   *
   * Fórmula: (a/b) / (c/d) = (a*d) / (b*c)
   *
   * @param {Fraction} other - Fracción divisor
   * @returns {Fraction} Resultado de la división (simplificado)
   * @throws {Error} Si el divisor es cero
   *
   * @example
   * new Fraction(1, 2).divide(new Fraction(2, 3))  // 3/4
   */
  divide(other) {
    // No se puede dividir por cero
    if (other.numerator === 0) {
      throw new Error('Division by zero');
    }

    // Dividir es multiplicar por el recíproco
    return new Fraction(
      this.numerator * other.denominator,
      this.denominator * other.numerator
    ).simplify();
  }

  // ===========================================================================
  // OPERACIONES UNARIAS
  // ===========================================================================

  /**
   * Retorna la negación de esta fracción.
   *
   * @returns {Fraction} Fracción con signo opuesto
   *
   * @example
   * new Fraction(1, 2).negate()   // -1/2
   * new Fraction(-3, 4).negate()  // 3/4
   */
  negate() {
    return new Fraction(-this.numerator, this.denominator);
  }

  /**
   * Retorna el valor absoluto de esta fracción.
   *
   * @returns {Fraction} Fracción con valor absoluto
   *
   * @example
   * new Fraction(-1, 2).abs()  // 1/2
   * new Fraction(3, 4).abs()   // 3/4
   */
  abs() {
    return new Fraction(Math.abs(this.numerator), this.denominator);
  }

  /**
   * Simplifica la fracción a su forma irreducible.
   *
   * @returns {Fraction} Fracción simplificada
   *
   * @example
   * new Fraction(4, 8).simplify()  // 1/2
   */
  simplify() {
    const divisor = gcd(Math.abs(this.numerator), this.denominator);
    return new Fraction(this.numerator / divisor, this.denominator / divisor);
  }

  // ===========================================================================
  // CONVERSIONES
  // ===========================================================================

  /**
   * Convierte la fracción a string legible.
   *
   * @returns {string} Representación en formato "a/b" o "a" si es entero
   *
   * @example
   * new Fraction(1, 2).toString()  // "1/2"
   * new Fraction(3, 1).toString()  // "3"
   * new Fraction(0, 5).toString()  // "0"
   */
  toString() {
    // Si es un número entero, mostrar solo el numerador
    if (this.denominator === 1) {
      return this.numerator.toString();
    }

    // Si es cero, mostrar "0"
    if (this.numerator === 0) {
      return '0';
    }

    // Formato fracción
    return `${this.numerator}/${this.denominator}`;
  }

  /**
   * Convierte la fracción a formato LaTeX.
   *
   * @returns {string} Representación en LaTeX (\frac{a}{b})
   *
   * @example
   * new Fraction(1, 2).toLatex()  // "\\frac{1}{2}"
   * new Fraction(3, 1).toLatex()  // "3"
   */
  toLatex() {
    if (this.denominator === 1) {
      return this.numerator.toString();
    }

    if (this.numerator === 0) {
      return '0';
    }

    return `\\frac{${this.numerator}}{${this.denominator}}`;
  }

  /**
   * Convierte la fracción a número decimal.
   *
   * @returns {number} Valor decimal de la fracción
   *
   * @example
   * new Fraction(1, 2).toDecimal()  // 0.5
   * new Fraction(1, 3).toDecimal()  // 0.3333...
   */
  toDecimal() {
    return this.numerator / this.denominator;
  }

  // ===========================================================================
  // COMPARACIONES
  // ===========================================================================

  /**
   * Compara si dos fracciones son iguales.
   *
   * Usa multiplicación cruzada para evitar división:
   * a/b = c/d si y solo si a*d = b*c
   *
   * @param {Fraction} other - Fracción a comparar
   * @returns {boolean} true si son iguales
   *
   * @example
   * new Fraction(1, 2).equals(new Fraction(2, 4))  // true
   * new Fraction(1, 2).equals(new Fraction(1, 3))  // false
   */
  equals(other) {
    return this.numerator * other.denominator === other.numerator * this.denominator;
  }

  /**
   * Verifica si la fracción es igual a cero.
   *
   * @returns {boolean} true si la fracción es cero
   *
   * @example
   * new Fraction(0, 5).isZero()  // true
   * new Fraction(1, 2).isZero()  // false
   */
  isZero() {
    return this.numerator === 0;
  }
}
