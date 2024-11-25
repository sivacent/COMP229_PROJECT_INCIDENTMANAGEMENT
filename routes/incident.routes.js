import express from 'express';
import { createIncident, listIncidents, getIncidentById, updateIncident, deleteIncident } from '../controllers/incident.controller.js';
import {requireSignin} from '../controllers/auth.controller.js'; 

const router = express.Router();

router.route('/')
  .get(listIncidents)       // Get all incidents
  .post(createIncident);     // Create a new incident

router.route('/:incidentId')
  .get(getIncidentById)      // Get incident by ID
  .put(updateIncident)       // Update incident by ID
  .delete(deleteIncident);   // Delete incident by ID


  router.route('/:incidentId')
  .delete(requireSignin, deleteIncident); // Add this

export default router;