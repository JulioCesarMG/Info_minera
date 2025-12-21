# 🇦🇷 Mapa Minero Argentina

Aplicación web interactiva bilingüe para visualizar información de la industria minera argentina por provincia.


## 🚀 Características

### ✨ Funcionalidades Principales

- **Mapa Interactivo**: Visualización geográfica de las 24 provincias argentinas con límites oficiales del IGN
- **4 Temas de Información**: Economía, Legislación, Infraestructura y Proyectos
- **Bilingüe**: Interfaz completa en Español e Inglés
- **Datos en Tiempo Real**: Conexión directa a Google Sheets para actualizaciones sin código
- **Sistema Bilingüe Automático**: Detección automática de columnas `_ES` y `_EN`
- **Respaldo Offline**: Datos locales de demostración si falla la conexión
- **Responsive**: Adaptable a desktop, tablet y móvil

### 🗺️ Capas de Mapa Disponibles

- 🗺️ Mapa Base (sin etiquetas políticas)
- 🛰️ Vista Satelital
- 🌍 Mapa de Terreno

---

## 🛠️ Tecnologías

- **Frontend**: React 18.3.1 + Vite 6.0.3
- **Mapas**: Leaflet 1.9.4 + React-Leaflet 4.2.1
- **Estilos**: Tailwind CSS 3.4.17
- **Datos**: Google Sheets (CSV público) + PapaParse 5.4.1
- **Hosting**: GitHub Pages

---

## 📦 Instalación

### Prerrequisitos

- Node.js 16+ y npm

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/JulioCesarMG/Info_minera.git
cd Info_minera

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en navegador
# http://localhost:5173
```

---

## 🗂️ Estructura del Proyecto

```
Info_minera/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── MapaArgentina.jsx      # Mapa interactivo con Leaflet
│   │   └── PanelInformacion.jsx   # Panel lateral con datos
│   ├── App.jsx                     # Componente principal
│   ├── main.jsx                    # Punto de entrada
│   └── index.css                   # Estilos globales
├── vite.config.js                  # Configuración de Vite
├── tailwind.config.js              # Configuración de Tailwind
└── package.json
```

---

## 📊 Configuración de Datos (Google Sheets)

### Estructura Requerida

Cada tema (Economía, Legislación, etc.) debe tener una pestaña separada en el Google Sheet.

#### Columnas Obligatorias

- `id_mapa`: ID de provincia con formato `"02"`, `"06"`, `"10"`, etc. (con ceros a la izquierda)
- `Provincia`: Nombre oficial de la provincia

#### Sistema Bilingüe Automático

Para contenido bilingüe, usa columnas con sufijos `_ES` y `_EN`:

```csv
id_mapa,Provincia,Empleo_Total,Descripcion_ES,Descripcion_EN
06,Buenos Aires,8500,Principal productora,Main producer
```

**El sistema detecta automáticamente:**
- Si existe `Descripcion_ES` y `Descripcion_EN` → Usa según idioma del usuario
- Si solo existe `Empleo_Total` → Muestra el valor directo (números, fechas, etc.)

#### IDs Oficiales de Provincias

```
02 - CABA                    | 50 - Mendoza
06 - Buenos Aires            | 54 - Misiones
10 - Catamarca              | 58 - Neuquén
14 - Córdoba                | 62 - Río Negro
18 - Corrientes             | 66 - Salta
22 - Chaco                  | 70 - San Juan
26 - Chubut                 | 74 - San Luis
30 - Entre Ríos             | 78 - Santa Cruz
34 - Formosa                | 82 - Santa Fe
38 - Jujuy                  | 86 - Santiago del Estero
42 - La Pampa               | 90 - Tucumán
46 - La Rioja               | 94 - Tierra del Fuego
```

### Publicar Google Sheets

1. Abrir Google Sheets con tu cuenta
2. **Archivo → Compartir → Publicar en la web**
3. Seleccionar cada pestaña individualmente
4. Formato: **CSV**
5. Click **"Publicar"**
6. Copiar el GID de cada pestaña desde la URL

### Actualizar GIDs en el Código

Editar `src/App.jsx` en la sección `TEMAS`:

```javascript
const TEMAS = {
    economia: {
        id: 'economia',
        gid: '0',  // 👈 Tu GID aquí
        ...
    },
    legislacion: {
        id: 'legislacion',
        gid: '1710866367',  // 👈 Tu GID aquí
        ...
    }
}
```

---

## 🎨 Personalización

### Colores de Temas

Editar en `src/App.jsx` la propiedad `estilos` de cada tema:

```javascript
estilos: {
    border: 'border-amber-500',
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    // ... etc
}
```

### Agregar Nuevas Columnas

1. **En Google Sheets**: Agregar columna (ej: `Poblacion` o `Observaciones_ES`)
2. **En App.jsx**: Agregar a `campos` del tema correspondiente:

```javascript
campos: [
    { 
        label: { es: 'Población', en: 'Population' }, 
        key: 'Poblacion', 
        formato: 'numero' 
    }
]
```

**Formatos disponibles:**
- `texto`: Texto plano
- `numero`: Número con separadores (formato argentino: 1.234.567)
- `moneda`: Moneda USD (formato argentino: USD 1.234.567)
- `link`: Link clickeable

---

## 🚀 Deployment

### GitHub Pages (Configurado)

```bash
# Build y deploy automático
npm run deploy
```

### Comandos Disponibles

```bash
npm run dev      # Desarrollo local
npm run build    # Build de producción
npm run preview  # Preview del build
npm run deploy   # Deploy a GitHub Pages
```

---

## ⚙️ Variables de Configuración

### Centro y Zoom del Mapa

En `src/components/MapaArgentina.jsx`:

```javascript
center={[-40, -25]}  // [latitud, longitud]
zoom={4.5}           // Nivel de zoom inicial
minZoom={4}          // Zoom mínimo permitido
maxZoom={12}         // Zoom máximo permitido
```

### URL del Google Sheet

En `src/App.jsx`, función `cargarDatos`:

```javascript
const url = `https://docs.google.com/spreadsheets/d/e/TU_ID_AQUI/pub?gid=${gid}&single=true&output=csv`;
```

---

## 🔒 Consideraciones de Soberanía

### Islas Malvinas

- **Nomenclatura correcta**: "Islas Malvinas", "Puerto Argentino"
- **Prohibido**: "Falklands", "Stanley"
- Las capas de mapa actuales usan tiles sin etiquetas políticas para evitar nomenclatura británica
- El GeoJSON de límites provinciales proviene de datos.gob.ar (fuente oficial argentina)

---

## 🐛 Solución de Problemas

### "Sin datos disponibles" en todas las provincias

**Causa**: Google Sheet no publicado o GID incorrecto

**Solución**:
1. Verificar que el Sheet esté publicado en la web (CSV)
2. Verificar que el GID sea correcto en `App.jsx`
3. Abrir la URL del CSV directamente en el navegador para verificar

### El mapa no se centra correctamente

**Solución**: Ajustar `center` en `MapaArgentina.jsx`
- Más a la izquierda: reducir el segundo valor (ej: -20)
- Más a la derecha: aumentar el segundo valor (ej: -30)

### Formato de números incorrecto

**Verificar**: Debe usar formato argentino (1.234.567,89)
- Punto para miles
- Coma para decimales

---

## 📝 Licencia

Este proyecto fue desarrollado para uso gubernamental argentino.

---

## 👤 Autor

**Julio Cesar MG**
- GitHub: [@JulioCesarMG](https://github.com/JulioCesarMG)
- Proyecto: [Info_minera](https://github.com/JulioCesarMG/Info_minera)

---

## 📅 Última Actualización

Diciembre 2024 - Versión 1.0

---

## 🆘 Soporte

Para problemas o preguntas sobre el proyecto, crear un issue en GitHub.