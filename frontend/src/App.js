import React, { useState, useEffect } from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import FileTable from './components/FileTable';
import FileFilter from './components/FileFilter/FileFilter';
import { mockFiles } from './data/mockData';

const App = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // TODO: Migrate to Redux
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === 'light' ? 'dark' : 'light'
    );
  };

  const handleFilter = (text) => {
    setFilterText(text);
  };

  // Filter files by name (case-insensitive, partial match)
  const filteredFiles = mockFiles.filter((file) => {
    if (!filterText) return true;
    return file.file.toLowerCase().includes(filterText.toLowerCase());
  });

  return (
    <>
      <Navbar bg="danger" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>React Test App</Navbar.Brand>
          <Button
            variant="outline-light"
            size="sm"
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </Button>
        </Container>
      </Navbar>

      <Container>
        <FileFilter onFilter={handleFilter} />
        <FileTable files={filteredFiles} />
      </Container>
    </>
  );
};

export default App;
