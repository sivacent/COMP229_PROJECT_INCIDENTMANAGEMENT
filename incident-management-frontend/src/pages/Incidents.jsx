import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/api/incidents', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIncidents(response.data);
      } catch (err) {
        setError('Error fetching incidents');
      }
    };
    fetchIncidents();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Incidents</h1>
      {error && <p className="text-danger">{error}</p>}
      <div className="row">
        {incidents.map((incident) => (
          <div key={incident._id} className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{incident.title}</h5>
                <p className="card-text">{incident.description}</p>
                <p className="text-muted">Status: {incident.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Incidents;