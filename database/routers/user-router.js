const express = require('express');
const usersDb = require('../database/users/users-model.js');
const router = express.Router();

router.get('/api/users', async (req, res) => {
    try {
        const user = await usersDb('users');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Problem with your server man'});
    }
});

module.exports = router;