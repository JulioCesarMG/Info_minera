import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MapaArgentina from './components/MapaArgentina';
import PanelInformacion from './components/PanelInformacion';
import { useDatosMineros } from './hooks/useDatosMineros';

function AppStandalone() {
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(null);
    const { datos, loading, error } = useDatosMineros();

    const handleProvinciaClick = (provincia) => {
        setProvinciaSeleccionada(provincia);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                {loading && (
                    <div className="bg-amber-50 border-l-4 border-amber-600 p-4 mb-6 rounded">
                        <p className="text-amber-800 font-medium">Cargando datos...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6 rounded">
                        <p className="text-red-800 font-medium">Error: {error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
                    <div className="lg:col-span-2 h-full">
                        <MapaArgentina onProvinciaClick={handleProvinciaClick} datosMineros={datos} />
                    </div>
                    <div className="h-full">
                        <PanelInformacion datos={provinciaSeleccionada?.datos} nombreProvincia={provinciaSeleccionada?.nombre} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default AppStandalone;