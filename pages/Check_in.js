import { useState } from 'react';

export default function CheckIn() {
  // State für das Formular
  const [gewicht, setGewicht] = useState('');
  const [hueftumfang, setHueftumfang] = useState('');
  const [datum, setDatum] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Funktion, die beim Absenden des Formulars aufgerufen wird
  const handleSubmit = async (e) => {
    e.preventDefault(); // Verhindert das Standard-Formular-Submit-Verhalten

    // Reset der Fehler- und Erfolgsnachrichten
    setError('');
    setSuccess('');

    // Validierung der Eingabefelder
    if (!gewicht || !hueftumfang || !datum) {
      setError('Alle Felder müssen ausgefüllt sein!');
      return;
    }

    try {
      const res = await fetch('/api/check_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gewicht, hueftumfang, datum }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Neuer Eintrag erfolgreich hinzugefügt!');
        // Setze das Formular zurück
        setGewicht('');
        setHueftumfang('');
        setDatum('');
      } else {
        setError(data.error || 'Fehler beim Hinzufügen des Eintrags.');
      }
    } catch (error) {
      setError('Es gab einen Fehler beim Senden des Formulars.');
    }
  };

  return (
    <div>
      <h1>Neuen Eintrag hinzufügen</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="gewicht">Gewicht:</label>
          <input
            type="number"
            id="gewicht"
            value={gewicht}
            onChange={(e) => setGewicht(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="hueftumfang">Hüftumfang:</label>
          <input
            type="number"
            id="hueftumfang"
            value={hueftumfang}
            onChange={(e) => setHueftumfang(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="datum">Datum:</label>
          <input
            type="date"
            id="datum"
            value={datum}
            onChange={(e) => setDatum(e.target.value)}
            required
          />
        </div>

        <button type="submit">Eintrag speichern</button>
      </form>
    </div>
  );
}

  