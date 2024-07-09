import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [crimes, setCrimes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCrimes();
  }, [search]);

  const fetchCrimes = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/crimes', {
        params: { search },
      });
      setCrimes(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Crime Dashboard</h1>
      <input
        type="text"
        placeholder="Search by type or description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <table className="crime-table" bgcolor='#ffffff'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Description</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Timestamp</th>
            <th>Anonymous</th>
            <th>Media URL</th>
            <th>Get There</th>
          </tr>
        </thead>
        <tbody>
          {crimes.map((crime) => (
            <tr key={crime.id}>
              <td>{crime.id}</td>
              <td>{crime.type}</td>
              <td>{crime.description}</td>
              <td>{crime.latitude}</td>
              <td>{crime.longitude}</td>
              <td>{new Date(crime.timestamp).toLocaleString()}</td>
              <td>{crime.anonymous ? 'Yes' : 'No'}</td>
              <td>
                {crime.media_url ? (
                  <a href={crime.media_url} target="_blank" rel="noopener noreferrer">Link</a>
                ) : (
                  '-'
                )}
              </td>
              <td>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${crime.latitude},${crime.longitude}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="get-there-button"
                >
                  Get There
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
