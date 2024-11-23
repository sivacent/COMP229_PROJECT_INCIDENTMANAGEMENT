import mongoose from 'mongoose';

const IncidentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'closed', 'in-progress'],
        default: 'open'
    },
    created: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Ensure this references the User model
        required: true // Optional, but recommended if every incident must have a creator
    }
});

export default mongoose.model('Incident', IncidentSchema);