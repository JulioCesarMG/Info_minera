import { useState } from 'react';
import MapaArgentina from './components/MapaArgentina';
import PanelInformacion from './components/PanelInformacion';
import { useDatosMineros } from './hooks/useDatosMineros';

function AppIntegrada() {
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(null);
  const { datos, loading, error } = useDatosMineros();

  const handleProvinciaClick = (provincia) => {
    setProvinciaSeleccionada(provincia);
  };

  const handleLimpiarSeleccion = () => {
    setProvinciaSeleccionada(null);
  };

  return (
    <div className="flex flex-col bg-gray-50 px-4 py-8">
      {loading && (
        <div className="bg-amber-50 border-l-4 border-amber-600 p-4 mb-6 rounded flex items-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-800 mr-3"></div>
          <p className="text-amber-800 font-medium">Cargando información minera...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6 rounded">
          <p className="text-red-800 font-medium">Error: {error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="flex gap-6" style={{ height: '80vh' }}>
          <div style={{ width: '50%' }} className="flex flex-col gap-4">
            <div style={{ height: '75%' }}>
              <MapaArgentina 
                onProvinciaClick={handleProvinciaClick} 
                datosMineros={datos}
                provinciaSeleccionada={provinciaSeleccionada}
              />
            </div>
            <div style={{ height: '25%' }} className="bg-white rounded-lg shadow-lg p-4">
              <p className="text-gray-600">Aquí irán los filtros</p>
            </div>
          </div>
          <div style={{ width: '50%' }}>
            <PanelInformacion 
              datos={provinciaSeleccionada?.datos} 
              nombreProvincia={provinciaSeleccionada?.nombre}
              onLimpiar={handleLimpiarSeleccion}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AppIntegrada;