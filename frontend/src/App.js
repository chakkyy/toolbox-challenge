import React, { useState, useEffect } from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import FileTable from './components/FileTable';
import { mockFiles } from './data/mockData';

const App = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === 'light' ? 'dark' : 'light'
    );
  };

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
        <FileTable files={mockFiles} />
      </Container>
    </>
  );
};

export default App;
