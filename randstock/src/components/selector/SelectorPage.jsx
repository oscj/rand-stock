import React from 'react';
import {
    Row,
    Col,
    Card
} from 'react-bootstrap';
import SelectorForm from './SelectorForm';
import NewsSection from './NewsSection';
import TradingViewWidget from 'react-tradingview-widget';

const SelectorPage = () => {
    return (
        <div>
            <Row style={{ paddingTop: "1.5%" }}>
                <Col md={1}></Col>
                <Col md={10}>
                    <Card>
                        <Card.Header>Stock Selector Tool</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Fill out the form, and the tool will select a stock that matches your input criteria.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={1}></Col>
            </Row>
            <Row style={{ textAlign: 'left', paddingTop: "2.5%" }}>
                <Col md={1}></Col>
                <Col md={2}>
                    <SelectorForm />
                </Col>
                <Col md={8}>
                    <div>
                        <TradingViewWidget width="100%" height="370px" symbol="NASDAQ:AAPL" />
                    </div>
                </Col>
                <Col md={1}></Col>
            </Row>
            <Row style={{ textAlign: 'left', paddingTop: "2.5%", height: "200px" }}>
                <Col md={1}></Col>
                <Col md={10}>
                    <h5>Related news to APPL</h5>
                    <NewsSection />
                </Col>
                <Col md={1}></Col>
            </Row>
        </div >
    );
}

export default SelectorPage;
