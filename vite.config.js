import React from 'react';

const PanelInformacion = ({ datos, nombreProvincia, onLimpiar, configTema, idioma }) => {
    // Textos fijos
    const textos = {
        es: {
            sinDatos: 'Sin datos disponibles',
            fuente: 'Fuente',
            verEnlace: 'Abrir enlace oficial',
            cargando: 'Cargando información...',
            clickNuevamente: 'Haz click nuevamente sobre la provincia para cargar los datos'
        },
        en: {
            sinDatos: 'No data available',
            fuente: 'Source',
            verEnlace: 'Open official link',
            cargando: 'Loading information...',
            clickNuevamente: 'Click again on the province to load the data'
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

    // Función para formatear los valores
    const formatear = (valor, formato) => {
        if (!valor && valor !== 0) return <span className="text-gray-400 italic">{T.sinDatos}</span>;

        if (formato === 'moneda') {
            // Formato argentino: USD 1.234.567,89
            const numero = Number(valor).toLocaleString('es-AR', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            return <span className="text-green-700 font-mono font-bold">USD {numero}</span>;
        }

        if (formato === 'numero') {
            // Formato argentino: 1.234.567
            return <span className="font-bold">{Number(valor).toLocaleString('es-AR')}</span>;
        }

        if (formato === 'link') return <a href={valor} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">{T.verEnlace}</a>;

        return <span className="text-gray-800">{valor}</span>;
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
        <div className="flex flex-col h-full bg-white shadow-xl animate-fade-in">
            {/* Cabecera con color dinámico según el tema */}
            <div className={`p-5 ${configTema.estilos.border} border-b-4 bg-gray-50 flex justify-between items-start`}>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 leading-tight">{nombreProvincia}</h2>
                    <div className={`inline-flex items-center gap-2 mt-2 px-2 py-1 rounded ${configTema.estilos.bg} ${configTema.estilos.text} text-xs font-bold uppercase`}>
                        <span>{configTema.icono}</span>
                        <span>{configTema.nombre[idioma]}</span>
                    </div>
                </div>
                <button
                    onClick={onLimpiar}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-2 transition-colors"
                    aria-label="Cerrar panel"
                >
                    ✕
                </button>
            </div>

            {/* Mensaje si no hay datos */}
            {!hayDatos && (
                <div className="flex-1 flex items-center justify-start p-6 pl-8">
                    <div className="max-w-sm">
                        <div className="text-6xl mb-4">🔄</div>
                        <p className="text-lg font-semibold text-gray-700 mb-3">{T.cargando}</p>
                        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                            <p className="text-sm text-blue-800 font-medium">
                                💡 {T.clickNuevamente}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Lista de Datos */}
            {hayDatos && (
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                    {configTema.campos.map((campo, i) => {
                        const valor = obtenerValorBilingue(campo.key);
                        return (
                            <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">
                                    {campo.label[idioma]}
                                </p>
                                <div className="text-lg">
                                    {formatear(valor, campo.formato)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PanelInformacion;