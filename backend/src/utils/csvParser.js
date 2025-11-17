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
 * @param {Object} options - Parsing options
 * @param {boolean} options.includeValidation - If true, include validation metadata and partially invalid lines
 * @returns {Object|Array} Parsed data as {file, lines: [{text, number, hex}]} or [] for empty files
 */

function parseCSV(csvContent, fileName, options = {}) {
  const { includeValidation = false } = options;
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

    // Validate each field (shared validation logic)
    const textValid = text && text.trim() !== '';
    const numberValid =
      !isNaN(Number(numberStr)) && numberStr.trim() !== '';
    const hexValid = hex && hex.length === 32;

    if (includeValidation) {
      // Mode: Include validation metadata and partially invalid lines

      if (textValid || numberValid || hexValid) {
        validLines.push({
          text: text || '',
          number: numberStr || '',
          hex: hex || '',
          validation: {
            textValid,
            numberValid,
            hexValid,
          },
        });
      }
    } else {
      // Default mode: Only include fully valid lines (challenge requirement)

      // Skip if any field is invalid
      if (!textValid || !numberValid || !hexValid) {
        continue;
      }

      validLines.push({
        text,
        number: Number(numberStr),
        hex,
      });
    }
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
