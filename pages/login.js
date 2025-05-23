import { signIn } from 'next-auth/react'; // Importiere die Funktion zum Anmelden aus next-auth
import { useState } from 'react'; // React Hook für lokale State-Verwaltung

export default function Login() {
  // Lokale State-Variablen für Benutzername und Passwort
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Funktion, die beim Absenden des Formulars ausgeführt wird
  const handleSubmit = async (e) => {
    e.preventDefault(); // Verhindert das automatische Neuladen der Seite

    // Aufruf von next-auths signIn-Funktion mit dem 'credentials'-Provider
    // Übergabe von Benutzername und Passwort sowie der Weiterleitungs-URL nach erfolgreichem Login
    await signIn('credentials', {
      username,
      password,
      callbackUrl: '/', // Nach erfolgreichem Login wird zur Startseite weitergeleitet
    });
  };

  // Gemeinsames Style-Objekt für die Input-Felder
  const inputStyle = {
    border: '2px solid black', // schwarzer Rahmen
    padding: '6px 8px',
    borderRadius: '4px',
    fontSize: '16px',
    outline: 'none',
  };

  return (
    <div style={{ padding: '2rem' }}>
      {/* Überschrift der Login-Seite */}
      <h1 style={{ fontSize: '32px', marginBottom: '1rem' }}>Login</h1>

      {/* Formular zum Eingeben von Benutzername und Passwort */}
      <form onSubmit={handleSubmit}>
        <div>
          {/* Label und Eingabefeld für den Benutzernamen */}
          <label>Benutzername:</label><br />
          <input
            style={inputStyle} // Style mit schwarzem Rahmen
            value={username} // Wert des Eingabefelds ist der State 'username'
            onChange={e => setUsername(e.target.value)} // State wird bei Eingabe aktualisiert
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          {/* Label und Eingabefeld für das Passwort */}
          <label>Passwort:</label><br />
          <input
            type="password" // Eingabe wird als Passwortfeld dargestellt (versteckt)
            style={inputStyle} // Style mit schwarzem Rahmen
            value={password} // Wert des Eingabefelds ist der State 'password'
            onChange={e => setPassword(e.target.value)} // State wird bei Eingabe aktualisiert
          />
        </div>

        {/* Absende-Button für das Formular */}
        <button
          type="submit"
          style={{
            marginTop: '1.5rem',
            padding: '8px 16px',
            fontSize: '16px',
            textDecoration: 'underline', // unterstreicht den Text
            background: 'none',           // optional: macht Hintergrund transparent
            border: 'none',               // optional: entfernt Rahmen
            cursor: 'pointer',            // zeigt den Zeiger beim Hover
            color: 'inherit'              // übernimmt die Textfarbe des Eltern-Elements
          }}
        >
          Anmelden
        </button>
      </form>
    </div>
  );
}
