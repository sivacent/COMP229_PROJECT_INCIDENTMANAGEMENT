import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { jwtSecret } from "../config/config.js"; // Ensure jwtSecret is correctly defined in your config.js

// Signin function
export const signin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        if (!user.authenticate(req.body.password)) {
            return res.status(401).json({ error: "Email and password don't match" });
        }

        // Generate token
        const token = jwt.sign({ _id: user._id }, jwtSecret);

        // Set cookie with token
        res.cookie("t", token, { expires: new Date(Date.now() + 9999 * 1000), httpOnly: true });

        // Return user details and token
        return res.json({
            token,
            user: { _id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
        return res.status(401).json({ error: "Could not sign in" });
    }
};

// Signout function
export const signout = (req, res) => {
    res.clearCookie("t");
    return res.status(200).json({ message: "Signed out successfully" });
};

// Middleware to require signin
export const requireSignin = expressjwt({
    secret: jwtSecret, // Use your JWT secret here
    algorithms: ["HS256"], // Specify the algorithm used for signing
    userProperty: "auth", // Attach decoded token payload to req.auth
});

// Middleware to check authorization
export const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id.toString() === req.auth._id;
    if (!authorized) {
        return res.status(403).json({ error: "User is not authorized" });
    }
    next();
};
// Signup
export const signup = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};