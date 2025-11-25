/**
 * =============================================================================
 * ALGEBRA LOGICA - Componente Footer (Pie de Página)
 * =============================================================================
 *
 * @file Footer.jsx
 * @description Pie de página de la aplicación. Muestra información del autor,
 *              versión y tecnologías utilizadas. Componente estático optimizado
 *              con React.memo.
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
 */

// =============================================================================
// IMPORTS
// =============================================================================

import React, { memo } from 'react';

// Iconos de tecnologías (Simple Icons)
import { SiJavascript, SiReact } from 'react-icons/si';

// =============================================================================
// COMPONENTE FOOTER
// =============================================================================

/**
 * Componente Footer - Pie de página de la aplicación
 *
 * Renderiza el pie de página con:
 * - Créditos del autor (enlace a GitHub)
 * - Versión de la aplicación
 * - Iconos de tecnologías utilizadas
 *
 * Este componente es estático y se optimiza con React.memo.
 *
 * @returns {JSX.Element} Elemento footer con información
 *
 * @example
 * <Footer />
 */
const Footer = () => {
  // Año actual para el copyright
  const currentYear = new Date().getFullYear();

  return (
    // =========================================================================
    // CONTENEDOR PRINCIPAL
    // =========================================================================
    <footer
      className="bg-gray-900 text-white py-4"
      role="contentinfo"
      aria-label="Pie de página con información del proyecto"
    >
      {/* Contenedor interno centrado */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">

        {/* ================================================================= */}
        {/* INFORMACIÓN DEL AUTOR Y VERSIÓN                                   */}
        {/* ================================================================= */}
        <span className="text-center sm:text-left">
          {/* Enlace al perfil de GitHub del autor */}
          <a
            href="https://github.com/686f6c61"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
            aria-label="Perfil de GitHub del autor (se abre en nueva pestaña)"
          >
            686f6c61
          </a>
          {' '}- v2.1.0 - {currentYear} - Powered by
        </span>

        {/* ================================================================= */}
        {/* ICONOS DE TECNOLOGÍAS                                             */}
        {/* ================================================================= */}

        {/* Icono de JavaScript */}
        <SiJavascript
          className="w-5 h-5 text-yellow-400"
          aria-label="JavaScript"
          title="JavaScript"
        />

        {/* Icono de React */}
        <SiReact
          className="w-5 h-5 text-cyan-400"
          aria-label="React"
          title="React"
        />
      </div>

      {/* ===================================================================== */}
      {/* ENLACE AL REPOSITORIO                                                 */}
      {/* ===================================================================== */}
      <div className="text-center mt-2 text-sm text-gray-400">
        <a
          href="https://github.com/686f6c61/algebra-logica"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
          aria-label="Repositorio del proyecto en GitHub (se abre en nueva pestaña)"
        >
          github.com/686f6c61/algebra-logica
        </a>
      </div>
    </footer>
  );
};

// =============================================================================
// EXPORTS
// =============================================================================

/**
 * Exportamos el componente envuelto en React.memo para optimización.
 *
 * Como Footer no recibe props y su contenido es mayormente estático
 * (solo el año cambia anualmente), se beneficia de la memorización.
 */
export default memo(Footer);
