import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIncidents = async () => {
      const token = localStorage.getItem('token');
      try {
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

  const handleDelete = async (incidentId) => {
    const confirmed = window.confirm('Are you sure you would like to delete this incident?');
    if (!confirmed) return;
  
    const token = localStorage.getItem('token');
    try {
      await api.delete(`/api/incidents/${incidentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncidents(incidents.filter((incident) => incident._id !== incidentId));
    } catch (err) {
      console.error('Error deleting incident:', err.response?.data || err.message);
      setError('Error deleting incident');
    }
  };

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
                <p className="text-muted">Created: {new Date(incident.created).toLocaleString()}</p>
                <p className="text-muted">Created By: {incident.createdBy?.name || 'Unknown'}</p>
                <Link to={`/incidents/edit/${incident._id}`} className="btn btn-secondary me-2">
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(incident._id)} // Add delete button
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Incidents;