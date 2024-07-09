from flask import Flask, render_template, jsonify
import pandas as pd
import folium
from folium.plugins import MarkerCluster, HeatMap

app = Flask(__name__)

def create_map():
    # Load data
    data = pd.read_csv('C:/Users/preet/OneDrive/Desktop/cr/Main Page with sign in/backend/crime_reports.csv')

    # Initialize map with appropriate settings to prevent multiple worlds
    m = folium.Map(
        location=[data['latitude'].mean(), data['longitude'].mean()],
        zoom_start=12,
        max_bounds=True,
        no_wrap=True,
        world_copy_jump=True,  # Ensure the map doesn't wrap around
        tiles='OpenStreetMap'
    )

    # Add a marker cluster to the map
    marker_cluster = MarkerCluster().add_to(m)

    # Add markers to the cluster and collect latitudes and longitudes for setting bounds
    locations = []
    for idx, row in data.iterrows():
        location = [row['latitude'], row['longitude']]
        locations.append(location)
        
        popup_content = f"<strong>{row['type']}</strong><br>{row['description']}<br>{row['timestamp']}"
        
        # Add image to popup if media_url is available
        if pd.notna(row['media_url']):
            popup_content += f'<br><img src="{row["media_url"]}" width="200" height="auto">'
        
        folium.Marker(
            location=location,
            popup=folium.Popup(popup_content, max_width=300)
        ).add_to(marker_cluster)

    # Add heatmap
    heat_data = [[row['latitude'], row['longitude']] for index, row in data.iterrows()]
    HeatMap(heat_data).add_to(m)

    # Fit map to bounds
    if locations:
        m.fit_bounds(locations)

    # Save map to a string buffer
    map_html = m._repr_html_()
    return map_html

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/update_map')
def update_map():
    map_html = create_map()
    return jsonify({'map': map_html})

if __name__ == '__main__':
    app.run(debug=True)