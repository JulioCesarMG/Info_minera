import React from 'react';

const PanelInformacion = ({ datos, nombreProvincia, onLimpiar, configTema, idioma }) => {
  // Textos fijos
  const textos = {
    es: {
      sinDatos: 'Sin datos disponibles',
      fuente: 'Fuente',
      verEnlace: 'Abrir enlace oficial',
      cargando: 'Cargando información...',
      clickNuevamente: 'Haz click nuevamente sobre el MAPA DE LA PROVINCIA para visualizar los datos'
    },
    en: {
      sinDatos: 'No data available',
      fuente: 'Source',
      verEnlace: 'Open official link',
      cargando: 'Loading information...',
      clickNuevamente: 'Click again on the PROVINCE MAP to view the data'
    }
  };
  const T = textos[idioma] || textos.es;

  // Obtener el valor correcto según idioma (detecta automáticamente columnas _ES/_EN)
  const obtenerValorBilingue = (key) => {
    if (!datos) return null;

    // Primero intenta con el sufijo del idioma (_ES o _EN)
    const keyConIdioma = `${key}_${idioma.toUpperCase()}`;
    if (datos[keyConIdioma] !== undefined && datos[keyConIdioma] !== null && datos[keyConIdioma] !== '') {
      return datos[keyConIdioma];
    }

    // Si no existe con sufijo, usa la columna sin sufijo (para datos no bilingües como números)
    if (datos[key] !== undefined && datos[key] !== null && datos[key] !== '') {
      return datos[key];
    }

    return null;
  };

  // Función para formatear los valores - MEJORADA
  const formatear = (valor, formato) => {
    if (!valor && valor !== 0) return <span className="text-gray-400 italic text-sm">{T.sinDatos}</span>;

    if (formato === 'moneda') {
      // Formato argentino: USD 1.234.567,89
      const numero = Number(valor).toLocaleString('es-AR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      return (
        <div className="flex items-baseline gap-2">
          <span className="text-emerald-700 font-bold text-3xl">{numero}</span>
          <span className="text-emerald-600 font-semibold text-lg">USD</span>
        </div>
      );
    }

    if (formato === 'numero') {
      // Formato argentino: 1.234.567
      return <span className="font-bold text-gray-900 text-3xl">{Number(valor).toLocaleString('es-AR')}</span>;
    }

    if (formato === 'link') {
      return (
        <a 
          href={valor} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-lg hover:underline transition-colors"
        >
          <span>🔗</span>
          <span>{T.verEnlace}</span>
        </a>
      );
    }

    // Texto normal - detecta si es largo para usar párrafo
    if (String(valor).length > 100) {
      return <p className="text-gray-800 text-lg leading-relaxed font-normal">{valor}</p>;
    }

    return <span className="text-gray-900 text-lg font-semibold">{valor}</span>;
  };

  // Verificar si hay datos válidos en los campos configurados
  const hayDatosValidos = () => {
    if (!datos) return false;

    // Verificar si al menos un campo tiene datos reales
    return configTema.campos.some(campo => {
      const valor = obtenerValorBilingue(campo.key);
      return valor !== undefined && valor !== null && valor !== '' && valor !== 'Sin datos disponibles';
    });
  };

  const hayDatos = hayDatosValidos();

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50 shadow-2xl animate-fade-in">
      {/* Cabecera con color dinámico según el tema */}
      <div className={`${configTema.estilos.border} border-b-4 ${configTema.estilos.bg} grid grid-cols-3 items-center gap-4 px-6 py-4 min-h-[120px]`}>
        
        {/* Columna izquierda: Nombre y badge */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 leading-tight tracking-tight mb-3">
            {nombreProvincia}
          </h2>
          <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${configTema.estilos.bg} ${configTema.estilos.text} ${configTema.estilos.border} border-2 text-sm font-bold uppercase shadow-sm w-fit`}>
            <span className="text-lg">{configTema.icono}</span>
            <span>{configTema.nombre[idioma]}</span>
          </div>
        </div>

        {/* Centro: Logo */}
        <div className="flex items-center justify-center">
          <img 
            src="/Info_minera/img/logo_mineria.png" 
            alt="Secretaría de Minería" 
            className="h-24 object-contain"
          />
        </div>

        {/* Derecha: Botón CERRAR */}
        <div className="flex items-center justify-end">
          <button
            onClick={onLimpiar}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2"
            title="Cerrar panel"
          >
            <span className="text-lg">✕</span>
            <span className="text-sm uppercase">Cerrar</span>
          </button>
        </div>
        
      </div>

      {/* Mensaje si no hay datos */}
      {!hayDatos && (
        <div className="flex-1 flex items-center justify-start p-8">
          <div className="max-w-md">
            <div className="text-7xl mb-6 animate-pulse">🔄</div>
            <p className="text-2xl font-bold text-gray-800 mb-4">{T.cargando}</p>
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-5 shadow-md">
              <p className="text-base text-blue-900 font-semibold leading-relaxed">
                💡 {T.clickNuevamente}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Lista de Datos */}
      {hayDatos && (
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {configTema.campos.map((campo, i) => {
            const valor = obtenerValorBilingue(campo.key);
            if (!valor && valor !== 0) return null; // No mostrar campos vacíos
            
            return (
              <div 
                key={i} 
                className="border-l-4 border-gray-300 pl-5 pb-6 hover:border-amber-500 transition-colors duration-200"
              >
                <p className="text-sm text-gray-600 uppercase font-bold tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  {campo.label[idioma]}
                </p>
                <div className="mt-1">
                  {formatear(valor, campo.formato)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer sutil */}
      <div className="px-6 py-3 bg-gray-100 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500 font-medium">
          Datos actualizados desde Google Sheets
        </p>
      </div>
    </div>
  );
};

export default PanelInformacion;