import { logger } from './logger.middleware.js';

// Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl}`);
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Internal Server Error' });
};

// Not Found Middleware (404)
const notFoundHandler = (req, res, next) => {
  const error = new Error('Route Not Found');
  error.status = 404;
  next(error);
};

export { errorHandler, notFoundHandler };
