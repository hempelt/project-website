import { PythonShell } from 'python-shell';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const options = {
        mode: 'text',
        pythonPath: 'python',  // Oder 'python' je nach Umgebung
        pythonOptions: ['-u'],
        scriptPath: path.join(process.cwd(), 'scripts'), // Der Ordner, in dem dein Python-Skript gespeichert ist
        args: [] // Hier können auch Daten übergeben werden, falls nötig
      };

      // Python-Skript ausführen
      const result = await PythonShell.run('plot_trend.py', options)
        .catch(e => res.status(500).json({ error: 'Fehler beim Ausführen des Python-Skripts' }));
      res.status(200).json({
        htmlFilePath: "trend.html",
        message: "success"
      })
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Abrufen der Daten' });
    }
  } else {
    res.status(405).json({ error: 'Methode nicht erlaubt' });
  }
}
