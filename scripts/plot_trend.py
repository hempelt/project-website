import plotly.graph_objects as go
import psycopg2
import os

# Verbindung zur PostgreSQL-Datenbank herstellen
conn = psycopg2.connect(
    dbname="postgres", user="postgres", password="monitor", host="localhost", port="5432"
)
cur = conn.cursor()

# Abfrage der Trend-Daten
cur.execute('SELECT datum, gewicht FROM check_in ORDER BY datum ASC')
data = cur.fetchall()

# Daten vorbereiten
dates = [row[0] for row in data]
weights = [row[1] for row in data]

# Erstellen des LineCharts mit Plotly
fig = go.Figure()
fig.add_trace(go.Scatter(x=dates, y=weights, mode='lines+markers', name='Gewicht'))

# Diagramm-Layout anpassen
fig.update_layout(
    title='Trend der Gewichtsänderung',
    xaxis_title='Datum',
    yaxis_title='Gewicht (kg)',
    template='plotly_dark'
)

# Pfad zum Speichern der interaktiven HTML-Datei im 'public'-Ordner
output_path = os.path.join(os.getcwd(), 'public', 'trend.html')

# Sicherstellen, dass der Zielordner existiert
output_dir = os.path.dirname(output_path)
if not os.path.exists(output_dir):
    os.makedirs(output_dir)  # Falls der Ordner nicht existiert, erstelle ihn

# Diagramm als interaktive HTML-Datei speichern
fig.write_html(output_path)

# Aufräumen
cur.close()
conn.close()
