// Extract meaningful error messages
function getErrorMessage(error) {
    let message = "Something went wrong"; // Default error message

    if (error.code) {
        // Handle MongoDB errors
        switch (error.code) {
            case 11000:
            case 11001:
                message = "Duplicate key error: A unique field already exists.";
                break;
            default:
                message = "Database error occurred.";
        }
    } else if (error.errors) {
        // Handle Mongoose validation errors
        const errorMessages = Object.values(error.errors).map(err => err.message);
        message = errorMessages.join(", ");
    } else if (error.message) {
        // Generic JavaScript error
        message = error.message;
    }

    return message;
}

// General error handler middleware
function handleError(err, req, res, next) {
    const message = getErrorMessage(err);
    const statusCode = err.status || 400; // Default to 400 if no status code provided
    res.status(statusCode).json({ error: message });
}

export default {
    handleError,
    getErrorMessage
};