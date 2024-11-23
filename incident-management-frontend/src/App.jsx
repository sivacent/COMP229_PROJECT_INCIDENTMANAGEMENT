import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Incidents from './pages/Incidents';
import CreateIncident from './pages/CreateIncident';
import EditIncident from './pages/EditIncident';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/incidents"
            element={
              <ProtectedRoute>
                <Incidents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/incidents/create"
            element={
              <ProtectedRoute>
                <CreateIncident />
              </ProtectedRoute>
            }
          />
          <Route
            path="/incidents/edit/:incidentId"
            element={
              <ProtectedRoute>
                <EditIncident />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;