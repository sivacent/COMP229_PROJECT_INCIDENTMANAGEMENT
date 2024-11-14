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
        type: String,
        ref: 'User',
        
    }
});

export default mongoose.model('Incident', IncidentSchema);