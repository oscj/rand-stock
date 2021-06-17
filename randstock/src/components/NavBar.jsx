import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from 'react-router-dom';

import SelectorPage from './selector/SelectorPage';
import ScreenerPage from './screener/ScreenerPage';

export default function NavBar() {
    return (
        <div>
            <Router>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">RandStock</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/selector">Selector</Nav.Link>
                            <Nav.Link as={Link} to="/screener">Screener</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                <Switch>
                    <Route path="/selector" component={SelectorPage} />
                    <Route path="/screener" component={ScreenerPage} />
                    <Redirect to="/selector" />
                </Switch>
            </Router>
        </div>
    )
}
