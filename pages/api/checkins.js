import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]'; // Pfad ggf. anpassen
import pool from '@/lib/db';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Nicht angemeldet' });
  }

  const userId = session.user.id;

  try {
    const result = await pool.query(
      'SELECT datum, gewicht, hueftumfang FROM check_in WHERE user_id = $1 ORDER BY datum ASC',
      [userId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Fehler beim Abrufen der Check-in-Daten:', error);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
}
