/**
 * Application configuration module
 * 
 * Provides centralized access to environment-based configuration values.
 * Environment variables are injected at build time via Webpack DefinePlugin.
 * 
 * @module config
 */

/**
 * API base URL for backend communication
 * Reads from REACT_APP_API_URL environment variable with fallback to localhost:3000
 * @type {string}
 */
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export default { API_URL };
