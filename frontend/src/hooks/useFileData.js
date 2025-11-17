import { useMemo } from 'react';
import { useSelector } from 'react-redux';

/**
 * Custom hook to get and filter file data from Redux store
 * @returns {Object} Files data, filter text, and loading state
 */
const useFileData = () => {
  const files = useSelector((state) => state.files.data);
  const filterText = useSelector((state) => state.files.filter);
  const loading = useSelector((state) => state.files.loading);

  // Filter files based on search text
  const filteredFiles = useMemo(() => {
    if (!filterText) return files;
    return files.filter((file) =>
      file.file.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [files, filterText]);

  // Flatten file data into rows (one row per line)
  const flattenedRows = useMemo(() => {
    const rows = [];
    filteredFiles.forEach((file) => {
      file.lines.forEach((line) => {
        rows.push({
          file: file.file,
          text: line.text,
          number: line.number,
          hex: line.hex,
        });
      });
    });
    return rows;
  }, [filteredFiles]);

  return {
    files,
    filterText,
    loading,
    filteredFiles,
    flattenedRows,
  };
};

export default useFileData;
