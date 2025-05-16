import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]'; // Pfad ggf. anpassen
import pool from '@/lib/db';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Nicht angemeldet' });
  }

  const userId = session.user.id;

  if (req.method === 'POST') {
    const { gewicht, hueftumfang, datum } = req.body;

    // Validierung
    if (!gewicht || !hueftumfang || !datum) {
      return res.status(400).json({ error: 'Alle Felder sind erforderlich' });
    }

    try {
      const result = await pool.query(
        'INSERT INTO check_in (gewicht, hueftumfang, datum, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [gewicht, hueftumfang, datum, userId]
      );
      return res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Eintrags:', error);
      return res.status(500).json({ error: 'Interner Serverfehler' });
    }
  } else {
    res.status(405).json({ error: 'Methode nicht erlaubt' });
  }
}
