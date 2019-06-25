const router = require('express').Router();

const db = require('../users/users-model.js');

router.get('/', async (req, res) => {
    try {
        const user = await db('users');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Problem with your server man'});
    }
});

module.exports = router;