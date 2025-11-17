/**
 * CSV Parser Utility
 * Parses CSV content from external API and transforms to JSON format
 * Validates structure (4 columns: file, text, number, hex)
 * Filters invalid lines silently (without throwing errors)
 */

/**
 * Parse CSV content and validate data structure
 * @param {string} csvContent - Raw CSV content as string
 * @param {string} fileName - Name of the file being parsed
 * @returns {Object|Array} Parsed data as {file, lines: [{text, number, hex}]} or [] for empty files
 */

function parseCSV(csvContent, fileName) {
  if (!csvContent || csvContent.trim() === '') {
    return [];
  }

  // Split content into lines, handling different newline formats (Unix \n, Windows \r\n, Mac \r)
  const lines = csvContent
    .split(/\r\n|\r|\n/)
    .filter((line) => line.trim() !== '');

  if (lines.length === 0) {
    return [];
  }

  const validLines = [];
  let startIndex = 0;

  // Check if first line is a header and skip it
  const firstLine = lines[0].toLowerCase();
  if (
    firstLine.includes('file') &&
    firstLine.includes('text') &&
    firstLine.includes('number') &&
    firstLine.includes('hex')
  ) {
    startIndex = 1;
  }

  // Process each line and validate according to CSV format requirements
  // Expected format: file,text,number,hex (4 columns)
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i];
    const columns = line.split(',');

    // Validate column count (must be exactly 4)
    if (columns.length !== 4) {
      continue;
    }

    // Extract columns (skip column[0] which is the filename)
    const text = columns[1].trim();
    const numberStr = columns[2].trim();
    const hex = columns[3].trim();

    // Skip lines with empty required fields
    if (!text || !numberStr || !hex) {
      continue;
    }

    // Validate number field is numeric
    const number = Number(numberStr);
    if (isNaN(number)) {
      continue;
    }

    // Validate hex field is exactly 32 characters
    if (hex.length !== 32) {
      continue;
    }

    validLines.push({
      text,
      number,
      hex,
    });
  }

  if (validLines.length === 0 && startIndex > 0) {
    return { file: fileName, lines: [] };
  }

  return {
    file: fileName,
    lines: validLines,
  };
}

module.exports = {
  parseCSV,
};
