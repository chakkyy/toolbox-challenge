const express = require('express');
require('dotenv/config');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const filesRoutes = require('./routes/files');

const app = express();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Toolbox Challenge API',
      version: '1.0.0',
      description:
        'Backend API for Toolbox Challenge - Fetches and processes CSV files from external API',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local development server',
      },
      {
        url: 'https://toolbox-challenge-backend.onrender.com',
        description: 'Production server',
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/main.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// CORS configuration
app.use(
  cors({
    origin: '*',
    methods: ['GET'],
  })
);

// JSON middleware
app.use(express.json());

// Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the health status of the API
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
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
