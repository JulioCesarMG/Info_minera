import { APP_CONFIG } from '../config/appConfig';

const Footer = () => {
    const { footerPrincipal } = APP_CONFIG.interfaz.textos;

    return (
        <footer className="bg-gray-100 border-t-4 border-azul-gob py-6 mt-8">
            <div className="container mx-auto px-4">
                <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded mb-4">
                    <p className="text-gray-800 text-center font-medium text-lg">
                        {footerPrincipal}
                    </p>
                </div>
                <div className="text-center text-sm text-gray-600 mt-4">
                    <p className="font-semibold mb-2">Fuentes de datos oficiales:</p>
                    <p className="mt-1">
                        Geometría: <a
                            href="https://www.argentina.gob.ar/api-de-georef"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-azul-gob hover:underline font-medium"
                        >
                            API Georef Argentina
                        </a>
                    </p>
                    <p className="mt-1">
                        Información minera: SIACAM - Secretaría de Minería de la Nación
                    </p>
                    <p className="mt-3 text-xs text-gray-500">
                        Mapa base: OpenTopoMap (CC-BY-SA) | Datos: OpenStreetMap contributors
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;