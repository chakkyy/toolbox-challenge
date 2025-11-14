import React, { useState, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { Container, Navbar, Button } from 'react-bootstrap';
import FileTable from './components/FileTable';
import FileFilter from './components/FileFilter/FileFilter';
import { mockFiles } from './data/mockData';
import store from './redux/store';
import { setFiles } from './redux/actions';

const AppContent = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Initialize Redux store with mock data on mount, this will be replaced with the actual API call in a proper file on the future.
  useEffect(() => {
    dispatch(setFiles(mockFiles));
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
