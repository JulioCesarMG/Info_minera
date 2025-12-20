import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Coordenadas fijas de las provincias (Latitud, Longitud)
const COORDENADAS_PROVINCIAS = {
  'Jujuy': [-23.0, -66.0],
  'Salta': [-24.5, -66.0],
  'Catamarca': [-27.0, -67.0],
  'San Juan': [-31.0, -69.0],
  'Santa Cruz': [-49.0, -70.0],
  // Fallback para evitar errores si no encuentra la provincia
  'default': [-40.0, -64.0]
};

const MapaArgentina = ({ datosMineros, provinciaSeleccionada, onProvinciaClick }) => {
  
  const obtenerCoords = (nombreProvincia) => {
    if (!nombreProvincia) return null;
    // Busca si el nombre del Excel (ej: "San Juan (Offline)") contiene la clave (ej: "San Juan")
    const clave = Object.keys(COORDENADAS_PROVINCIAS).find(key => 
      nombreProvincia.includes(key)
    );
    return COORDENADAS_PROVINCIAS[clave] || null;
  };

  return (
    <MapContainer 
      center={[-40.0, -64.0]} 
      zoom={4} 
      className="h-full w-full z-0" // Asegura que ocupe todo el espacio
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {datosMineros.map((dato, index) => {
        const coords = obtenerCoords(dato.Provincia);
        
        // Si no hay coordenadas, saltamos esta provincia sin romper nada
        if (!coords) return null;

        const esSeleccionada = provinciaSeleccionada && provinciaSeleccionada.id === dato.id;

        return (
          <CircleMarker
            key={index}
            center={coords}
            pathOptions={{
              color: esSeleccionada ? '#b45309' : '#2563eb', 
              fillColor: esSeleccionada ? '#d97706' : '#3b82f6',
              fillOpacity: 0.7,
              weight: esSeleccionada ? 3 : 2
            }}
            radius={esSeleccionada ? 15 : 10}
            eventHandlers={{
              click: () => onProvinciaClick(dato),
              mouseover: (e) => e.target.openPopup(),
              mouseout: (e) => e.target.closePopup()
            }}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
              <span className="font-bold">{dato.Provincia}</span>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
};

export default MapaArgentina;