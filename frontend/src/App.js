import React, { useState, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { Container, Navbar, Button } from 'react-bootstrap';
import FileTable from './components/FileTable';
import FileFilter from './components/FileFilter/FileFilter';
import ErrorAlert from './components/ErrorAlert';
import store from './redux/store';
import { fetchFilesAsync } from './redux/thunks';

const AppContent = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Fetch files from backend API on component mount
  useEffect(() => {
    dispatch(fetchFilesAsync());
  }, [dispatch]);

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
        <ErrorAlert />
        <FileFilter />
        <FileTable />
      </Container>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
