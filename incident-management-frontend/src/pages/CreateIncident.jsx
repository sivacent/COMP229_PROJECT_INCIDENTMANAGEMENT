import React, { useState } from 'react';
import api from '../api/axios';
import { jwtDecode } from 'jwt-decode';

const CreateIncident = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateIncident = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    // Decode the JWT to get the user ID
    const decodedToken = jwtDecode(token);
    const createdBy = decodedToken._id; // Ensure your token includes _id

    try {
      await api.post(
        '/api/incidents',
        { title, description, createdBy }, // Send createdBy explicitly
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Incident created successfully!');
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating incident:', error.response?.data || error.message);
      setMessage('Error creating incident: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <div className="card p-4" style={{ width: '410px' }}>
        <h1 className="text-center mb-4">Create Incident</h1>
        <form onSubmit={handleCreateIncident}>
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
          <button className="btn btn-primary w-100" type="submit">
            Create Incident
          </button>
        </form>
        {message && <p className="text-center mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default CreateIncident;