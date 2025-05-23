import { useState } from 'react';  // React Hook für lokale State-Verwaltung importieren
import { useRouter } from 'next/router'; // Next.js Hook für Navigation importieren

// Komponente für einen Button, der zurück zur Startseite navigiert
function ZurueckZurStartseiteButton() {
  const router = useRouter(); // Router-Instanz holen, um programmatisch navigieren zu können

  return (
    <button
      onClick={() => router.push('/')} // Beim Klick wird zur Startseite navigiert
      style={{
        padding: '10px 20px',
        backgroundColor: '#813EB6', // lila Hintergrundfarbe
        color: '#fff', // weiße Schrift
        border: 'none',
        borderRadius: '5px', // abgerundete Ecken
        cursor: 'pointer', // Mauszeiger wird zur Hand bei Hover
        fontSize: '16px',
        marginTop: '20px' // Abstand nach oben
      }}
    >
      Zurück zur Startseite
    </button>
  );
}

// Hauptkomponente für das Check-in Formular
export default function CheckIn() {
  // Lokale States für die Formularfelder
  const [gewicht, setGewicht] = useState('');         // Gewicht als String
  const [hueftumfang, setHueftumfang] = useState(''); // Hüftumfang als String
  const [datum, setDatum] = useState('');             // Datum als String

  // State für Fehlermeldungen
  const [error, setError] = useState('');
  // State für Erfolgsmeldungen
  const [success, setSuccess] = useState('');

  // Funktion, die beim Absenden des Formulars aufgerufen wird
  const handleSubmit = async (e) => {
    e.preventDefault();  // Verhindert das automatische Neuladen der Seite

    setError('');   // Fehler- und Erfolgsmeldungen zurücksetzen
    setSuccess('');

    // Überprüfung: Sind alle Felder ausgefüllt?
    if (!gewicht || !hueftumfang || !datum) {
      setError('Alle Felder müssen ausgefüllt sein!'); // Fehlermeldung setzen
      return; // Funktion hier abbrechen
    }

    try {
      // Anfrage an die API senden, um den neuen Eintrag zu speichern
      const res = await fetch('/api/check_in', {
        method: 'POST', // HTTP POST Methode
        headers: { 'Content-Type': 'application/json' }, // JSON Body
        body: JSON.stringify({ gewicht, hueftumfang, datum }), // Daten als JSON
      });

      // Antwort der API auslesen
      const data = await res.json();

      if (res.ok) {
        // Wenn die Antwort OK ist, Erfolgsmeldung anzeigen
        setSuccess('Neuer Eintrag erfolgreich hinzugefügt!');
        // Formularfelder zurücksetzen (leeren)
        setGewicht('');
        setHueftumfang('');
        setDatum('');
      } else {
        // Wenn Fehler von der API kommt, Fehlermeldung anzeigen
        setError(data.error || 'Fehler beim Hinzufügen des Eintrags.');
      }
    } catch (error) {
      // Fehler beim Senden der Anfrage abfangen und anzeigen
      setError('Es gab einen Fehler beim Senden des Formulars.');
    }
  };

  return (
    <div>
      {/* Überschrift der Seite */}
      <h1 style={{ fontSize: '32px', marginBottom: '1rem' }}>Check in</h1>

      {/* Fehlermeldung anzeigen, falls vorhanden */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* Erfolgsmeldung anzeigen, falls vorhanden */}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* Formular zur Eingabe der Werte */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="gewicht">Gewicht:</label>
          {/* Eingabefeld für Gewicht */}
          <input
            type="number"
            id="gewicht"
            value={gewicht} // Wert an State gebunden
            onChange={(e) => setGewicht(e.target.value)} // State aktualisieren bei Änderung
            required // HTML5 Validierung - Feld ist Pflicht
            style={{ border: '1px solid black', padding: '2px', borderRadius: '3px' }}
          />
        </div>

        <div>
          <label htmlFor="hueftumfang">Hüftumfang:</label>
          {/* Eingabefeld für Hüftumfang */}
          <input
            type="number"
            id="hueftumfang"
            value={hueftumfang}
            onChange={(e) => setHueftumfang(e.target.value)}
            required
            style={{ border: '1px solid black', padding: '3px', borderRadius: '3px' }}
          />
        </div>

        <div>
          <label htmlFor="datum">Datum:</label>
          {/* Eingabefeld für Datum */}
          <input
            type="date"
            id="datum"
            value={datum}
            onChange={(e) => setDatum(e.target.value)}
            required
          />
        </div>

        {/* Button zum Absenden des Formulars */}
        <button
          type="submit"
          style={{
            background: 'none',
            border: 'none',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: '16px',
            padding: '0',               // optional, kein extra Innenabstand
            marginTop: '1rem'           // Abstand nach oben, falls gewünscht
          }}
        >
          Eintrag speichern
        </button>
      </form>

      {/* Button zur Navigation zurück zur Startseite */}
      <ZurueckZurStartseiteButton />
    </div>
  );
}
