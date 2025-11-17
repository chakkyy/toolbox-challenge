const express = require('express');
const { getAllFiles, getFile } = require('../services/files');
const { parseCSV } = require('../utils/csvParser');

const router = express.Router();

/**
 * GET /files/data route handler
 * Fetches all CSV files from external API, processes them, and returns formatted JSON
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */

async function getFilesData(_req, res) {
  try {
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

router.get('/data', getFilesData);

module.exports = router;
