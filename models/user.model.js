import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

    // _id: {
    //     type: String,  
    // },
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
    password: {
        type:String,
        // required: true,
        required: 'Password is required'
    }
});
UserSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password)
        //this.hashed_password = password;

        //this.salt = this.makeSalt();
        //this.hashed_password = password;
        //this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });
UserSchema.path('hashed_password').validate(function (v) {
    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters.');
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required');
    }
}, null);
UserSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function (password) {
        if (!password) return ''
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ''
        }
    },
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}
export default mongoose.model('User', UserSchema);