import React, { useState } from 'react';
import {
    Row,
    Col,
    Card
} from 'react-bootstrap';
import SelectorForm from './SelectorForm';
import NewsSection from './NewsSection';
import TradingViewWidget from 'react-tradingview-widget';

const HeaderCard = () => {
    return (
        <Card>
            <Card.Header>Stock Selector Tool</Card.Header>
            <Card.Body>
                <Card.Text>
                    Fill out the form, and the tool will select a stock that matches your input criteria.
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

const SelectorPage = () => {
    const [ticker, setTicker] = useState("TSLA");

    return (
        <div>
            <Row style={{ paddingTop: "1.5%" }}>
                <Col md={1}></Col>
                <Col md={10}>
                    <HeaderCard />
                </Col>
                <Col md={1}></Col>
            </Row>
            <Row style={{ textAlign: 'left', paddingTop: "2.5%" }}>
                <Col md={1}></Col>
                <Col md={2}>
                    <SelectorForm setTicker={setTicker} />
                </Col>
                <Col md={8}>
                    <TradingViewWidget width="100%" height={370} symbol={ticker} />
                </Col>
                <Col md={1}></Col>
            </Row>
            <Row style={{ textAlign: 'left', paddingTop: "2.5%", height: "200px" }}>
                <Col md={1}></Col>
                <Col md={10}>
                    <h5>Related news to {ticker}</h5>
                    <NewsSection ticker={ticker} />
                    <p style={{textAlign: 'center', paddingTop: "3%", color:"grey", fontSize:"13px"}}>*** Not financial advice. These stock picks are completely random with no guarantee of going to the moon 🚀 *** </p>
                </Col>
                <Col md={1}></Col>
            </Row>
        </div >
    );
}

export default SelectorPage;
