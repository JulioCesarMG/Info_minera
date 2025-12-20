import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export const useDatosMineros = (gidHoja) => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!gidHoja) return;

    const cargarDatos = async () => {
      setLoading(true);
      try {
        // Tu URL de Google Sheets (la misma de antes)
        const BASE_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT9Nl6HpmnMQ1VxSP8kkPUK8iuy1xKMzTzSKtFqszencjoXkzxD5b1wvCPnEHB6kaKVTVyvNdqRlV_p/pub';

        const response = await fetch(`${BASE_URL}?gid=${gidHoja}&single=true&output=csv`);

        if (!response.ok) throw new Error('Error al conectar con Google Sheets');

        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: (results) => {
            setDatos(results.data);
            setLoading(false);
          },
          error: (error) => {
            setError(error.message);
            setLoading(false);
          }
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    cargarDatos();
  }, [gidHoja]);

  return { datos, loading, error };
};