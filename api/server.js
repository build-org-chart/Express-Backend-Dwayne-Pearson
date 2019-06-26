const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const configureRoutes = require('../config/routes.js');
const { authenticate } = require('../auth/authenticate');

const usersRouter = require('../database/routers/users-router.js');
const departmentsRouter = require('../database/routers/departments-router.js');
const companiesRouter = require('../database/routers/companies-router.js');
const requestsRouter = require('../database/routers/requests-router.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

configureRoutes(server);

server.use('/api/users', authenticate, usersRouter);
server.use('/api/departments', authenticate, departmentsRouter);
server.use('/api/companies', authenticate, companiesRouter);
server.use('/api/requests', authenticate, requestsRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Hello World!'});
});

module.exports = server;
