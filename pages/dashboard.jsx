import { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [showGewicht, setShowGewicht] = useState(true);
  const [showHueftumfang, setShowHueftumfang] = useState(true);

  useEffect(() => {
    fetch('/api/checkins')
      .then(res => res.json())
      .then(rawData => {
        const formatted = rawData.map(entry => ({
          datum: new Date(entry.datum).toLocaleDateString('de-DE'),
          gewicht: parseFloat(entry.gewicht),
          hueftumfang: parseFloat(entry.hueftumfang),
        }));
        setData(formatted);
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem' }}>
          <input
            type="checkbox"
            checked={showGewicht}
            onChange={() => setShowGewicht(!showGewicht)}
          />
          Gewicht anzeigen
        </label>

        <label>
          <input
            type="checkbox"
            checked={showHueftumfang}
            onChange={() => setShowHueftumfang(!showHueftumfang)}
          />
          Hüftumfang anzeigen
        </label>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="datum" />
          <YAxis />
          <Tooltip />
          <Legend />

          {showGewicht && (
            <Line
              type="monotone"
              dataKey="gewicht"
              stroke="#8884d8"
              name="Gewicht (kg)"
              dot={false}
            />
          )}

          {showHueftumfang && (
            <Line
              type="monotone"
              dataKey="hueftumfang"
              stroke="#82ca9d"
              name="Hüftumfang (cm)"
              dot={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
