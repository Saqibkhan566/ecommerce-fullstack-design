export default function errorHandler(err, req, res, next) {
    console.error(err);             // full error on server console

    const status = err.statusCode || 500;
    res.status(status).json({
        message: err.message || 'Server error',
        // hide stack trace in production
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    });
}