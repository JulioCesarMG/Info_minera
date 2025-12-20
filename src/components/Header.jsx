import { APP_CONFIG } from '../config/appConfig';

const Header = () => {
    const { titulo, subtitulo } = APP_CONFIG.interfaz.textos;

    return (
        <header className="bg-gradient-to-r from-azul-gob to-azul-gob-dark text-white py-6 shadow-lg">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl md:text-4xl font-bold text-center">
                    {titulo}
                </h1>
                {subtitulo && (
                    <p className="text-center text-blue-100 mt-2 text-sm">
                        {subtitulo}
                    </p>
                )}
            </div>
        </header>
    );
};

export default Header;