import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/config.js';
import userRoutes from './routes/user.routes.js';
import incidentRoutes from './routes/incident.routes.js';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/incidents', incidentRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
