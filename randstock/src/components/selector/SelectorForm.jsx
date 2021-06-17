import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const SelectorForm = () => {
    // TODO: Fetch exchanges and sectors dynamically
    useEffect(() => {

    }, []);

    return (
        <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Exchange</Form.Label>
                <Form.Control as="select">
                    <option>NASDAQ</option>
                    <option>AMEX</option>
                    <option>NYSE</option>
                    <option>ASX</option>
                    <option>TSX</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Sector</Form.Label>
                <Form.Control as="select">
                    <option>All</option>
                    <option>Basic Industries</option>
                    <option>Public Utilities</option>
                    <option>Health Care</option>
                    <option>Capital Goods</option>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                    <Form.Label>Mkt. Cap</Form.Label>
                    <Form.Control as="select">
                    <option>1M - 10M</option>
                    <option>10M - 50M</option>
                    <option>50M - 100M</option>
                    <option>100M - 500M</option>
                    <option>500M - 1B</option>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                    <Form.Label>Today's Volume</Form.Label>
                    <Form.Control as="select">
                    <option>1M - 10M</option>
                    <option>10M - 50M</option>
                    <option>50M - 100M</option>
                    <option>100M - 500M</option>
                    <option>500M - 1B</option>
                </Form.Control>
            </Form.Group>
            <Button variant="dark">Select Random Stock</Button>
        </Form>
    );
}

export default SelectorForm;
