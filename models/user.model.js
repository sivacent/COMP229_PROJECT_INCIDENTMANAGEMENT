import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

    _id: {
        type: String,  
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('User', UserSchema);