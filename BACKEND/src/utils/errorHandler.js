/**
 * Custom Error Class
 * Use this to throw specific errors in your services/controllers.
 */

export class ApiError extends Error {
    constructor(statusCode, message, isOperational = true, stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational; // True for expected errors (like 404s)
        
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

/**
 * Global Error Handling Middleware
 * Catch all errors, format them, and send the response.
 */

export const globalErrorHandler = (err, req, res, next) => {
    let error = err;

    // If the error isn't already an ApiError (e.g., a standard Node/Mongoose error), convert it
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        error = new ApiError(statusCode, message, false, err.stack);
    }

    // --- Specific Error Interceptors ---
    
    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        error = new ApiError(400, message);
    }

    // Mongoose duplicate key (e.g., trying to create a short_url that already exists)
    if (err.code === 11000) {
        const message = `Duplicate field value entered. Please use another value.`;
        error = new ApiError(400, message);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        error = new ApiError(400, message);
    }

    // --- Send Response ---
    res.status(error.statusCode).json({
        success: false,
        status: error.statusCode,
        message: error.message,
        // Only include the stack trace if we are in development mode
        ...(process.env.NODE_ENV === "development" && { stack: error.stack })
    });
};