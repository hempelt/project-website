import { useEffect, useState } from 'react';

export default function TrendPage() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [htmlFilePath, setHtmlFilePath] = useState('');

  useEffect(() => {
    const fetchTrendData = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/trend');
        const data = await res.json();

        if (data.message) {
          setMessage(data.message); // Nachricht vom Server
        }

        if (data.htmlFilePath) {
          // Setze den Pfad zur HTML-Datei
          setHtmlFilePath(data.htmlFilePath);
        }
      } catch (error) {
        console.error('Fehler beim Laden der Trend-Daten:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendData();
  }, []);

  return (
    <div>
      <h1>Trend der Gewichtsänderung</h1>
      {loading ? (
        <p>Bitte warten, das Diagramm wird geladen...</p>
      ) : htmlFilePath ? (
        <iframe src={htmlFilePath} width="100%" height="600px" title="Trend Diagramm"></iframe>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
}
