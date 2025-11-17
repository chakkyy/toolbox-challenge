const express = require('express');
const { getAllFiles, getFile } = require('../services/files');
const { parseCSV } = require('../utils/csvParser');

const router = express.Router();

/**
 * GET /files/list route handler
 * Fetches list of available CSV files from external API
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getFilesList(_req, res) {
  try {
    const fileList = await getAllFiles();

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ files: fileList });
  } catch (error) {
    console.error('Error fetching file list:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * GET /files/data route handler
 * Fetches all CSV files from external API, processes them, and returns formatted JSON
 * Supports optional ?fileName query parameter to filter by specific file
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getFilesData(req, res) {
  try {
    const { fileName } = req.query;

    if (fileName && fileName.trim() !== '') {
      try {
        const csvContent = await getFile(fileName);
        const parsedData = parseCSV(csvContent, fileName);

        if (Array.isArray(parsedData) && parsedData.length === 0) {
          res.setHeader('Content-Type', 'application/json');
          return res.status(200).json([]);
        }

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json([parsedData]);
      } catch (error) {
        console.error(
          `Error processing file ${fileName}:`,
          error.message
        );
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json([]);
      }
    }

    // No fileName provided or empty: process all files
    const fileList = await getAllFiles();

    const filePromises = fileList.map(async (fileName) => {
      try {
        const csvContent = await getFile(fileName);

        const parsedData = parseCSV(csvContent, fileName);

        return parsedData;
      } catch (error) {
        console.error(
          `Error processing file ${fileName}:`,
          error.message
        );
        return null;
      }
    });

    const results = await Promise.all(filePromises);

    // Filter out failed files but keep files with empty lines arrays
    const filteredResults = results.filter((result) => {
      // Remove null values (failed downloads/processing)
      if (result === null) return false;

      // Remove empty arrays (completely empty files from parser)
      if (Array.isArray(result) && result.length === 0) return false;

      // Keep objects with file and lines properties (even if lines is empty)
      // This shows that the file exists but has no valid data
      return true;
    });

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(filteredResults);
  } catch (error) {
    console.error('Error fetching files:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Register routes
router.get('/list', getFilesList);
router.get('/data', getFilesData);

module.exports = router;
