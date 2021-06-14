import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const SelectorForm = () => {
    // TODO: Fetch exchanges and sectors dynamically
    useEffect(() => {

    }, []);

    return (
        <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label><h5>Exchange</h5></Form.Label>
                <Form.Control as="select">
                    <option>NASDAQ</option>
                    <option>AMEX</option>
                    <option>NYSE</option>
                    <option>ASX</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label><h5>Sector</h5></Form.Label>
                <Form.Control as="select">
                    <option>All</option>
                    <option>Basic Industries</option>
                    <option>Public Utilities</option>
                    <option>Health Care</option>
                    <option>Capital Goods</option>
                </Form.Control>
            </Form.Group>
            <Button variant="dark">Select Random Stock</Button>
        </Form>
    );
}

export default SelectorForm;
