import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import MapaArgentina from './components/MapaArgentina';
import PanelInformacion from './components/PanelInformacion';

// --- 1. DATOS DE RESPALDO ---
const DATOS_LOCALES = [
    { id: '38', Provincia: 'Jujuy', Empleo_Total: 4500, Exportaciones: 850000000, Inversiones: 2000000, Autoridad: 'Min. Desarrollo', Link_BO: 'https://boletinoficial.jujuy.gob.ar', Rutas: 'RN 9, RN 52', Energia: 'Solar Cauchari', Minas_Activas: 'Sales de Jujuy', Mineral: 'Litio' },
    { id: '66', Provincia: 'Salta', Empleo_Total: 5200, Exportaciones: 600000000, Inversiones: 1500000, Autoridad: 'Sec. Minería', Link_BO: 'https://boletinoficial.salta.gob.ar', Rutas: 'RN 51', Energia: 'Interconectado', Minas_Activas: 'Lindero', Mineral: 'Oro' },
    { id: '10', Provincia: 'Catamarca', Empleo_Total: 6100, Exportaciones: 900000000, Inversiones: 3000000, Autoridad: 'Min. Minería', Link_BO: 'https://boletinoficial.catamarca.gob.ar', Rutas: 'RN 60', Energia: 'Línea 132kV', Minas_Activas: 'Fénix', Mineral: 'Litio' },
    { id: '70', Provincia: 'San Juan', Empleo_Total: 9800, Exportaciones: 1200000000, Inversiones: 5000000, Autoridad: 'Min. Minería', Link_BO: 'https://boletinoficial.sanjuan.gob.ar', Rutas: 'RN 40', Energia: 'Línea 500kV', Minas_Activas: 'Veladero', Mineral: 'Oro' },
    { id: '78', Provincia: 'Santa Cruz', Empleo_Total: 8500, Exportaciones: 1500000000, Inversiones: 4000000, Autoridad: 'Sec. Minería', Link_BO: 'https://boletinoficial.santacruz.gob.ar', Rutas: 'RN 3', Energia: 'Eólica', Minas_Activas: 'Cerro Negro', Mineral: 'Oro y Plata' }
];

// --- 2. CONFIGURACIÓN DE TEMAS (CON CLASES COMPLETAS PARA TAILWIND) ---
const TEMAS = {
    economia: {
        id: 'economia',
        gid: '0',
        nombre: { es: 'Economía', en: 'Economy' },
        icono: '💰',
        estilos: {
            border: 'border-amber-500',
            bg: 'bg-amber-50',
            text: 'text-amber-800',
            borderButton: 'border-b-4 border-amber-500',
            bgButton: 'bg-amber-50',
            textButton: 'text-amber-800'
        },
        campos: [
            { label: { es: 'Empleo', en: 'Employment' }, key: 'Empleo_Total', formato: 'numero' },
            { label: { es: 'Exportaciones', en: 'Exports' }, key: 'Exportaciones_USD', formato: 'moneda' },
            { label: { es: 'Inversiones', en: 'Investments' }, key: 'Inversiones_USD', formato: 'moneda' },
            { label: { es: 'Producción Anual', en: 'Annual Production' }, key: 'Produccion_Anual_Ton', formato: 'numero' }
        ]
    },
    legislacion: {
        id: 'legislacion',
        gid: '1710866367',
        nombre: { es: 'Legales', en: 'Legal' },
        icono: '⚖️',
        estilos: {
            border: 'border-blue-500',
            bg: 'bg-blue-50',
            text: 'text-blue-800',
            borderButton: 'border-b-4 border-blue-500',
            bgButton: 'bg-blue-50',
            textButton: 'text-blue-800'
        },
        campos: [
            { label: { es: 'Autoridad', en: 'Authority' }, key: 'Autoridad_Minera', formato: 'texto' },
            { label: { es: 'Código Minero', en: 'Mining Code' }, key: 'Codigo_Minero', formato: 'texto' },
            { label: { es: 'Legislación', en: 'Legislation' }, key: 'Link_Legislacion', formato: 'link' },
            { label: { es: 'Última Actualización', en: 'Last Update' }, key: 'Fecha_Actualizacion', formato: 'texto' }
        ]
    },
    infraestructura: {
        id: 'infraestructura',
        gid: '1890043494',
        nombre: { es: 'Infra', en: 'Infra' },
        icono: '🏗️',
        estilos: {
            border: 'border-orange-500',
            bg: 'bg-orange-50',
            text: 'text-orange-800',
            borderButton: 'border-b-4 border-orange-500',
            bgButton: 'bg-orange-50',
            textButton: 'text-orange-800'
        },
        campos: [
            { label: { es: 'Rutas', en: 'Roads' }, key: 'Rutas_Principales', formato: 'texto' },
            { label: { es: 'Energía', en: 'Energy' }, key: 'Energia_Disponible', formato: 'texto' },
            { label: { es: 'Puertos', en: 'Ports' }, key: 'Puertos', formato: 'texto' },
            { label: { es: 'Aeropuertos', en: 'Airports' }, key: 'Aeropuertos', formato: 'texto' },
            { label: { es: 'Red Ferroviaria', en: 'Railway' }, key: 'Red_Ferroviaria', formato: 'texto' }
        ]
    },
    proyectos: {
        id: 'proyectos',
        gid: '1683309243',
        nombre: { es: 'Proyectos', en: 'Projects' },
        icono: '⛏️',
        estilos: {
            border: 'border-emerald-500',
            bg: 'bg-emerald-50',
            text: 'text-emerald-800',
            borderButton: 'border-b-4 border-emerald-500',
            bgButton: 'bg-emerald-50',
            textButton: 'text-emerald-800'
        },
        campos: [
            { label: { es: 'Minas Activas', en: 'Active Mines' }, key: 'Minas_Activas', formato: 'numero' },
            { label: { es: 'Mineral', en: 'Mineral' }, key: 'Mineral_Principal', formato: 'texto' },
            { label: { es: 'Proyectos Exploración', en: 'Exploration Projects' }, key: 'Proyectos_Exploracion', formato: 'numero' },
            { label: { es: 'Empresas', en: 'Companies' }, key: 'Empresas_Principales', formato: 'texto' },
            { label: { es: 'Inversión 2024', en: 'Investment 2024' }, key: 'Inversion_2024_USD', formato: 'moneda' }
        ]
    }
};

function App() {
    const [temaActivo, setTemaActivo] = useState('economia');
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(null);
    const [idioma, setIdioma] = useState('es');
    const [datos, setDatos] = useState(DATOS_LOCALES);
    const [loading, setLoading] = useState(false);
    const [estadoConexion, setEstadoConexion] = useState('INICIANDO...');

    useEffect(() => {
        const cargarDatos = async () => {
            const gid = TEMAS[temaActivo].gid;
            if (!gid) {
                setDatos(DATOS_LOCALES);
                setEstadoConexion('OFFLINE (Modo Demo)');
                return;
            }
            setLoading(true);
            setProvinciaSeleccionada(null); // Limpiar provincia al cambiar tema
            try {
                const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTJSE4LsXAJn5i-OqMVzef2gxYgIFzv7cVvtiAn4bpk8vvqvTTgno_bAtS_gml3bzjui3os6s1dz_J8/pub?gid=${gid}&single=true&output=csv`;
                const response = await fetch(url);
                if (!response.ok) throw new Error('Error de conexión');
                const csv = await response.text();
                Papa.parse(csv, {
                    header: true, dynamicTyping: true, skipEmptyLines: true,
                    complete: (results) => {
                        setDatos(results.data);
                        setEstadoConexion('ONLINE 🟢');
                        setLoading(false);
                    },
                    error: () => {
                        setDatos(DATOS_LOCALES);
                        setEstadoConexion('ERROR CSV (Local)');
                        setLoading(false);
                    }
                });
            } catch (err) {
                setDatos(DATOS_LOCALES);
                setEstadoConexion('ERROR RED (Local)');
                setLoading(false);
            }
        };
        cargarDatos();
    }, [temaActivo]);

    // Actualizar datos de provincia seleccionada cuando cambien los datos
    useEffect(() => {
        if (provinciaSeleccionada && datos.length > 0) {
            const idBuscado = String(provinciaSeleccionada.id).padStart(2, '0');
            const datosActualizados = datos.find(dato => {
                const idDato = String(dato.id_mapa || dato.id).padStart(2, '0');
                return idDato === idBuscado;
            });

            setProvinciaSeleccionada(prev => ({
                ...prev,
                datos: datosActualizados || null
            }));
        }
    }, [datos]);

    const temaConfig = TEMAS[temaActivo];

    // Obtener datos actuales de la provincia seleccionada
    const getDatosProvinciaActual = () => {
        if (!provinciaSeleccionada || !datos.length) return null;

        const idBuscado = String(provinciaSeleccionada.id).padStart(2, '0');
        return datos.find(dato => {
            const idDato = String(dato.id_mapa || dato.id).padStart(2, '0');
            return idDato === idBuscado;
        });
    };

    return (
        <div className="flex flex-col h-screen w-full bg-gray-100 font-sans overflow-hidden">
            {/* HEADER */}
            <header className="bg-white px-4 py-2 shadow-sm z-50 flex justify-between items-center border-b shrink-0 h-14">
                <div>
                    <h1 className="text-lg font-bold text-gray-800">
                        {idioma === 'es' ? '🇦🇷 Mapa Minero' : '🇦🇷 Mining Map'}
                    </h1>
                    <p className="text-[10px] text-gray-500 font-mono flex items-center gap-2">
                        STATUS: <span className={`font-bold ${estadoConexion.includes('ONLINE') ? 'text-green-600' : 'text-orange-500'}`}>{estadoConexion}</span>
                    </p>
                </div>

                <button
                    onClick={() => setIdioma(i => i === 'es' ? 'en' : 'es')}
                    className="border border-gray-300 px-4 py-1 rounded-full text-sm font-bold hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                    {idioma === 'es'
                        ? <><span>🇦🇷</span> <span>Español</span></>
                        : <><span>🇺🇸</span> <span>English</span></>
                    }
                </button>
            </header>

            {/* ÁREA PRINCIPAL */}
            <div className="flex flex-1 overflow-hidden flex-row relative">
                {/* COLUMNA IZQUIERDA: MAPA */}
                <div className={`flex flex-col relative bg-white border-r border-gray-200 transition-all duration-500 ease-in-out ${provinciaSeleccionada ? 'w-full md:w-1/3' : 'w-full'}`}>
                    {loading && <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 animate-pulse z-50"></div>}

                    <div className="flex-1 relative z-0">
                        <MapaArgentina
                            datosMineros={datos}
                            provinciaSeleccionada={provinciaSeleccionada}
                            onProvinciaClick={setProvinciaSeleccionada}
                        />
                    </div>

                    {/* Menú inferior - CORREGIDO CON CLASES COMPLETAS */}
                    <div className="bg-white border-t p-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20 shrink-0">
                        <div className="flex justify-around gap-2">
                            {Object.values(TEMAS).map(tema => {
                                const activo = temaActivo === tema.id;
                                return (
                                    <button
                                        key={tema.id}
                                        onClick={() => {
                                            setTemaActivo(tema.id);
                                            setProvinciaSeleccionada(null);
                                        }}
                                        className={`flex-1 py-2 px-1 rounded-lg transition-all flex flex-col items-center ${activo
                                            ? `${tema.estilos.borderButton} ${tema.estilos.bgButton} ${tema.estilos.textButton}`
                                            : 'border-b-4 border-transparent text-gray-400 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="text-xl">{tema.icono}</span>
                                        <span className="text-[10px] md:text-xs font-bold uppercase mt-1">
                                            {tema.nombre[idioma]}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* COLUMNA DERECHA: PANEL DE INFORMACIÓN */}
                {provinciaSeleccionada && (
                    <div className="flex-1 bg-white shadow-xl z-40 flex flex-col h-full animate-fade-in overflow-hidden">
                        <PanelInformacion
                            datos={provinciaSeleccionada.datos}
                            nombreProvincia={provinciaSeleccionada.nombre}
                            onLimpiar={() => setProvinciaSeleccionada(null)}
                            configTema={temaConfig}
                            idioma={idioma}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;