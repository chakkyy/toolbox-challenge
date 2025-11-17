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

// Start server
const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.DOMAIN || 'localhost';

app.listen(PORT, () => {
  console.log(`> Server started at: http://${DOMAIN}:${PORT}/`);
});

module.exports = app;
