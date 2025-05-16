import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]'; // Pfad zu deiner nextauth-Datei anpassen
import pool from '@/lib/db';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Nicht angemeldet' });
  }

  const userId = session.user.id;

  if (req.method === 'GET') {
    try {
      const result = await pool.query(
        'SELECT * FROM check_in WHERE user_id = $1 ORDER BY datum DESC',
        [userId]
      );
      return res.status(200).json(result.rows);
    } catch (error) {
      console.error('Fehler beim Abrufen:', error);
      return res.status(500).json({ error: 'Fehler beim Abrufen der Daten' });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'ID fehlt' });
    }

    try {
      await pool.query('DELETE FROM check_in WHERE id = $1', [id]);
      return res.status(200).json({ message: 'Eintrag gelöscht' });
    } catch (error) {
      console.error('Fehler beim Löschen:', error);
      return res.status(500).json({ error: 'Fehler beim Löschen' });
    }
  }

  return res.status(405).json({ error: 'Methode nicht erlaubt' });
}
