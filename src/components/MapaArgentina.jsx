import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const { BaseLayer } = LayersControl;

const MapaArgentina = ({ onProvinciaClick, datosMineros, provinciaSeleccionada }) => {
  const [geojsonData, setGeojsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarGeojson = async () => {
      try {
        const response = await fetch('/api/georef/provincias.geojson');
        if (!response.ok) {
          throw new Error('Error al cargar el mapa');
        }
        const data = await response.json();
        setGeojsonData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    cargarGeojson();
  }, []);

  const obtenerDatosProvincia = (provinciaId) => {
    if (!datosMineros || datosMineros.length === 0) return null;

    const idNum = parseInt(provinciaId, 10);

    return datosMineros.find(dato =>
      parseInt(dato.id_mapa, 10) === idNum ||
      parseInt(dato.id, 10) === idNum
    );
  };

  const estiloBase = (feature) => {
    const esSeleccionada = provinciaSeleccionada?.id === feature.properties.id;

    return {
      fillColor: esSeleccionada ? '#F59E0B' : '#C9A882',
      weight: esSeleccionada ? 3 : 2,
      opacity: 1,
      color: esSeleccionada ? '#F59E0B' : '#ffffff',
      fillOpacity: 0.3
    };
  };

  const onEachFeature = (feature, layer) => {
    const nombreProvincia = feature.properties.nombre;

    layer.bindTooltip(nombreProvincia, {
      permanent: false,
      direction: 'center',
      className: 'provincia-tooltip'
    });

    layer.on({
      mouseover: (e) => {
        const esSeleccionada = provinciaSeleccionada?.id === feature.properties.id;
        if (!esSeleccionada) {
          e.target.setStyle({
            fillColor: '#D4B896',
            fillOpacity: 0.6
          });
        }
      },
      mouseout: (e) => {
        e.target.setStyle(estiloBase(feature));
      },
      click: () => {
        const datosProvincia = obtenerDatosProvincia(feature.properties.id);
        onProvinciaClick({
          id: feature.properties.id,
          nombre: nombreProvincia,
          datos: datosProvincia
        });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-azul-gob mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando mapa...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-red-50 rounded-lg">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={[-20, -65]}
      zoom={3}
      minZoom={3}
      maxZoom={12}
      style={{ height: '100%', width: '100%' }}
      className="rounded-lg shadow-lg"
    >
      <LayersControl position="topright">
        <BaseLayer checked name="🗺️ Mapa Político">
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
          />
        </BaseLayer>

        <BaseLayer name="🏔️ Mapa Físico">
          <TileLayer
            attribution='&copy; OpenTopoMap'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            maxZoom={17}
          />
        </BaseLayer>

        <BaseLayer name="🏙️ Calles">
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </BaseLayer>

        <BaseLayer name="🛰️ Satélite">
          <TileLayer
            attribution='&copy; Esri'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </BaseLayer>
      </LayersControl>

      {geojsonData && (
        <GeoJSON
          data={geojsonData}
          style={estiloBase}
          onEachFeature={onEachFeature}
          key={provinciaSeleccionada?.id}
        />
      )}
    </MapContainer>
  );
};

export default MapaArgentina;