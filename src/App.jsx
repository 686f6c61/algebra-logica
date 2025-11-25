/**
 * =============================================================================
 * ALGEBRA LOGICA - Componente Principal de la Aplicación
 * =============================================================================
 *
 * @file App.jsx
 * @description Componente raíz que define la estructura principal de la
 *              aplicación, incluyendo el sistema de enrutamiento y layout.
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
 * ESTRUCTURA DE RUTAS
 * =============================================================================
 *
 * /                    - Página principal con descripción del proyecto
 * /truth-tables        - Generador de tablas de verdad
 * /theory              - Sección teórica completa (9 apartados)
 * /properties-analysis - Análisis de propiedades lógicas
 * /normal-forms        - Conversión a FNC y FND
 * /syntax-trees        - Árboles de análisis sintáctico
 * /logic-circuits      - Simulador de circuitos lógicos
 *
 * =============================================================================
 */

// =============================================================================
// IMPORTS
// =============================================================================

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// -----------------------------------------------------------------------------
// Componentes de Layout (estructura común de todas las páginas)
// -----------------------------------------------------------------------------
import Header from './components/Header';     // Barra de navegación superior
import Footer from './components/Footer';     // Pie de página con información

// -----------------------------------------------------------------------------
// Páginas de la Aplicación
// -----------------------------------------------------------------------------
import HomePage from './pages/HomePage';                       // Página principal
import TruthTablesPage from './pages/TruthTablesPage';         // Tablas de verdad
import TheoryPage from './pages/TheoryPage';                   // Teoría completa
import PropertiesAnalysisPage from './pages/PropertiesAnalysisPage'; // Propiedades
import NormalFormsPage from './pages/NormalFormsPage';         // Formas normales
import SyntaxTreePage from './pages/SyntaxTreePage';           // Árboles sintácticos
import LogicCircuitsPage from './pages/LogicCircuitsPage';     // Circuitos lógicos

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================

/**
 * Componente App - Raíz de la aplicación
 *
 * Define la estructura general de la aplicación:
 * - Router: Gestiona la navegación entre páginas (SPA)
 * - Layout: Header + Contenido principal + Footer
 * - Rutas: Define qué componente se muestra para cada URL
 *
 * @returns {JSX.Element} Estructura completa de la aplicación
 *
 * @example
 * // Este componente se renderiza en main.jsx
 * <App />
 */
function App() {
  return (
    // BrowserRouter habilita el enrutamiento basado en la API History del navegador
    <Router>
      {/* Contenedor principal con layout flexbox vertical */}
      <div className="min-h-screen flex flex-col">

        {/* ===== HEADER ===== */}
        {/* Barra de navegación fija en la parte superior */}
        <Header />

        {/* ===== CONTENIDO PRINCIPAL ===== */}
        {/* flex-grow permite que el contenido ocupe todo el espacio disponible */}
        <main className="flex-grow">
          {/* Sistema de rutas - renderiza el componente según la URL actual */}
          <Routes>
            {/* Página de inicio */}
            <Route path="/" element={<HomePage />} />

            {/* Generador de tablas de verdad */}
            <Route path="/truth-tables" element={<TruthTablesPage />} />

            {/* Sección de teoría completa */}
            <Route path="/theory" element={<TheoryPage />} />

            {/* Análisis de propiedades lógicas */}
            <Route path="/properties-analysis" element={<PropertiesAnalysisPage />} />

            {/* Conversión a formas normales (FNC/FND) */}
            <Route path="/normal-forms" element={<NormalFormsPage />} />

            {/* Árboles de análisis sintáctico */}
            <Route path="/syntax-trees" element={<SyntaxTreePage />} />

            {/* Simulador de circuitos lógicos */}
            <Route path="/logic-circuits" element={<LogicCircuitsPage />} />
          </Routes>
        </main>

        {/* ===== FOOTER ===== */}
        {/* Pie de página con información del proyecto */}
        <Footer />
      </div>
    </Router>
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export default App;
