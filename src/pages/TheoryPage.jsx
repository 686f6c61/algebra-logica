/**
 * =============================================================================
 * ALGEBRA LOGICA - Página de Teoría
 * =============================================================================
 *
 * @file TheoryPage.jsx
 * @description Sección teórica completa de lógica proposicional. Incluye
 *              9 apartados con contenido educativo detallado sobre todos
 *              los temas cubiertos por la aplicación.
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
 * SECCIONES DE TEORÍA
 * =============================================================================
 *
 * 1. Fundamentos de lógica proposicional
 * 2. Operadores lógicos
 * 3. Tablas de verdad
 * 4. Equivalencia lógica
 * 5. Propiedades lógicas (tautologías, contradicciones)
 * 6. Formas normales (FNC y FND)
 * 7. Árboles sintácticos
 * 8. Circuitos lógicos
 * 9. Ejemplos prácticos
 *
 * =============================================================================
 */

import React, { useState, useRef, useEffect } from 'react';
import PropositionalBasics from '../components/theory/PropositionalBasics';
import LogicalOperators from '../components/theory/LogicalOperators';
import TruthTableTheory from '../components/theory/TruthTableTheory';
import LogicalEquivalence from '../components/theory/LogicalEquivalence';
import LogicalPropertiesTheory from '../components/theory/LogicalPropertiesTheory';
import NormalFormsTheory from '../components/theory/NormalFormsTheory';
import SyntaxTreeTheory from '../components/theory/SyntaxTreeTheory';
import LogicCircuitsTheory from '../components/theory/LogicCircuitsTheory';
import ExamplesSection from '../components/theory/ExamplesSection';
import { FaBook, FaChevronDown, FaChevronUp, FaList } from 'react-icons/fa';

function TheoryPage() {
  // Estado para los temas colapsables
  const [expandedSections, setExpandedSections] = useState({
    basics: true,
    operators: true,
    truthTables: true,
    equivalence: true,
    properties: true,
    normalForms: true,
    syntaxTrees: true,
    logicCircuits: true,
    examples: true
  });
  
  // Estado para mostrar/ocultar el índice en dispositivos móviles
  const [showIndex, setShowIndex] = useState(false);
  
  // Referencias para los elementos de sección
  const sectionRefs = {
    basics: useRef(null),
    operators: useRef(null),
    truthTables: useRef(null),
    equivalence: useRef(null),
    properties: useRef(null),
    normalForms: useRef(null),
    syntaxTrees: useRef(null),
    logicCircuits: useRef(null),
    examples: useRef(null)
  };

  // Función para expandir/colapsar secciones
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Función para desplazarse a una sección
  const scrollToSection = (sectionId) => {
    if (sectionRefs[sectionId] && sectionRefs[sectionId].current) {
      // Expandir la sección si está colapsada
      if (!expandedSections[sectionId]) {
        setExpandedSections(prev => ({
          ...prev,
          [sectionId]: true
        }));
      }
      
      // Pequeño retraso para asegurar que la sección se ha expandido
      setTimeout(() => {
        sectionRefs[sectionId].current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
      
      // Ocultar el índice en móviles después de seleccionar
      setShowIndex(false);
    }
  };

  // Componente para sección con título colapsable
  const TheorySection = ({ id, title, children }) => (
    <div ref={sectionRefs[id]} className="border border-gray-300 rounded-lg overflow-hidden mb-4">
      <button
        id={`section-${id}`}
        className="w-full px-4 py-3 bg-gray-100 text-left font-semibold flex justify-between items-center"
        onClick={() => toggleSection(id)}
      >
        <span>{title}</span>
        {expandedSections[id] ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {expandedSections[id] && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  );
  
  // Componente para el índice
  const TheoryIndex = () => (
    <div className="mb-6 p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Índice de contenidos</h2>
        <button 
          className="md:hidden p-2 bg-gray-100 rounded-full"
          onClick={() => setShowIndex(!showIndex)}
        >
          <FaList />
        </button>
      </div>
      
      <div className={`${showIndex ? 'block' : 'hidden'} md:block`}>
        <ul className="space-y-2">
          <li>
            <button 
              onClick={() => scrollToSection('basics')} 
              className="hover:text-gray-600 hover:underline text-left w-full py-1"
            >
              1. Conceptos Básicos de Lógica Proposicional
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('operators')} 
              className="hover:text-gray-600 hover:underline text-left w-full py-1"
            >
              2. Operadores Lógicos
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('truthTables')} 
              className="hover:text-gray-600 hover:underline text-left w-full py-1"
            >
              3. Tablas de Verdad
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('equivalence')} 
              className="hover:text-gray-600 hover:underline text-left w-full py-1"
            >
              4. Equivalencia Lógica
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('properties')} 
              className="hover:text-gray-600 hover:underline text-left w-full py-1"
            >
              5. Análisis de Propiedades Lógicas
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('normalForms')} 
              className="hover:text-gray-600 hover:underline text-left w-full py-1"
            >
              6. Formas Normales (FNC y FND)
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('syntaxTrees')} 
              className="hover:text-gray-600 hover:underline text-left w-full py-1"
            >
              7. Árboles de Análisis Sintáctico
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('logicCircuits')} 
              className="hover:text-gray-600 hover:underline text-left w-full py-1"
            >
              8. Circuitos Lógicos
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('examples')} 
              className="hover:text-gray-600 hover:underline text-left w-full py-1"
            >
              9. Ejemplos y Ejercicios
            </button>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <FaBook className="text-3xl text-gray-700" />
        <h1 className="text-3xl font-bold">Teoría</h1>
      </div>

      <div className="mb-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
        <p className="text-lg">Este manual contiene toda la teoría necesaria para comprender la lógica proposicional, desde los conceptos básicos hasta formas avanzadas como la FNC y FND. Utiliza el índice para navegar entre secciones.</p>
      </div>
      
      <TheoryIndex />

      <div className="space-y-4">
        <TheorySection id="basics" title="1. Conceptos Básicos de Lógica Proposicional">
          <PropositionalBasics />
        </TheorySection>
        
        <TheorySection id="operators" title="2. Operadores Lógicos">
          <LogicalOperators />
        </TheorySection>
        
        <TheorySection id="truthTables" title="3. Tablas de Verdad">
          <TruthTableTheory />
        </TheorySection>
        
        <TheorySection id="equivalence" title="4. Equivalencia Lógica">
          <LogicalEquivalence />
        </TheorySection>
        
        <TheorySection id="properties" title="5. Análisis de Propiedades Lógicas">
          <LogicalPropertiesTheory />
        </TheorySection>
        
        <TheorySection id="normalForms" title="6. Formas Normales (FNC y FND)">
          <NormalFormsTheory />
        </TheorySection>
        
        <TheorySection id="syntaxTrees" title="7. Árboles de Análisis Sintáctico">
          <SyntaxTreeTheory />
        </TheorySection>
        
        <TheorySection id="logicCircuits" title="8. Circuitos Lógicos">
          <LogicCircuitsTheory />
        </TheorySection>
        
        <TheorySection id="examples" title="9. Ejemplos y Ejercicios">
          <ExamplesSection />
        </TheorySection>
      </div>
    </div>
  );
}

export default TheoryPage;