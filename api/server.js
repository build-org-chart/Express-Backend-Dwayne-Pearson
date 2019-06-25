const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const configureRoutes = require('../config/routes.js');
const usersRouter = require('../database/routers/users-router.js/index.js');
const departmentsRouter = require('../database/routers/departments-router.js');
const companiesRouter = require('../database/routers/companies-router.js');
const requestsRouter = require('../database/routers/requests-router.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

configureRoutes(server);

server.use('/api/users', usersRouter);
server.use('/api/departments', departmentsRouter);
server.use('/api/companies', companiesRouter);
server.use('/api/requests', requestsRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Hello World!'});
});

module.exports = server;