export const TEMAS = {
    economia: {
        id: 'economia',
        nombre: { es: 'Datos Económicos', en: 'Economic Data' },
        icono: '💰',
        gid: '0', // <--- RECUERDA: AQUÍ VA TU GID REAL DE LA HOJA
        color: 'amber',
        campos: [
            { label: { es: 'Empleo Directo', en: 'Direct Employment' }, key: 'Empleo_Total', formato: 'numero' },
            { label: { es: 'Exportaciones', en: 'Exports' }, key: 'Exportaciones', formato: 'moneda' },
            { label: { es: 'Inversiones', en: 'Investments' }, key: 'Inversiones', formato: 'moneda' }
        ]
    },
    legislacion: {
        id: 'legislacion',
        nombre: { es: 'Marco Legal', en: 'Legal Framework' },
        icono: '⚖️',
        gid: '1111', // <--- RECUERDA: AQUÍ VA TU GID REAL
        color: 'blue',
        campos: [
            { label: { es: 'Código Procesal', en: 'Procedural Code' }, key: 'Codigo_Proc', formato: 'texto' },
            { label: { es: 'Autoridad', en: 'Authority' }, key: 'Autoridad', formato: 'texto' },
            { label: { es: 'Link Boletín Oficial', en: 'Official Gazette Link' }, key: 'Link_BO', formato: 'link' }
        ]
    },
    infraestructura: {
        id: 'infraestructura',
        nombre: { es: 'Infraestructura', en: 'Infrastructure' },
        icono: '🏗️',
        gid: '2222', // <--- RECUERDA: AQUÍ VA TU GID REAL
        color: 'orange',
        campos: [
            { label: { es: 'Rutas', en: 'Roads' }, key: 'Rutas', formato: 'texto' },
            { label: { es: 'Energía', en: 'Energy Access' }, key: 'Energia', formato: 'texto' }
        ]
    },
    proyectos: {
        id: 'proyectos',
        nombre: { es: 'Proyectos', en: 'Projects' },
        icono: '⛏️',
        gid: '3333', // <--- RECUERDA: AQUÍ VA TU GID REAL
        color: 'emerald',
        campos: [
            { label: { es: 'Minas Activas', en: 'Active Mines' }, key: 'Minas_Activas', formato: 'texto' },
            { label: { es: 'Mineral Principal', en: 'Main Mineral' }, key: 'Mineral', formato: 'texto' }
        ]
    }
};