import { useEffect, useState } from 'react';
// Recharts Komponenten importieren für das Liniendiagramm
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';
import { useRouter } from 'next/router';

// Button-Komponente zum Zurücknavigieren zur Startseite
function ZurueckZurStartseiteButton() {
  const router = useRouter(); // Next.js Router Hook zum Navigieren

  return (
    <button
      onClick={() => router.push('/')} // Bei Klick: Navigiere zur Startseite "/"
      style={{
        marginTop: '2rem',
        padding: '10px 20px',
        backgroundColor: '#813EB6', // Lila Hintergrund
        color: '#fff', // Weißer Text
        border: 'none',
        borderRadius: '5px', // Abgerundete Ecken
        cursor: 'pointer', // Mauszeiger wird Hand
        fontSize: '16px'
      }}
    >
      Zurück zur Startseite
    </button>
  );
}

// Hauptkomponente für das Dashboard mit Diagramm
export default function Dashboard() {
  // State für die geladenen Daten (Check-ins)
  const [data, setData] = useState([]);
  // State, um Gewichtslinie anzuzeigen oder auszublenden
  const [showGewicht, setShowGewicht] = useState(true);
  // State, um Hüftumfanglinie anzuzeigen oder auszublenden
  const [showHueftumfang, setShowHueftumfang] = useState(true);

  // useEffect Hook, der beim Laden der Komponente ausgeführt wird
  useEffect(() => {
    // Daten von der API holen
    fetch('/api/checkins')
      .then(res => res.json()) // Antwort als JSON parsen
      .then(rawData => {
        // Rohdaten in ein passendes Format umwandeln
        const formatted = rawData.map(entry => ({
          datum: new Date(entry.datum).toLocaleDateString('de-DE'), // Datum als deutscher String
          gewicht: parseFloat(entry.gewicht), // Gewicht in Zahl umwandeln
          hueftumfang: parseFloat(entry.hueftumfang), // Hüftumfang in Zahl umwandeln
        }));
        setData(formatted); // Formatierten Datensatz im State speichern
      });
  }, []); // Leeres Dependency-Array sorgt für Ausführung nur einmal beim ersten Rendern

  return (
    <div style={{ padding: '3rem', fontSize: '18px', padding: '10px 20px' }}>
      {/* Titel der Seite */}
      <h1 style={{ fontSize: '32px', marginBottom: '1rem' }}>Dashboard</h1>

      {/* Checkboxen zum Ein- und Ausblenden der Linien */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem' }}>
          <input
            type="checkbox"
            checked={showGewicht} // Checkbox zeigt aktuellen State
            onChange={() => setShowGewicht(!showGewicht)} // Bei Änderung State umkehren
          />
          Gewicht
        </label>

        <label>
          <input
            type="checkbox"
            checked={showHueftumfang}
            onChange={() => setShowHueftumfang(!showHueftumfang)}
          />
          Hüftumfang
        </label>
      </div>

      {/* Container, der das Diagramm responsiv macht */}
      <ResponsiveContainer width="100%" height={400}>
        {/* Liniendiagramm mit den geladenen Daten */}
        <LineChart data={data}>
          {/* Hintergrundgitter im Diagramm */}
          <CartesianGrid strokeDasharray="3 3" />
          {/* X-Achse, die das Datum als Beschriftung zeigt */}
          <XAxis dataKey="datum" />
          {/* Y-Achse, automatisch skaliert */}
          <YAxis />
          {/* Tooltip, der bei Hover Details anzeigt */}
          <Tooltip />
          {/* Legende, die Farben und Namen der Linien zeigt */}
          <Legend />

          {/* Gewicht-Linie nur anzeigen, wenn showGewicht true ist */}
          {showGewicht && (
            <Line
              type="monotone" // Linie wird glatt interpoliert
              dataKey="gewicht" // Wert für Y-Achse aus 'gewicht'
              stroke="#8884d8" // Linienfarbe lila
              strokeWidth={3} // Linienbreite (dicker als Standard)
              name="Gewicht (kg)" // Name in Legende und Tooltip
              dot={true} // Punkte auf der Linie anzeigen
            />
          )}

          {/* Hüftumfang-Linie nur anzeigen, wenn showHueftumfang true ist */}
          {showHueftumfang && (
            <Line
              type="monotone"
              dataKey="hueftumfang"
              stroke="#82ca9d" // Linienfarbe grün
              strokeWidth={3}
              name="Hüftumfang (cm)"
              dot={true}
            />
          )}
        </LineChart>
      </ResponsiveContainer>

      {/* Button zum Zurückkehren zur Startseite */}
      <ZurueckZurStartseiteButton />
    </div>
  );
}
