const express = require('express');
const { getAllFiles, getFile } = require('../services/files');
const { parseCSV } = require('../utils/csvParser');

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     FileListResponse:
 *       type: object
 *       properties:
 *         files:
 *           type: array
 *           items:
 *             type: string
 *           example: ["test1.csv", "test2.csv", "test3.csv"]
 *     FileDataResponse:
 *       type: object
 *       properties:
 *         file:
 *           type: string
 *           example: "test1.csv"
 *         lines:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Sample text"
 *               number:
 *                 type: number
 *                 example: 12345
 *               hex:
 *                 type: string
 *                 example: "a1b2c3d4e5f6"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Error message description"
 */

/**
 * @openapi
 * /files/list:
 *   get:
 *     summary: Get list of available CSV files
 *     description: Fetches the list of available CSV files from the external Toolbox API
 *     tags:
 *       - Files
 *     responses:
 *       200:
 *         description: Successfully retrieved file list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FileListResponse'
 *       500:
 *         description: Server error - Failed to fetch file list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 * @openapi
 * /files/data:
 *   get:
 *     summary: Get processed CSV file data
 *     description: |
 *       Fetches and processes CSV files from the external API, returning formatted JSON data.
 *       - Without fileName parameter: Returns all files with valid data
 *       - With fileName parameter: Returns only the specified file
 *
 *       Files with download/processing errors are excluded from results.
 *       Empty files are excluded, but files with no valid data rows are included to show file state.
 *     tags:
 *       - Files
 *     parameters:
 *       - in: query
 *         name: fileName
 *         schema:
 *           type: string
 *         required: false
 *         description: Optional - Filter results to a specific CSV file
 *         example: test1.csv
 *     responses:
 *       200:
 *         description: Successfully retrieved and processed file data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FileDataResponse'
 *             examples:
 *               allFiles:
 *                 summary: All files response
 *                 value:
 *                   - file: "test1.csv"
 *                     lines:
 *                       - text: "Sample text"
 *                         number: 12345
 *                         hex: "a1b2c3d4e5f6"
 *                   - file: "test2.csv"
 *                     lines:
 *                       - text: "Another text"
 *                         number: 67890
 *                         hex: "f6e5d4c3b2a1"
 *               singleFile:
 *                 summary: Single file response (with fileName parameter)
 *                 value:
 *                   - file: "test1.csv"
 *                     lines:
 *                       - text: "Sample text"
 *                         number: 12345
 *                         hex: "a1b2c3d4e5f6"
 *               emptyResult:
 *                 summary: Empty result (file not found or has errors)
 *                 value: []
 *       500:
 *         description: Server error - Failed to fetch or process files
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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

    // Filter results to handle different file states:
    // - null: file download/processing failed (exclude)
    // - []: completely empty file (exclude)
    // - {file, lines: []}: file exists but no valid data (include to show file state)
    // - {file, lines: [...]}: file with valid data (include)
    const filteredResults = results.filter((result) => {
      if (result === null) return false;
      if (Array.isArray(result) && result.length === 0) return false;
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
