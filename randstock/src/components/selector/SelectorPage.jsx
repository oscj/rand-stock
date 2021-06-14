import React from 'react';
import {
    Row,
    Col,
    Card
} from 'react-bootstrap';
import SelectorForm from './SelectorForm';
import TradingViewWidget from 'react-tradingview-widget';

const SelectorPage = () => {
    return (
        <div>
            <Row style={{ paddingTop: "0.5%" }}>
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
            <Row style={{ textAlign: 'left', paddingTop: "1%", height:"200px" }}>
                <Col md={1}></Col>
                <Col md={2}>
                    <SelectorForm />
                </Col>
                <Col md={8}>
                    <TradingViewWidget width="100%" height="370px" symbol="NASDAQ:AAPL" />
                </Col>
                <Col md={1}></Col>
            </Row>
        </div >
    );
}

export default SelectorPage;
