import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapaArgentina = ({ datosMineros, provinciaSeleccionada, onProvinciaClick }) => {
  const [geoJsonData, setGeoJsonData] = useState(null);

  // 1. CARGA DEL MAPA GEOMÉTRICO (MULTICAPA)
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/nexus-sun/argentina-geojson/master/provincias.json')
      .then(response => response.json())
      .then(data => setGeoJsonData(data))
      .catch(err => console.error("Error al cargar mapa:", err));
  }, []);

  // 2. ESTILO DE LAS PROVINCIAS
  const estiloProvincia = (feature) => {
    const nombreGeo = feature.properties.nombre; // Ej: "Santa Cruz"
    
    // Verificamos si esta provincia está en tu Excel
    const datoMinero = datosMineros.find(d => 
      d.Provincia && d.Provincia.toLowerCase().includes(nombreGeo.toLowerCase())
    );

    const esSeleccionada = provinciaSeleccionada && provinciaSeleccionada.id === datoMinero?.id;
    const tieneDatos = !!datoMinero;

    return {
      fillColor: esSeleccionada ? '#d97706' : (tieneDatos ? '#2563eb' : '#cbd5e1'), // Naranja, Azul o Gris
      weight: esSeleccionada ? 2 : 1,
      opacity: 1,
      color: 'white',
      fillOpacity: esSeleccionada ? 0.8 : 0.6
    };
  };

  // 3. CLICS Y EVENTOS
  const onEachFeature = (feature, layer) => {
    const nombreGeo = feature.properties.nombre;
    const datoMinero = datosMineros.find(d => 
      d.Provincia && d.Provincia.toLowerCase().includes(nombreGeo.toLowerCase())
    );

    layer.on({
      click: () => {
        if (datoMinero) {
          onProvinciaClick(datoMinero);
        }
      },
      mouseover: (e) => {
        if (datoMinero) {
          const layer = e.target;
          layer.setStyle({ fillOpacity: 0.9, weight: 2 });
        }
      },
      mouseout: (e) => {
        if (datoMinero) {
           // Al salir el mouse, simplemente dejamos que el estilo base se encargue
           e.target.setStyle({ fillOpacity: 0.6, weight: 1 });
        }
      }
    });
  };

  return (
    <MapContainer 
      center={[-40.0, -64.0]} 
      zoom={4} 
      className="h-full w-full bg-slate-100"
      scrollWheelZoom={true}
    >
      {/* Mapa Base Estándar (El que funcionaba bien) */}
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* La capa de provincias (GeoJSON) */}
      {geoJsonData && (
        <GeoJSON 
          data={geoJsonData} 
          style={estiloProvincia} 
          onEachFeature={onEachFeature} 
        />
      )}
    </MapContainer>
  );
};

export default MapaArgentina;