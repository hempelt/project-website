import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [daten, setDaten] = useState([]);

  const fetchDaten = async () => {
    const res = await fetch('/api/daten');
    const data = await res.json();
    setDaten(data);
  };

  useEffect(() => {
    fetchDaten();
  }, []);

  const eintragLoeschen = async (id) => {
    if (!window.confirm('Willst du diesen Eintrag wirklich löschen?')) return;

    try {
      const res = await fetch('/api/daten', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        // Nach erfolgreichem Löschen Daten aktualisieren
        fetchDaten();
      } else {
        const err = await res.json();
        alert('Fehler: ' + err.error);
      }
    } catch (error) {
      console.error('Fehler beim Löschen:', error);
    }
  };

  return (
    <div>
      <h1>Daten</h1>
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
          {Array.isArray(daten) &&
            daten.map((eintrag) => (
              <tr key={eintrag.id}>
                <td>{eintrag.gewicht}</td>
                <td>{eintrag.hueftumfang}</td>
                <td>{eintrag.datum}</td>
                <td>
                  <button onClick={() => eintragLoeschen(eintrag.id)}>Löschen</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
