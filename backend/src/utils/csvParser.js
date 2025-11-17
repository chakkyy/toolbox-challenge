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

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i];
    const columns = line.split(',');

    if (columns.length !== 4) {
      continue; // Skip line with invalid column count
    }

    const text = columns[1].trim();
    const numberStr = columns[2].trim();
    const hex = columns[3].trim();

    // Skip lines with empty required fields
    if (!text || !numberStr || !hex) {
      continue;
    }

    const number = Number(numberStr);

    if (isNaN(number)) {
      continue; // Skip line with invalid number
    }

    // Validate hex format (should be 32 characters) and skip line with invalid hex
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
