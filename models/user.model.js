import mongoose from 'mongoose';
import crypto from 'crypto'; // Import crypto module

const UserSchema = new mongoose.Schema({
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
    },
    hashed_password: {
        type: String,
        required: true // Required because it will store encrypted password
    },
    salt: {
        type: String, // Required for password hashing
        required: true
    }
});

// Virtual field for `password`
UserSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

// Custom validation for `password` length
UserSchema.path('hashed_password').validate(function () {
    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters.');
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required');
    }
}, null);

// Instance methods
UserSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            throw new Error('Error encrypting password');
        }
    },
    makeSalt: function () {
        return Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15); // Generates a random salt
    }
};

export default mongoose.model('User', UserSchema);