const router = require('express').Router();

const db = require('../users/users-model.js');
const dbDepartments = require('../departments/departments-model.js');

router.get('/', async (req, res) => {
    const users = await db.find();

    try {
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: "Sorry, no users exist"});
        }
    } catch (error) {
        res.status(500).json({ error: 'Problem with your server man'});
    }
});

router.get('/:id', async (req, res) => {
    const { id } = await req.params;
    const user = await db.findById(id);

    try {
        if (!user) {
            res.status(404).json({ message: "The user with this ID could not be found" })
        } else {
            const departments = await dbDepartments.find('departments')
            .where({ id })
            res.status(200).json({user, departments});
        }
    } catch(error) {
        res.status(500).json({ message: "no no, not today...server error baby"})
    }
});

router.post('/', async (req, res) => {
    const user = await db.add(req.body);
    const { username, password, email, full_name } = req.body;

    try {
        if (!username || !password || !email || !full_name) {
            res.status(404).json({ message:'Please provide username, password, email and full name, then try again'})
        } else {
            res.status(201).json(user)
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/:id', async (req, res) => {
    const changes = req.body;

    if (changes.id) {
        try {
            const updated = await db.update(req.params.id, changes);
            if (updated) {
                res.status(200).json(updated);
            } else {
                res.status(404).json({
                    message: 'That user does not exist',
                });
            }
        } catch (error) {
            res.status(500).json({ message: 'We ran into an error updating this user' });
        }
    } else {
        res.status(400).json({
            message: 'Please provide the Id of the user you want to update',
        });
    }
});

router.delete('/:id', async(req, res) => {
    const count = await db.remove(req.params.id);

    try {
        if (count > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({
                message: 'That user does not exist, perhaps they were deleted already' 
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'We ran into an error removing this user' });
    }
});

module.exports = router;