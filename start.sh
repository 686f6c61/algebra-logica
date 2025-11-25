#!/bin/bash
# =============================================================================
# ALGEBRA LOGICA - Script de Inicio
# =============================================================================
#
# @file start.sh
# @description Script para iniciar la aplicación de forma rápida.
#              Verifica dependencias, las instala si es necesario y
#              arranca el servidor de desarrollo.
#
# @author 686f6c61
# @github https://github.com/686f6c61
# @repository https://github.com/686f6c61/algebra-logica
# @version 2.1.0
# @license MIT
#
# @usage ./start.sh [opciones]
#
# Opciones:
#   --install    Forzar instalación de dependencias
#   --build      Compilar para producción
#   --preview    Previsualizar build de producción
#   --help       Mostrar ayuda
#
# =============================================================================

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # Sin color

# =============================================================================
# FUNCIONES
# =============================================================================

# Mostrar banner de la aplicación
show_banner() {
    echo -e "${BLUE}"
    echo "╔═══════════════════════════════════════════════════════════════╗"
    echo "║                                                               ║"
    echo "║     █████╗ ██╗      ██████╗ ███████╗██████╗ ██████╗  █████╗   ║"
    echo "║    ██╔══██╗██║     ██╔════╝ ██╔════╝██╔══██╗██╔══██╗██╔══██╗  ║"
    echo "║    ███████║██║     ██║  ███╗█████╗  ██████╔╝██████╔╝███████║  ║"
    echo "║    ██╔══██║██║     ██║   ██║██╔══╝  ██╔══██╗██╔══██╗██╔══██║  ║"
    echo "║    ██║  ██║███████╗╚██████╔╝███████╗██████╔╝██║  ██║██║  ██║  ║"
    echo "║    ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚══════╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝  ║"
    echo "║                                                               ║"
    echo "║              LÓGICA PROPOSICIONAL v2.1.0                      ║"
    echo "║         github.com/686f6c61/algebra-logica                    ║"
    echo "║                                                               ║"
    echo "╚═══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Mostrar ayuda
show_help() {
    echo -e "${GREEN}Uso:${NC} ./start.sh [opciones]"
    echo ""
    echo -e "${GREEN}Opciones:${NC}"
    echo "  --install    Forzar instalación de dependencias"
    echo "  --build      Compilar para producción"
    echo "  --preview    Previsualizar build de producción"
    echo "  --help       Mostrar esta ayuda"
    echo ""
    echo -e "${GREEN}Ejemplos:${NC}"
    echo "  ./start.sh              # Iniciar servidor de desarrollo"
    echo "  ./start.sh --install    # Reinstalar dependencias e iniciar"
    echo "  ./start.sh --build      # Compilar para producción"
    echo ""
}

# Verificar si Node.js está instalado
check_node() {
    if ! command -v node &> /dev/null; then
        echo -e "${RED}Error: Node.js no está instalado${NC}"
        echo "Por favor, instala Node.js desde: https://nodejs.org/"
        exit 1
    fi

    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        echo -e "${YELLOW}Advertencia: Se recomienda Node.js >= 18${NC}"
        echo "Versión actual: $(node -v)"
    else
        echo -e "${GREEN}✓ Node.js $(node -v) detectado${NC}"
    fi
}

# Verificar si npm está instalado
check_npm() {
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}Error: npm no está instalado${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ npm $(npm -v) detectado${NC}"
}

# Instalar dependencias si es necesario
install_dependencies() {
    if [ ! -d "node_modules" ] || [ "$FORCE_INSTALL" = true ]; then
        echo -e "${YELLOW}Instalando dependencias...${NC}"
        npm install
        if [ $? -ne 0 ]; then
            echo -e "${RED}Error al instalar dependencias${NC}"
            exit 1
        fi
        echo -e "${GREEN}✓ Dependencias instaladas${NC}"
    else
        echo -e "${GREEN}✓ Dependencias ya instaladas${NC}"
    fi
}

# Iniciar servidor de desarrollo
start_dev() {
    echo ""
    echo -e "${GREEN}Iniciando servidor de desarrollo...${NC}"
    echo -e "${BLUE}La aplicación estará disponible en: http://localhost:5173${NC}"
    echo ""
    npm run dev
}

# Compilar para producción
build_production() {
    echo ""
    echo -e "${YELLOW}Compilando para producción...${NC}"
    npm run build
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Build completado en ./dist${NC}"
    else
        echo -e "${RED}Error en la compilación${NC}"
        exit 1
    fi
}

# Previsualizar build de producción
preview_build() {
    if [ ! -d "dist" ]; then
        echo -e "${YELLOW}No existe build. Compilando primero...${NC}"
        build_production
    fi
    echo ""
    echo -e "${GREEN}Iniciando servidor de preview...${NC}"
    echo -e "${BLUE}La aplicación estará disponible en: http://localhost:4173${NC}"
    echo ""
    npm run preview
}

# =============================================================================
# MAIN
# =============================================================================

# Parsear argumentos
FORCE_INSTALL=false
ACTION="dev"

while [[ $# -gt 0 ]]; do
    case $1 in
        --install)
            FORCE_INSTALL=true
            shift
            ;;
        --build)
            ACTION="build"
            shift
            ;;
        --preview)
            ACTION="preview"
            shift
            ;;
        --help|-h)
            show_help
            exit 0
            ;;
        *)
            echo -e "${RED}Opción desconocida: $1${NC}"
            show_help
            exit 1
            ;;
    esac
done

# Mostrar banner
show_banner

# Verificaciones
echo -e "${BLUE}Verificando requisitos...${NC}"
check_node
check_npm

# Instalar dependencias
install_dependencies

# Ejecutar acción
case $ACTION in
    dev)
        start_dev
        ;;
    build)
        build_production
        ;;
    preview)
        preview_build
        ;;
esac
