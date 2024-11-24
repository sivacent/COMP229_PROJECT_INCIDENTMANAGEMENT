import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

const EditIncident = () => {
  const { incidentId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('open'); // Default status
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchIncident = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await api.get(`/api/incidents/${incidentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTitle(response.data.title);
        setDescription(response.data.description);
        setStatus(response.data.status); // Load current status
      } catch (error) {
        setMessage('Error fetching incident details.');
      }
    };

    fetchIncident();
  }, [incidentId]);

  const handleEditIncident = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await api.put(
        `/api/incidents/${incidentId}`,
        { title, description, status }, // Include status in the update
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Incident updated successfully!');
      navigate('/incidents');
    } catch (error) {
      setMessage('Error updating incident.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <div className="card p-4" style={{ width: '410px' }}>
        <h1 className="text-center mb-4">Edit Incident</h1>
        <form onSubmit={handleEditIncident}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Save Changes
          </button>
        </form>
        {message && <p className="text-center mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default EditIncident;