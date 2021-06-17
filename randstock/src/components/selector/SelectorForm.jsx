import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
const { REACT_APP_API_BASE_URL } = process.env;


const SelectorForm = () => {

    const [exchangeOptions, setExchangeOptions] = useState([]);
    const [sectorOptions, setSectorOptions] = useState([]);
    const marketCapOptions = [
        { value: "1", label: "< 1M" },
        { value: "2", label: "1M - 10M" },
        { value: "3", label: "10M - 50M" },
        { value: "4", label: "50M - 100M" },
        { value: "5", label: "100M - 500M" },
        { value: "6", label: "500M - 1B" },
        { value: "7", label: "> 1B" }
    ];

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
            });
    };

    return (
        <Form>
            <Form.Label>Exchange</Form.Label>
            <Select options={exchangeOptions} />
            <br />
            <Form.Label>Sector</Form.Label>
            <Select options={sectorOptions} />
            <br />
            <Form.Label>Market Cap</Form.Label>
            <Select options={marketCapOptions} />
            < br />
            <Button variant="dark">Select Random Stock</Button>
        </Form>
    );
}

export default SelectorForm;
