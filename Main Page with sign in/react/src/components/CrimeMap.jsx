import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.heat';
import * as d3 from 'd3';

const CrimeMapLayer = ({ crimeData }) => {
  const map = useMap();

  useEffect(() => {
    if (crimeData.length > 0) {
      const markers = L.markerClusterGroup();
      const heatArray = [];

      crimeData.forEach(crime => {
        const { latitude, longitude, type, description, timestamp, media_url } = crime;
        const marker = L.marker([latitude, longitude]);
        marker.bindPopup(`
          <b>Type:</b> ${type}<br/>
          <b>Description:</b> ${description}<br/>
          <b>Time:</b> ${timestamp}<br/>
          <b>Media:</b> <a href="${media_url}" target="_blank">View</a>
        `);
        markers.addLayer(marker);

        heatArray.push([latitude, longitude, 1]); // The third value is the intensity
      });

      map.addLayer(markers);
      L.heatLayer(heatArray, { radius: 25 }).addTo(map);
    }
  }, [crimeData, map]);

  return null;
};

const CrimeMap = () => {
  const [crimeData, setCrimeData] = useState([]);

  useEffect(() => {
    // Fetch the CSV data from the public directory
    d3.csv('/crime_reports.csv').then(data => {
      setCrimeData(data);
    });
  }, []);

  return (
    <MapContainer center={[23.0, 72.6]} zoom={13} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <CrimeMapLayer crimeData={crimeData} />
    </MapContainer>
  );
};

export default CrimeMap;
