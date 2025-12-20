import React from 'react';

const PanelInformacion = ({ datos, nombreProvincia, onLimpiar, configTema, idioma }) => {
  // Textos fijos
  const textos = {
    es: { sinDatos: 'Sin datos disponibles', fuente: 'Fuente', verEnlace: 'Abrir enlace oficial' },
    en: { sinDatos: 'No data available', fuente: 'Source', verEnlace: 'Open official link' }
  };
  const T = textos[idioma] || textos.es;

  if (!datos) return null;

  // Función para formatear los valores
  const formatear = (valor, formato) => {
    if (!valor && valor !== 0) return <span className="text-gray-400 italic">{T.sinDatos}</span>;

    if (formato === 'moneda') return <span className="text-green-700 font-mono font-bold">USD {Number(valor).toLocaleString('en-US')}</span>;
    if (formato === 'numero') return <span className="font-bold">{Number(valor).toLocaleString('es-AR')}</span>;
    if (formato === 'link') return <a href={valor} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">{T.verEnlace}</a>;

    return <span className="text-gray-800">{valor}</span>;
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-xl animate-fade-in">
      {/* Cabecera con color dinámico según el tema */}
      <div className={`p-5 border-b-4 border-${configTema.color}-500 bg-gray-50 flex justify-between items-start`}>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 leading-tight">{nombreProvincia}</h2>
          <div className={`inline-flex items-center gap-2 mt-2 px-2 py-1 rounded bg-${configTema.color}-100 text-${configTema.color}-800 text-xs font-bold uppercase`}>
            <span>{configTema.icono}</span>
            <span>{configTema.nombre[idioma]}</span>
          </div>
        </div>
        <button
          onClick={onLimpiar}
          className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-2 transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Lista de Datos */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {configTema.campos.map((campo, i) => (
          <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">
              {campo.label[idioma]}
            </p>
            <div className="text-lg">
              {formatear(datos[campo.key], campo.formato)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanelInformacion;