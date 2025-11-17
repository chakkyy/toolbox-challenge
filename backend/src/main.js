const express = require('express');
require('dotenv/config');
const cors = require('cors');
const filesRoutes = require('./routes/files');

const app = express();

// CORS configuration
app.use(
  cors({
    origin: '*',
    methods: ['GET'],
  })
);

// JSON middleware
app.use(express.json());

// Health check route
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Files routes
app.use('/files', filesRoutes);

// 404 handler
app.use((_req, res) => {
  res
    .status(404)
    .json({ success: false, message: 'Resource not found' });
});

// Start server only if this file is run directly (not imported for testing)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT);
}

module.exports = app;
