import Incident from '../models/incident.model.js';

// Create incidents
export const createIncident = async (req, res) => {
    try {
      const incident = new Incident({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status || 'open', // Default status
        createdBy: req.body.createdBy, // Use createdBy from the request body
      });
  
      await incident.save();
      res.status(201).json({ message: 'Incident created successfully', incident });
    } catch (error) {
      console.error('Error creating incident:', error.message);
      res.status(400).json({ error: error.message });
    }
  };

// List incidents
export const listIncidents = async (req, res) => {
    try {
        const incidents = await Incident.find().populate('createdBy', 'name email');
        res.json(incidents);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching incidents' });
    }
};

// Update incident by ID
export const updateIncident = async (req, res) => {
    try {
        const incident = await Incident.findByIdAndUpdate(
            req.params.incidentId,
            req.body, // Include the status field in the update
            { new: true, runValidators: true }
        );
        if (!incident) return res.status(404).json({ error: "Incident not found" });
        res.json({ message: 'Incident updated successfully', incident });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an incident by ID
export const deleteIncident = async (req, res) => {
    try {
      const incident = await Incident.findByIdAndDelete(req.params.incidentId);
      if (!incident) {
        return res.status(404).json({ error: 'Incident not found' });
      }
      res.status(200).json({ message: 'Incident deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Error deleting incident' });
    }
  };

// Get incident by ID
export const getIncidentById = async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.incidentId).populate('createdBy', 'name email');
        if (!incident) return res.status(404).json({ error: "Incident not found" });
        res.json(incident);
    } catch (error) {
        res.status(400).json({ error: error.message });;
    }
};