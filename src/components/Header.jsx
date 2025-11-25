/**
 * =============================================================================
 * ALGEBRA LOGICA - Componente Header (Cabecera)
 * =============================================================================
 *
 * @file Header.jsx
 * @description Barra de navegación superior de la aplicación. Incluye el logo,
 *              título y enlace al repositorio de GitHub. Este componente es
 *              estático y se optimiza con React.memo para evitar re-renders.
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
import { Link } from 'react-router-dom';

// Iconos de react-icons (Font Awesome)
import { FaGithub, FaCalculator } from 'react-icons/fa';

// =============================================================================
// COMPONENTE HEADER
// =============================================================================

/**
 * Componente Header - Barra de navegación superior
 *
 * Renderiza la cabecera fija de la aplicación con:
 * - Logo y título (enlace a página principal)
 * - Enlace al repositorio de GitHub
 *
 * Este componente no recibe props y su contenido es estático,
 * por lo que se envuelve en React.memo para optimización.
 *
 * @returns {JSX.Element} Elemento header con navegación
 *
 * @example
 * <Header />
 */
const Header = () => {
  return (
    // =========================================================================
    // CONTENEDOR PRINCIPAL
    // =========================================================================
    <header
      className="bg-white shadow-sm mb-8"
      role="banner"
      aria-label="Cabecera principal de la aplicación"
    >
      {/* Contenedor interno con ancho máximo y padding */}
      <div className="max-w-6xl mx-auto py-4 px-4 flex justify-between items-center">

        {/* ================================================================= */}
        {/* LOGO Y TÍTULO (enlace a inicio)                                   */}
        {/* ================================================================= */}
        <Link
          to="/"
          className="flex items-center space-x-3"
          aria-label="Ir a la página principal"
        >
          {/* Icono de calculadora como logo */}
          <FaCalculator
            className="text-3xl text-gray-700"
            aria-hidden="true"
          />

          {/* Título de la aplicación */}
          <h1 className="text-3xl font-bold text-gray-900">
            Asignatura Álgebra
          </h1>
        </Link>

        {/* ================================================================= */}
        {/* ENLACE A GITHUB                                                   */}
        {/* ================================================================= */}
        <a
          href="https://github.com/686f6c61/algebra-logica"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-gray-900 transition-colors"
          aria-label="Ver código fuente en GitHub (se abre en nueva pestaña)"
          title="Repositorio en GitHub"
        >
          {/* Icono de GitHub */}
          <FaGithub
            className="w-8 h-8"
            aria-hidden="true"
          />
        </a>
      </div>
    </header>
  );
};

// =============================================================================
// EXPORTS
// =============================================================================

/**
 * Exportamos el componente envuelto en React.memo
 *
 * React.memo es un HOC (Higher Order Component) que memoriza el resultado
 * del renderizado. Si las props no cambian, React reutiliza el resultado
 * anterior en lugar de re-renderizar.
 *
 * En este caso, como Header no recibe props, solo se renderizará una vez
 * y se reutilizará en navegaciones posteriores.
 *
 * @see https://react.dev/reference/react/memo
 */
export default memo(Header);
