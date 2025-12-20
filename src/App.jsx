import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import MapaArgentina from './components/MapaArgentina';
import PanelInformacion from './components/PanelInformacion';

// --- 1. DATOS DE RESPALDO (Crucial para que Vercel no de error rojo) ---
const DATOS_LOCALES = [
  { id: '38', Provincia: 'Jujuy', Empleo_Total: 4500, Exportaciones: 850000000, Inversiones: 2000000, Autoridad: 'Min. Desarrollo', Link_BO: 'https://boletinoficial.jujuy.gob.ar', Rutas: 'RN 9, RN 52', Energia: 'Solar Cauchari', Minas_Activas: 'Sales de Jujuy', Mineral: 'Litio' },
  { id: '66', Provincia: 'Salta', Empleo_Total: 5200, Exportaciones: 600000000, Inversiones: 1500000, Autoridad: 'Sec. Minería', Link_BO: 'https://boletinoficial.salta.gob.ar', Rutas: 'RN 51', Energia: 'Interconectado', Minas_Activas: 'Lindero', Mineral: 'Oro' },
  { id: '10', Provincia: 'Catamarca', Empleo_Total: 6100, Exportaciones: 900000000, Inversiones: 3000000, Autoridad: 'Min. Minería', Link_BO: 'https://boletinoficial.catamarca.gob.ar', Rutas: 'RN 60', Energia: 'Línea 132kV', Minas_Activas: 'Fénix', Mineral: 'Litio' },
  { id: '70', Provincia: 'San Juan', Empleo_Total: 9800, Exportaciones: 1200000000, Inversiones: 5000000, Autoridad: 'Min. Minería', Link_BO: 'https://boletinoficial.sanjuan.gob.ar', Rutas: 'RN 40', Energia: 'Línea 500kV', Minas_Activas: 'Veladero', Mineral: 'Oro' },
  { id: '78', Provincia: 'Santa Cruz', Empleo_Total: 8500, Exportaciones: 1500000000, Inversiones: 4000000, Autoridad: 'Sec. Minería', Link_BO: 'https://boletinoficial.santacruz.gob.ar', Rutas: 'RN 3', Energia: 'Eólica', Minas_Activas: 'Cerro Negro', Mineral: 'Oro y Plata' }
];

// --- 2. CONFIGURACIÓN DE TEMAS ---
const TEMAS = {
  economia: {
    id: 'economia',
    gid: '1919087106', // ✅ TU ID REAL
    nombre: { es: 'Economía', en: 'Economy' },
    icono: '💰',
    color: 'amber',
    campos: [
      { label: { es: 'Empleo', en: 'Employment' }, key: 'Empleo_Total', formato: 'numero' },
      { label: { es: 'Exportaciones', en: 'Exports' }, key: 'Exportaciones', formato: 'moneda' },
      { label: { es: 'Inversiones', en: 'Investments' }, key: 'Inversiones', formato: 'moneda' }
    ]
  },
  legislacion: {
    id: 'legislacion',
    gid: '0', 
    nombre: { es: 'Legales', en: 'Legal' },
    icono: '⚖️',
    color: 'blue',
    campos: [
      { label: { es: 'Autoridad', en: 'Authority' }, key: 'Autoridad', formato: 'texto' },
      { label: { es: 'Normativa', en: 'Regulation' }, key: 'Link_BO', formato: 'link' }
    ]
  },
  infraestructura: {
    id: 'infraestructura',
    gid: '0', 
    nombre: { es: 'Infra', en: 'Infra' },
    icono: '🏗️',
    color: 'orange',
    campos: [
      { label: { es: 'Rutas', en: 'Roads' }, key: 'Rutas', formato: 'texto' },
      { label: { es: 'Energía', en: 'Energy' }, key: 'Energia', formato: 'texto' }
    ]
  },
  proyectos: {
    id: 'proyectos',
    gid: '0',
    nombre: { es: 'Proyectos', en: 'Projects' },
    icono: '⛏️',
    color: 'emerald',
    campos: [
      { label: { es: 'Minas', en: 'Mines' }, key: 'Minas_Activas', formato: 'texto' },
      { label: { es: 'Mineral', en: 'Mineral' }, key: 'Mineral', formato: 'texto' }
    ]
  }
};

function App() {
  const [temaActivo, setTemaActivo] = useState('economia');
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(null);
  const [idioma, setIdioma] = useState('es');
  
  // Estado inicial con DATOS_LOCALES para evitar pantalla blanca/roja al inicio
  const [datos, setDatos] = useState(DATOS_LOCALES);
  const [loading, setLoading] = useState(false);
  const [estadoConexion, setEstadoConexion] = useState('INICIANDO...');

  useEffect(() => {
    const cargarDatos = async () => {
      const gid = TEMAS[temaActivo].gid;
      if (!gid || gid === '0') {
        setDatos(DATOS_LOCALES);
        setEstadoConexion('OFFLINE (Modo Demo)');
        return;
      }
      setLoading(true);
      try {
        const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vT9Nl6HpmnMQ1VxSP8kkPUK8iuy1xKMzTzSKtFqszencjoXkzxD5b1wvCPnEHB6kaKVTVyvNdqRlV_p/pub?gid=${gid}&single=true&output=csv`;
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
            setDatos(DATOS_LOCALES); // FALLBACK: Si falla CSV, usa local
            setEstadoConexion('ERROR CSV (Local)');
            setLoading(false);
          }
        });
      } catch (err) {
        setDatos(DATOS_LOCALES); // FALLBACK: Si falla red, usa local
        setEstadoConexion('ERROR RED (Local)');
        setLoading(false);
      }
    };
    cargarDatos();
  }, [temaActivo]);

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 font-sans overflow-hidden">
      
      {/* HEADER */}
      <header className="bg-white px-4 py-2 shadow-sm z-50 flex justify-between items-center border-b shrink-0 h-14">
        <div>
          <h1 className="text-lg font-bold text-gray-800">
            {idioma === 'es' ? '🇦🇷 Mapa Minero V2' : '🇦🇷 Mining Map'}
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
        
        <div className={`
            flex flex-col relative bg-white border-r border-gray-200 transition-all duration-500 ease-in-out
            ${provinciaSeleccionada ? 'w-full md:w-1/3' : 'w-full'}
        `}>
          
          {loading && <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 animate-pulse z-50"></div>}

          <div className="flex-1 relative z-0">
            <MapaArgentina 
              datosMineros={datos} 
              provinciaSeleccionada={provinciaSeleccionada}
              onProvinciaClick={setProvinciaSeleccionada}
            />
          </div>

          <div className="bg-white border-t p-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20 shrink-0">
            <div className="flex justify-around gap-2">
              {Object.values(TEMAS).map(tema => (
                <button
                  key={tema.id}
                  onClick={() => { setTemaActivo(tema.id); setProvinciaSeleccionada(null); }}
                  className={`flex-1 py-2 px-1 rounded-lg border-b-4 transition-all flex flex-col items-center 
                    ${temaActivo === tema.id 
                      ? `border-${tema.color}-500 bg-${tema.color}-50 text-${tema.color}-800` 
                      : 'border-transparent text-gray-400 hover:bg-gray-50'}`}
                >
                  <span className="text-xl">{tema.icono}</span>
                  <span className="text-[10px] md:text-xs font-bold uppercase mt-1">{tema.nombre[idioma]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {provinciaSeleccionada && (
          <div className="flex-1 bg-white shadow-xl z-40 flex flex-col h-full animate-fade-in overflow-hidden">
            <PanelInformacion 
              datos={provinciaSeleccionada.datos}
              nombreProvincia={provinciaSeleccionada.nombre}
              onLimpiar={() => setProvinciaSeleccionada(null)}
              configTema={TEMAS[temaActivo]}
              idioma={idioma}
            />
          </div>
        )}

      </div>
    </div>
  );
}

export default App;