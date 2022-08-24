const express = require('express');
const path = require('path');

const { SUCCESS } = require('./constants/responseCodes');

const server = express();
server.use(express.static(path.join(__dirname, 'build')));

server.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})

server.get('/valid-markets', (req, res, next) => {
    res.status(SUCCESS).json({'markets': ['NYSE', 'NASDAQ', 'AMEX', 'ASX']});
});


server.get('/rand-nyse', (req, res, next) => {

});


server.get('/rand-nasdaq', (req, res, next) => {

});


server.get('/rand-amex', (req, res, next) => {

});

server.get('/rand-asx', (req, res, next) => {

});

server.get('/sector-list', (req, res, next) => {

});

server.get('/stock-info', (req, res, next) => {

});

server.get('/stock-news', (req, res, next) => {

});



const PORT = process.env.PORT || 30303;
server.listen(30303, () => {
    console.log(`Server is up and running on port ${PORT}`);
});