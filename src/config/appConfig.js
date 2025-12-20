// ============================================================================
// CONFIGURACIÓN CENTRAL DE LA APLICACIÓN
// ============================================================================
// Aquí se controlan todas las características y comportamientos de la app
// Modificar estos valores NO requiere tocar la lógica de componentes
// ============================================================================

export const APP_CONFIG = {

    // ========== CONFIGURACIÓN DEL MAPA ==========
    mapa: {
        // Coordenadas iniciales (centro de Argentina)
        centroInicial: [-38, -65],
        zoomInicial: 5,
        zoomMinimo: 3,
        zoomMaximo: 18,

        // Capas base disponibles
        capasBase: {
            // Activar/desactivar mapa físico de fondo
            mapaFisico: {
                activo: true, // ← Cambiar a false para desactivar
                url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
                attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
                maxZoom: 17
            },

            // Alternativa: mapa simple (si mapaFisico.activo = false)
            mapaSimple: {
                url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19
            }
        },

        // Estilos de provincias
        estilos: {
            // Cuando NO hay categorización (color uniforme)
            colorBase: '#C9A882',
            colorHover: '#D4B896',

            // Cuando SÍ hay categorización (por potencial minero, región, etc.)
            // Las categorías se definen dinámicamente según columnas del Sheet
            categorias: {
                // Ejemplos de categorías potenciales (se puede expandir)
                potencial_minero: {
                    'Alto': '#8B4513',      // Marrón oscuro
                    'Medio': '#CD853F',     // Marrón medio
                    'Bajo': '#D4B896',      // Marrón claro
                    'Sin datos': '#E5E5E5'  // Gris
                },
                region_geografica: {
                    'Cordillera': '#8B4513',
                    'Precordillera': '#CD853F',
                    'Sierras': '#D2691E',
                    'Llanura': '#90EE90',
                    'Meseta': '#DEB887',
                    'Sin datos': '#C9A882'
                }
            },

            // Transparencia cuando hay mapa físico de fondo
            opacidadConFondo: 0.4,    // 40% transparencia
            opacidadSinFondo: 0.8,    // 80% opacidad

            // Bordes
            pesoLinea: 2,
            colorLinea: '#ffffff',
            opacidadLinea: 1
        },

        // Columna del Sheet a usar para colorear (null = color uniforme)
        columnaCategorizacion: null  // Opciones: null, 'potencial_minero', 'region_geografica', etc.
    },

    // ========== CONFIGURACIÓN DE DATOS ==========
    datos: {
        // URLs de fuentes de datos
        urlGeoJSON: 'https://infra.datos.gob.ar/georef-dev/provincias.geojson',
        urlCSV: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT9Nl6HpmnMQ1VxSP8kkPUK8iuy1xKMzTzSKtFqszencjoXkzxD5b1wvCPnEHB6kaKVTVyvNdqRlV_p/pub?gid=1919087106&single=true&output=csv',

        // Campos que identifican la provincia (para cruzar datos)
        camposId: ['id_mapa', 'id', 'codigo_provincia'],

        // Organización de la información en el panel
        // Las secciones se generan automáticamente según las columnas del Sheet
        organizacionPanel: {
            // Sección 1: Indicadores principales (siempre visible)
            indicadoresPrincipales: {
                titulo: 'Indicadores Clave',
                campos: ['empleo', 'mineral_principal', 'produccion_anual'],
                iconos: {
                    empleo: 'users',
                    mineral_principal: 'gem',
                    produccion_anual: 'trending-up'
                }
            },

            // Sección 2: Información geográfica
            informacionGeografica: {
                titulo: 'Geografía',
                campos: ['superficie', 'poblacion', 'altitud_promedio', 'region_geografica'],
                activo: true // ← false para ocultar sección completa
            },

            // Sección 3: Información económica
            informacionEconomica: {
                titulo: 'Economía Minera',
                campos: ['inversion_anual', 'exportaciones', 'pib_minero'],
                activo: true
            },

            // Sección 4: Infraestructura
            infraestructura: {
                titulo: 'Infraestructura',
                campos: ['puertos', 'rutas_principales', 'aeropuertos', 'ferrocarriles'],
                activo: true
            },

            // Sección 5: Marco legal (siempre visible)
            marcoLegal: {
                titulo: 'Marco Legal y Normativo',
                campos: ['legislacion', 'codigo_minero_provincial', 'incentivos_fiscales'],
                tipoLink: true // Los valores son URLs
            },

            // Sección 6: Observaciones (siempre al final)
            observaciones: {
                titulo: 'Información Adicional',
                campos: ['observaciones', 'notas', 'comentarios']
            }
        }
    },

    // ========== CONFIGURACIÓN DE UI ==========
    interfaz: {
        // Textos principales
        textos: {
            titulo: 'Información para el inversor minero',
            subtitulo: 'Sistema de Información Abierta a la Comunidad sobre la Actividad Minera en Argentina',
            footerPrincipal: 'Información relevante para el inversor minero actualizada a diciembre de 2025',
            mensajeSeleccion: 'Selecciona una provincia en el mapa para ver información detallada'
        },

        // Colores institucionales
        colores: {
            azulGobierno: '#0072BB',
            azulGobiernoOscuro: '#005288',
            amarilloDestacado: '#F59E0B',
            verdeExito: '#10B981',
            rojoAlerta: '#EF4444'
        },

        // Características opcionales
        features: {
            mostrarCargaDatos: true,      // Indicador de "Cargando..."
            mostrarErrores: true,          // Mensajes de error visibles
            animacionesTransicion: true,   // Animaciones suaves
            tooltipsEnMapa: true,          // Nombres al pasar mouse
            iconosEnPanel: false,          // Iconos junto a cada dato (futuro)
            formateoNumeros: true          // Formatear números grandes (ej: 8.452 → 8,452)
        }
    },

    // ========== FUTURAS EXPANSIONES (preparado pero no implementado) ==========
    funcionesFuturas: {
        busqueda: {
            activo: false,
            placeholder: 'Buscar provincia...'
        },
        filtros: {
            activo: false,
            tipos: ['mineral', 'empleo', 'region']
        },
        comparador: {
            activo: false,
            maxProvincias: 3
        },
        exportacion: {
            activo: false,
            formatos: ['PDF', 'Excel']
        },
        graficos: {
            activo: false,
            tipos: ['barras', 'torta']
        }
    }
};

// ============================================================================
// FUNCIONES AUXILIARES DE CONFIGURACIÓN
// ============================================================================

/**
 * Obtiene el color de una provincia según configuración
 */
export const obtenerColorProvincia = (datosProvincia) => {
    const { columnaCategorizacion, estilos } = APP_CONFIG.mapa;

    // Si no hay categorización, usar color base
    if (!columnaCategorizacion || !datosProvincia[columnaCategorizacion]) {
        return estilos.colorBase;
    }

    // Obtener categoría y su color
    const categoria = datosProvincia[columnaCategorizacion];
    const mapaColores = estilos.categorias[columnaCategorizacion];

    return mapaColores?.[categoria] || estilos.colorBase;
};

/**
 * Obtiene la opacidad según si hay mapa físico o no
 */
export const obtenerOpacidad = () => {
    const { mapaFisico } = APP_CONFIG.mapa.capasBase;
    const { estilos } = APP_CONFIG.mapa;

    return mapaFisico.activo ? estilos.opacidadConFondo : estilos.opacidadSinFondo;
};

/**
 * Obtiene los campos a mostrar en el panel (excluye campos internos)
 */
export const obtenerCamposMostrar = (datos) => {
    const camposExcluir = ['id', 'id_mapa', 'codigo_provincia', 'nombre'];
    return Object.keys(datos).filter(campo => !camposExcluir.includes(campo));
};