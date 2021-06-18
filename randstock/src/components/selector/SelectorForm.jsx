import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
const { REACT_APP_API_BASE_URL } = process.env;


const SelectorForm = (props) => {
    const [exchangeOptions, setExchangeOptions] = useState([]);
    const [sectorOptions, setSectorOptions] = useState([]);
    const [exchange, setExchange] = useState("");
    const [sector, setSector] = useState("");

    useEffect(() => {
        fetchAndSetExchageOptions();
        fetchAndSetSectorOptions();
    }, []);

    const fetchAndSetExchageOptions = () => {
        fetch(`${REACT_APP_API_BASE_URL}/valid-markets`)
            .then(res => res.json())
            .then(result => {
                let exchanges = result.markets;
                setExchangeOptions(
                    exchanges.map(exchange => { return { value: exchange, label: exchange } })
                );
                setExchange(exchanges[0]);
            });
    };

    const fetchAndSetSectorOptions = () => {
        fetch(`${REACT_APP_API_BASE_URL}/sector-list`)
            .then(res => res.json())
            .then(result => {
                let sectors = result.sectors;
                setSectorOptions(
                    sectors.map(sector => { return { value: sector, label: sector } })
                );
                setSector(sectors[0]);
            });
    };

    const onSelectRandomStock = (e) => {
        let market = exchange.toLowerCase()
        fetch(`${REACT_APP_API_BASE_URL}/rand-${market}?sector=${sector}`)
            .then(async result => {
                if (result.status === 429) {
                    alert("Rate Limit Exceeded. You have an alloted total of 12 queries per minute.");
                } else if (result.status == 200) {
                    let res = await (result.text());
                    props.setTicker(res);
                } else {
                    alert("Error Generating Stock.");
                }
            })
        e.preventDefault();
    }

    return (
        <Form onSubmit={onSelectRandomStock}>
            <Form.Label>Exchange</Form.Label>
            <Select options={exchangeOptions} onChange={(e) => { setExchange(e.value) }} />
            <br />
            <Form.Label>Sector</Form.Label>
            <Select options={sectorOptions} onChange={(e) => { setSector(e.value) }} />
            <br />
            <Button variant="dark" type="submit">Select Random Stock</Button>
        </Form>
    );
}

export default SelectorForm;
