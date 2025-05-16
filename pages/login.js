import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn('credentials', {
      username,
      password,
      callbackUrl: '/',
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Benutzername:</label><br />
          <input value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Passwort:</label><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Anmelden</button>
      </form>
    </div>
  );
}
