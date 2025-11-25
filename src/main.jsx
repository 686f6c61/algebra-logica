/**
 * =============================================================================
 * ALGEBRA LOGICA - Aplicación Web Educativa
 * =============================================================================
 *
 * @file main.jsx
 * @description Punto de entrada principal de la aplicación React. Inicializa
 *              el árbol de componentes y monta la aplicación en el DOM.
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
 * DESCRIPCIÓN DEL PROYECTO
 * =============================================================================
 *
 * Aplicación web educativa para el aprendizaje de Lógica Proposicional.
 * Incluye herramientas para:
 * - Generación de tablas de verdad
 * - Análisis de propiedades lógicas (tautologías, contradicciones, etc.)
 * - Conversión a formas normales (FNC y FND)
 * - Visualización de árboles de análisis sintáctico
 * - Simulación de circuitos lógicos
 *
 * =============================================================================
 */

// =============================================================================
// IMPORTS
// =============================================================================

import React from 'react';                    // Biblioteca principal de React
import ReactDOM from 'react-dom/client';      // API de renderizado de React 18+
import App from './App';                       // Componente raíz de la aplicación
import './index.css';                          // Estilos globales (Tailwind CSS)

// =============================================================================
// INICIALIZACIÓN DE LA APLICACIÓN
// =============================================================================

/**
 * Crea el punto de montaje de React y renderiza la aplicación.
 *
 * - `document.getElementById('root')`: Obtiene el elemento DOM donde se montará
 *   la aplicación (definido en index.html)
 * - `React.StrictMode`: Activa comprobaciones adicionales en desarrollo para
 *   detectar problemas potenciales (efectos secundarios, APIs obsoletas, etc.)
 *
 * @see https://react.dev/reference/react/StrictMode
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
