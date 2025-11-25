/**
 * =============================================================================
 * ALGEBRA LOGICA - Página Principal (HomePage)
 * =============================================================================
 *
 * @file HomePage.jsx
 * @description Página de inicio que presenta las principales funcionalidades
 *              de la aplicación mediante tarjetas de navegación interactivas.
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
 * SECCIONES DISPONIBLES
 * =============================================================================
 *
 * 1. Teoría          - Fundamentos de lógica proposicional
 * 2. Tablas de Verdad - Generador y analizador
 * 3. Propiedades     - Análisis de tautologías, contradicciones, etc.
 * 4. Formas Normales - Conversión a FNC y FND
 * 5. Árboles         - Visualización de estructura sintáctica
 * 6. Circuitos       - Simulador de circuitos lógicos
 *
 * =============================================================================
 */

// =============================================================================
// IMPORTS
// =============================================================================

import React, { memo } from 'react';
import { Link } from 'react-router-dom';

// Iconos de Font Awesome via react-icons
import {
  FaTable,        // Tablas de verdad
  FaBook,         // Teoría
  FaBrain,        // Logo principal
  FaCheckCircle,  // Análisis de propiedades
  FaExchangeAlt,  // Formas normales
  FaTree,         // Árboles sintácticos
  FaCircleNotch   // Circuitos lógicos
} from 'react-icons/fa';

// =============================================================================
// CONFIGURACIÓN DE TARJETAS DE NAVEGACIÓN
// =============================================================================

/**
 * Array de configuración para las tarjetas de navegación.
 *
 * Cada objeto define:
 * - path: Ruta de destino
 * - icon: Componente de icono
 * - title: Título de la sección
 * - description: Descripción breve de la funcionalidad
 *
 * @constant {Array.<Object>}
 */
const navigationCards = [
  {
    path: '/theory',
    icon: FaBook,
    title: 'Teoría',
    description: 'Aprende los fundamentos de la lógica proposicional'
  },
  {
    path: '/truth-tables',
    icon: FaTable,
    title: 'Tablas de verdad',
    description: 'Genera y analiza tablas de verdad para expresiones lógicas'
  },
  {
    path: '/properties-analysis',
    icon: FaCheckCircle,
    title: 'Análisis de propiedades',
    description: 'Detecta tautologías, contradicciones y verifica equivalencias lógicas'
  },
  {
    path: '/normal-forms',
    icon: FaExchangeAlt,
    title: 'Formas Normales',
    description: 'Convierte expresiones a Forma Normal Conjuntiva (FNC) y Disyuntiva (FND)'
  },
  {
    path: '/syntax-trees',
    icon: FaTree,
    title: 'Árboles de Análisis',
    description: 'Visualiza la estructura jerárquica de operadores y subexpresiones'
  },
  {
    path: '/logic-circuits',
    icon: FaCircleNotch,
    title: 'Circuitos Lógicos',
    description: 'Convierte expresiones en circuitos digitales y simula su comportamiento'
  }
];

// =============================================================================
// COMPONENTE NAVIGATION CARD (TARJETA DE NAVEGACIÓN)
// =============================================================================

/**
 * Componente de tarjeta de navegación individual.
 *
 * @param {Object} props - Propiedades del componente
 * @param {string} props.path - Ruta de navegación
 * @param {React.ComponentType} props.icon - Componente de icono
 * @param {string} props.title - Título de la tarjeta
 * @param {string} props.description - Descripción de la funcionalidad
 * @returns {JSX.Element} Tarjeta de navegación enlazada
 */
const NavigationCard = memo(({ path, icon: Icon, title, description }) => (
  <Link
    to={path}
    className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    aria-label={`Ir a ${title}: ${description}`}
  >
    <div className="flex items-center space-x-4">
      {/* Icono de la sección */}
      <Icon
        className="text-4xl text-gray-700 flex-shrink-0"
        aria-hidden="true"
      />

      <div>
        {/* Título de la sección */}
        <h2 className="text-2xl font-semibold mb-2">
          {title}
        </h2>

        {/* Descripción */}
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </div>
  </Link>
));

// Nombre para DevTools
NavigationCard.displayName = 'NavigationCard';

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================

/**
 * Componente HomePage - Página principal de la aplicación
 *
 * Presenta:
 * - Encabezado con logo y título
 * - Subtítulo descriptivo
 * - Grid de tarjetas de navegación a las diferentes secciones
 *
 * @returns {JSX.Element} Página principal completa
 *
 * @example
 * <HomePage />
 */
function HomePage() {
  return (
    // =========================================================================
    // CONTENEDOR PRINCIPAL
    // =========================================================================
    <div className="max-w-6xl mx-auto px-4 py-12">

      {/* ===================================================================== */}
      {/* ENCABEZADO DE LA PÁGINA                                               */}
      {/* ===================================================================== */}
      <header className="text-center mb-12">
        {/* Logo y título principal */}
        <div className="flex justify-center items-center space-x-4 mb-4">
          <FaBrain
            className="h-16 w-16 text-gray-800"
            aria-hidden="true"
          />
          <h1 className="text-4xl font-bold">
            Lógica proposicional
          </h1>
        </div>

        {/* Subtítulo */}
        <p className="text-xl text-gray-600">
          Resolución de problemas de Álgebra
        </p>
      </header>

      {/* ===================================================================== */}
      {/* GRID DE TARJETAS DE NAVEGACIÓN                                        */}
      {/* ===================================================================== */}
      <nav
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        aria-label="Navegación principal a las secciones de la aplicación"
      >
        {navigationCards.map((card) => (
          <NavigationCard
            key={card.path}
            path={card.path}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </nav>
    </div>
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export default memo(HomePage);
