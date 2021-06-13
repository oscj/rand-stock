import { Nav, NavDropdown, Navbar, Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">RandStock</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/selector">Selector</Nav.Link>
            <Nav.Link href="/screener">Screener</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default App;
