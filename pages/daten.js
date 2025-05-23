import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Button-Komponente, die zurück zur Startseite navigiert
function ZurueckZurStartseiteButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/')} // Navigation zur Startseite beim Klick
      style={{
        padding: '10px 20px',
        backgroundColor: '#813EB6',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '20px'
      }}
    >
      Zurück zur Startseite
    </button>
  );
}

export default function Dashboard() {
  // State für die geladenen Daten aus der API
  const [daten, setDaten] = useState([]);

  // Funktion zum Laden der Daten vom Server
  const fetchDaten = async () => {
    const res = await fetch('/api/daten'); // Anfrage an API
    const data = await res.json();          // Antwort in JSON umwandeln
    setDaten(data);                         // State aktualisieren
  };

  // useEffect läuft einmal beim Mounten der Komponente
  useEffect(() => {
    fetchDaten(); // Daten laden, sobald die Komponente angezeigt wird
  }, []);

  // Funktion zum Löschen eines Eintrags anhand der ID
  const eintragLoeschen = async (id) => {
    // Sicherheitsabfrage vor dem Löschen
    if (!window.confirm('Willst du diesen Eintrag wirklich löschen?')) return;

    try {
      // DELETE-Request an die API mit ID im Body
      const res = await fetch('/api/daten', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        // Daten neu laden nach erfolgreichem Löschen
        fetchDaten();
      } else {
        // Fehler aus API auslesen und anzeigen
        const err = await res.json();
        alert('Fehler: ' + err.error);
      }
    } catch (error) {
      // Fehler bei der Anfrage protokollieren
      console.error('Fehler beim Löschen:', error);
    }
  };

  return (
    <div>
      {/* Überschrift der Seite */}
      <h1 style={{ fontSize: '32px', marginBottom: '1rem' }}>Daten</h1>

      {/* Tabelle zur Anzeige der Daten */}
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Gewicht</th>
            <th>Hüftumfang</th>
            <th>Datum</th>
            <th>Aktion</th>
          </tr>
        </thead>
        <tbody>
          {/* Falls daten ein Array ist, Einträge mappen und anzeigen */}
          {Array.isArray(daten) &&
            daten.map((eintrag) => (
              <tr key={eintrag.id}>
                <td>{eintrag.gewicht}</td>
                <td>{eintrag.hueftumfang}</td>
                <td>{eintrag.datum}</td>
                <td>
                  {/* Löschen-Button ruft Löschfunktion mit Eintrags-ID auf */}
                  <button onClick={() => eintragLoeschen(eintrag.id)}>Löschen</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Button zur Navigation zurück zur Startseite */}
      <ZurueckZurStartseiteButton />
    </div>
  );
}
