import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const App = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>React Test App</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <h1>Welcome to Toolbox Challenge</h1>
      </Container>
    </>
  );
};

export default App;
