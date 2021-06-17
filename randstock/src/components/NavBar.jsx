import React from 'react';
import { Nav, Navbar, Container, Row, Col } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from 'react-router-dom';

import gh from "../gh.png";

import SelectorPage from './selector/SelectorPage';
import ScreenerPage from './screener/ScreenerPage';

export default function NavBar() {
    return (
        <div>
            <Router>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">RandStock</Navbar.Brand>
                        <Nav className="justify-content-end" >
                            <Nav.Link as={Link} to="/selector">Selector</Nav.Link>
                            <Nav.Link as={Link} to="/screener">Screener</Nav.Link>
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                            <Navbar.Brand href="https://github.com/oscjaimes/rand-stock">
                                <img
                                    src={gh}
                                    width="32"
                                    height="32"
                                    alt="github"
                                    style={{marginLeft: "50%"}}
                                />
                            </Navbar.Brand>
                        </Nav>
                    </Container>
                </Navbar>
                <Switch>
                    <Route path="/selector" component={SelectorPage} />
                    <Route path="/screener" component={ScreenerPage} />
                    <Route path="/about" component={About} />
                    <Redirect to="/selector" />
                </Switch>
            </Router>
        </div>
    )
}

const About = () => {
    return (<div>
        <h5> About </h5>
    </div>)
}
