/**
 * =============================================================================
 * ALGEBRA LOGICA - Utilidades de Exportación
 * =============================================================================
 *
 * @file exportUtils.js
 * @description Funciones para exportar tablas de verdad a diferentes formatos:
 *              TXT, PDF, CSV y PNG. Utiliza jsPDF para generación de PDFs y
 *              html2canvas para capturas de pantalla.
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
 * FORMATOS DE EXPORTACIÓN SOPORTADOS
 * =============================================================================
 *
 * | Formato | Función        | Descripción                              |
 * |---------|----------------|------------------------------------------|
 * | TXT     | exportToTxt    | Texto plano con formato tabular          |
 * | PDF     | exportToPdf    | Documento PDF con tabla formateada       |
 * | CSV     | exportToCSV    | Valores separados por comas (Excel)      |
 * | PNG     | exportToPNG    | Captura de pantalla de la tabla          |
 *
 * =============================================================================
 * DEPENDENCIAS
 * =============================================================================
 *
 * - jspdf: Generación de documentos PDF
 * - jspdf-autotable: Plugin para crear tablas en PDF
 * - html2canvas: Captura de elementos HTML como imágenes
 *
 * =============================================================================
 */

// =============================================================================
// IMPORTS
// =============================================================================

import jsPDF from 'jspdf';           // Biblioteca principal para crear PDFs
import 'jspdf-autotable';            // Plugin para tablas en jsPDF
import html2canvas from 'html2canvas'; // Captura de elementos HTML como canvas

// =============================================================================
// FUNCIONES AUXILIARES
// =============================================================================

/**
 * Formatea una expresión lógica reemplazando símbolos Unicode por texto legible.
 *
 * Esta función convierte los símbolos matemáticos a nombres de operadores
 * para mejor legibilidad en exportaciones de texto.
 *
 * @param {string} expression - Expresión con símbolos lógicos
 * @returns {string} Expresión con nombres de operadores
 *
 * @example
 * formatExpression('p ∧ q')     // 'p AND q'
 * formatExpression('¬p ∨ q')    // 'NOT p OR q'
 * formatExpression('p → q')     // 'p → q' (se mantiene para implicación)
 */
const formatExpression = (expression) => {
  // Validación de entrada
  if (!expression || typeof expression !== 'string') {
    return '';
  }

  // Reemplazar cada símbolo por su equivalente textual
  return expression
    .replace(/∧/g, ' AND ')      // Conjunción
    .replace(/∨/g, ' OR ')       // Disyunción
    .replace(/¬/g, 'NOT ')       // Negación
    .replace(/⊼/g, ' NAND ')     // NAND
    .replace(/⊽/g, ' NOR ')      // NOR
    .replace(/⊕/g, ' XOR ')      // Disyunción exclusiva
    .replace(/↔/g, ' XNOR ')     // Bicondicional
    .replace(/→/g, ' → ');       // Implicación (mantiene el símbolo)
};

/**
 * Crea una cabecera estándar para los archivos exportados.
 *
 * Incluye el título, fecha de generación y la proposición evaluada.
 *
 * @param {string} text - La expresión lógica formateada
 * @returns {string} Cabecera formateada
 *
 * @example
 * createHeader('p AND q')
 * // "tabla de verdad - 25/11/2025\n\nproposición: p AND q\n\n"
 */
const createHeader = (text) => {
  // Obtener fecha actual en formato español (dd/mm/aaaa)
  const date = new Date().toLocaleDateString('es-ES');

  return `tabla de verdad - ${date}\n\nproposición: ${text}\n\n`;
};

/**
 * Descarga un archivo generado en el navegador.
 *
 * Crea un enlace temporal, simula un clic y luego limpia los recursos.
 *
 * @param {Blob} blob - El contenido del archivo
 * @param {string} filename - Nombre del archivo a descargar
 *
 * @example
 * const blob = new Blob(['contenido'], { type: 'text/plain' });
 * downloadFile(blob, 'archivo.txt');
 */
const downloadFile = (blob, filename) => {
  // Crear URL temporal para el blob
  const url = window.URL.createObjectURL(blob);

  // Crear elemento <a> temporal
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;

  // Simular clic para iniciar descarga
  a.click();

  // Liberar memoria del blob URL
  window.URL.revokeObjectURL(url);
};

// =============================================================================
// EXPORTACIÓN A TXT (TEXTO PLANO)
// =============================================================================

/**
 * Exporta una tabla de verdad a formato de texto plano.
 *
 * El archivo resultante tiene un formato tabular con:
 * - Cabecera con fecha y expresión
 * - Columnas para cada variable
 * - Columna de resultado
 * - Valores representados como V (verdadero) y F (falso)
 *
 * @param {string} expression - La expresión lógica original
 * @param {string[]} variables - Array de nombres de variables
 * @param {boolean[][]} combinations - Combinaciones de valores de entrada
 * @param {boolean[]} results - Resultados de la evaluación
 *
 * @example
 * exportToTxt('p ∧ q', ['p', 'q'], [[true, true], [true, false]], [true, false]);
 * // Descarga archivo 'tabla_de_verdad.txt'
 */
export const exportToTxt = (expression, variables, combinations, results) => {
  try {
    // Formatear la expresión para mejor legibilidad
    const formattedExpression = formatExpression(expression);

    // Iniciar contenido con cabecera
    let content = createHeader(formattedExpression);

    // Crear encabezado de columnas (variables + resultado)
    const header = [...variables, 'resultado'];
    content += header.join('\t') + '\n';

    // Línea separadora
    content += '-'.repeat(header.length * 8) + '\n';

    // Agregar cada fila de la tabla
    combinations.forEach((combination, index) => {
      // Convertir booleanos a V/F
      const row = [
        ...combination.map(v => v ? 'V' : 'F'),
        results[index] ? 'V' : 'F'
      ];
      content += row.join('\t') + '\n';
    });

    // Crear blob y descargar
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    downloadFile(blob, 'tabla_de_verdad.txt');

  } catch (error) {
    console.error('Error al exportar a TXT:', error);
    throw new Error('No se pudo exportar la tabla a formato TXT');
  }
};

// =============================================================================
// EXPORTACIÓN A PDF
// =============================================================================

/**
 * Exporta una tabla de verdad a formato PDF.
 *
 * Genera un documento PDF profesional con:
 * - Título centrado
 * - Expresión lógica
 * - Tabla formateada con estilos
 *
 * @param {string} expression - La expresión lógica original
 * @param {string[]} variables - Array de nombres de variables
 * @param {boolean[][]} combinations - Combinaciones de valores de entrada
 * @param {boolean[]} results - Resultados de la evaluación
 *
 * @example
 * exportToPdf('p ∧ q', ['p', 'q'], [[true, true], [true, false]], [true, false]);
 * // Descarga archivo 'tabla_de_verdad.pdf'
 */
export const exportToPdf = (expression, variables, combinations, results) => {
  try {
    // Crear nuevo documento PDF
    const doc = new jsPDF();

    // Formatear expresión
    const formattedExpression = formatExpression(expression);

    // =========================================================================
    // CONFIGURACIÓN DE FUENTE Y TÍTULO
    // =========================================================================

    // Usar fuente Helvetica (soporta caracteres básicos)
    doc.setFont('helvetica');

    // Título principal
    doc.setFontSize(16);
    doc.text('tabla de verdad', 14, 20);

    // =========================================================================
    // PROPOSICIÓN
    // =========================================================================

    doc.setFontSize(12);
    const propositionText = `proposición: ${formattedExpression}`;

    // Dividir texto largo en múltiples líneas si es necesario
    // El segundo parámetro (180) es el ancho máximo en mm
    const splitText = doc.splitTextToSize(propositionText, 180);
    doc.text(splitText, 14, 30);

    // =========================================================================
    // CREAR TABLA DE VERDAD
    // =========================================================================

    // Encabezados de columna
    const header = [...variables, 'resultado'];

    // Datos de la tabla (convertir booleanos a V/F)
    const data = combinations.map((combination, index) => [
      ...combination.map(v => v ? 'V' : 'F'),
      results[index] ? 'V' : 'F'
    ]);

    // Generar tabla usando autoTable
    doc.autoTable({
      // Posición vertical (ajustada según líneas del texto de proposición)
      startY: 40 + (splitText.length * 10),

      // Encabezados
      head: [header],

      // Datos
      body: data,

      // Tema visual
      theme: 'grid',

      // Estilos generales de celdas
      styles: {
        fontSize: 10,
        cellPadding: 5,
        textColor: [0, 0, 0],        // Negro
        fontStyle: 'normal',
        halign: 'center'              // Centrado horizontal
      },

      // Estilos específicos del encabezado
      headStyles: {
        fillColor: [200, 200, 200],   // Gris claro
        textColor: [0, 0, 0],         // Negro
        fontStyle: 'bold'
      },

      // Ancho de columnas (ajustar según necesidad)
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 20 },
        2: { cellWidth: 20 },
        3: { cellWidth: 20 },
        4: { cellWidth: 20 },
        5: { cellWidth: 20 },
        6: { cellWidth: 30 }
      }
    });

    // =========================================================================
    // GUARDAR DOCUMENTO
    // =========================================================================

    doc.save('tabla_de_verdad.pdf');

  } catch (error) {
    console.error('Error al exportar a PDF:', error);
    throw new Error('No se pudo exportar la tabla a formato PDF');
  }
};

// =============================================================================
// EXPORTACIÓN A CSV
// =============================================================================

/**
 * Exporta una tabla de verdad a formato CSV (valores separados por comas).
 *
 * Este formato es compatible con Excel, Google Sheets y otras
 * aplicaciones de hojas de cálculo.
 *
 * @param {string} expression - La expresión lógica original
 * @param {string[]} variables - Array de nombres de variables
 * @param {boolean[][]} combinations - Combinaciones de valores de entrada
 * @param {boolean[]} results - Resultados de la evaluación
 *
 * @example
 * exportToCSV('p ∧ q', ['p', 'q'], [[true, true], [true, false]], [true, false]);
 * // Descarga archivo 'tabla_de_verdad.csv'
 */
export const exportToCSV = (expression, variables, combinations, results) => {
  try {
    // Formatear expresión
    const formattedExpression = formatExpression(expression);

    // =========================================================================
    // CREAR CONTENIDO CSV
    // =========================================================================

    // Cabecera con metadatos (entre comillas para escapar comas)
    let content = `"Proposición:","${formattedExpression}"
"Fecha:","${new Date().toLocaleDateString('es-ES')}"

`;

    // Encabezados de columnas
    const header = [...variables, 'resultado'];
    content += header.join(',') + '\n';

    // Filas de datos
    combinations.forEach((combination, index) => {
      const row = [
        ...combination.map(v => v ? 'V' : 'F'),
        results[index] ? 'V' : 'F'
      ];
      content += row.join(',') + '\n';
    });

    // =========================================================================
    // DESCARGAR ARCHIVO
    // =========================================================================

    const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
    downloadFile(blob, 'tabla_de_verdad.csv');

  } catch (error) {
    console.error('Error al exportar a CSV:', error);
    throw new Error('No se pudo exportar la tabla a formato CSV');
  }
};

// =============================================================================
// EXPORTACIÓN A PNG (IMAGEN)
// =============================================================================

/**
 * Exporta una tabla de verdad como imagen PNG.
 *
 * Captura el elemento HTML de la tabla y lo convierte en una imagen.
 * Requiere una referencia React al elemento de la tabla.
 *
 * @param {React.RefObject} tableRef - Referencia al elemento de la tabla
 * @returns {Promise<void>}
 *
 * @example
 * const tableRef = useRef(null);
 * // ... renderizar tabla con ref={tableRef}
 * await exportToPNG(tableRef);
 * // Descarga archivo 'tabla_de_verdad.png'
 */
export const exportToPNG = async (tableRef) => {
  // =========================================================================
  // VALIDACIÓN
  // =========================================================================

  // Verificar que la referencia existe y tiene un elemento actual
  if (!tableRef || !tableRef.current) {
    console.error('No se pudo encontrar la referencia a la tabla');
    throw new Error('Referencia a la tabla no válida');
  }

  try {
    // =========================================================================
    // CONFIGURACIÓN DE HTML2CANVAS
    // =========================================================================

    const options = {
      backgroundColor: '#ffffff',   // Fondo blanco
      scale: 2,                      // Escala 2x para mejor calidad
      useCORS: true,                 // Permitir recursos cross-origin
      logging: false                 // Desactivar logs de depuración
    };

    // =========================================================================
    // CAPTURAR Y CONVERTIR A IMAGEN
    // =========================================================================

    // Crear canvas desde el elemento de la tabla
    const canvas = await html2canvas(tableRef.current, options);

    // Convertir canvas a data URL (base64)
    const imgData = canvas.toDataURL('image/png');

    // =========================================================================
    // DESCARGAR IMAGEN
    // =========================================================================

    // Crear enlace de descarga
    const a = document.createElement('a');
    a.href = imgData;
    a.download = 'tabla_de_verdad.png';
    a.click();

  } catch (error) {
    console.error('Error al exportar a PNG:', error);
    throw new Error('No se pudo exportar la tabla a formato PNG');
  }
};
