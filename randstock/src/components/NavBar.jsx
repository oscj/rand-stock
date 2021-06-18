import React from 'react';
import { Nav, Navbar, Container, Card, Row, Col } from 'react-bootstrap';
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
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                            <Navbar.Brand href="https://github.com/oscjaimes/rand-stock">
                                <img
                                    src={gh}
                                    width="32"
                                    height="32"
                                    alt="github"
                                    style={{ marginLeft: "50%" }}
                                />
                            </Navbar.Brand>
                        </Nav>
                    </Container>
                </Navbar>
                <Switch>
                    <Route path="/selector" component={SelectorPage} />
                    <Route path="/about" component={About} />
                    <Redirect to="/selector" />
                </Switch>
            </Router>
        </div>
    )
}

const About = () => {
    return (
        <>
            <Row style={{ paddingTop: "1.5%" }}>
                <Col md={1} />
                <Col md={10}>
                    <Card>
                        <Card.Header>About RandStock</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                RandStock is a next-generation random stock picker. Why perform DD when you can just get a machine to choose a stock for you?
                                <br />
                                <br />
                                <h5>Project README</h5>
                                <br />
                                A random stock selector dedicated to the r/wallstreetbets community
                                <br />
                                <br />
                                <a href="https://www.reddit.com/r/stocks/comments/k18aya/random_stocks/">1k+ upvotes on r/stocks</a> but only 4 stars on GitHub
                                <br />
                                <br />
                                Have you ever wanted to start investing but couldn't decide what stock to pour your life savings in to? Then rand-stock is the product for you. Using advanced proprietary algos,rand-stock reccomends* a great stock for you to invest in. You will never have to conduct market analysis again with this product.
                                No more TSLA calls. No more PLTR calls. Put all your money in a random stock and perform better than the S&P500
                                <br />
                                <br />
                                Honestly, I couldn't find a random stock generator that I truly loved. So I decided to make my own. Shows you standard stats for the stock as well as most recent news specific to that stock.
                                <br />
                                <br />
                                How it works
                                <br />
                                --------------
                                <br />
                                - Python server (Flask)
                                <br />
                                - React client side
                                <br />
                                - Uses yfinance and market data CSV files to fetch information on a random stock from a specific market & sector
                                <br />
                                - Graphs are generated with Trading View
                                <br />
                                - Google news rss to fetch stock specific news
                                <br />
                                <br />
                                <br />
                                Find a Bug? Have an idea for a feature? Submit an <a href="https://github.com/oscjaimes/rand-stock/issues">issue</a> or a <a href="https://github.com/oscjaimes/rand-stock/pulls">pull request</a>
                            </Card.Text>
                        </Card.Body>
                        <p style={{textAlign: 'center', paddingTop: "3%", color:"grey", fontSize:"13px"}}>*** Not financial advice. All stocks picked by this application are completely random with no guarantee of going to the moon 🚀 *** </p>
                    </Card>
                </Col>
                <Col md={1} />
            </Row>
            
        </>
    );
}
