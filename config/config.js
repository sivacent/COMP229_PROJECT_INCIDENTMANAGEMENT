import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();


// DB Connection method
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI );
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

export const jwtSecret = process.env.JWT_SECRET;

export default connectDB;