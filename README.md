# 🇦🇷 Mapa Minero Federal Interactivo

Aplicación web interactiva para visualizar datos económicos, legales y de infraestructura de la industria minera en Argentina, desglosados por provincia.

## 🚀 Características

* **Mapa Interactivo:** Visualización geográfica de provincias mineras (Jujuy, Salta, Catamarca, San Juan, Santa Cruz).
* **Conexión en Tiempo Real:** Los datos se obtienen directamente de **Google Sheets** (CSV), permitiendo actualizaciones instantáneas sin tocar el código.
* **Modo Bilingüe:** Interfaz completa en Español 🇦🇷 e Inglés 🇺🇸.
* **Respaldo Offline:** Si falla la conexión o Google Sheets, la app carga automáticamente datos locales de demostración para no romperse.
* **Diseño Responsivo:** Panel de información lateral adaptable y mapa centrado.

## 🛠️ Tecnologías

* **React + Vite:** Framework principal de alto rendimiento.
* **Leaflet / React-Leaflet:** Motor de mapas interactivos.
* **Tailwind CSS:** Estilizado moderno y responsivo.
* **PapaParse:** Procesamiento de datos CSV.

## ⚙️ Configuración de Datos (Google Sheets)

El proyecto está conectado a una hoja de cálculo de Google. Para actualizar los datos:

1.  Abre el archivo `src/App.jsx`.
2.  Busca la sección `TEMAS`.
3.  Actualiza el `gid` con el ID de la pestaña de tu Google Sheet:

```javascript
const TEMAS = {
  economia: {
    id: 'economia',
    gid: '1919087106', // <--- Tu ID real aquí
    // ...
  }
}
Nota: La hoja de cálculo debe estar publicada en la web (Archivo > Compartir > Publicar en la web > CSV).

📦 Instalación y Uso
Clonar el repositorio:

Bash

git clone [https://github.com/TU_USUARIO/Info_minera.git](https://github.com/TU_USUARIO/Info_minera.git)
cd Info_minera
Instalar dependencias:

Bash

npm install
Iniciar el servidor de desarrollo:

Bash

npm run dev
Abrir en el navegador: http://localhost:5173/

📋 Estado del Proyecto
[x] Visualización de Mapa Base.

[x] Panel de Información Lateral.

[x] Conexión a API Google Sheets (Economía).

[x] Traducción ES/EN.

[ ] Agregar coordenadas poligonales exactas de provincias.

[ ] Conectar hojas de Legislación e Infraestructura.

Desarrollado para el análisis del sector minero argentino.