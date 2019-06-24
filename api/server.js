const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const configureRoutes = require('../config/routes.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

configureRoutes(server);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Hello World!'});
});

module.exports = server;