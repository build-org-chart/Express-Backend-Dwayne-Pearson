const router = require('express').Router();

const db = require('../departments/departments-model.js');

router.get('/', async (req, res) => {
    const departments = await db.find();

    try {
        if (departments) {
            res.status(200).json(departments);
        } else {
            res.status(404).json({ message: "Be the first to create a department"});
        }
    } catch (error) {
        res.status(500).json({ error: 'Problem with your server man'});
    }
});

router.get('/:id', async (req, res) => {
    const { id } = await req.params;
    const department = await db.findById(id);

    try {
        if (!department) {
            res.status(404).json({ message: "The department with this ID could not be found" })
        } else {
            res.status(200).json(department);
        }
    } catch(error) {
        res.status(500).json({ message: "no no, not today...server error baby"})
    }
});

router.post('/', async (req, res) => {
    const department = await db.add(req.body);
    const { name, company_id, department_head } = req.body;

    try {
        if (!name || !company_id || !department_head) {
            res.status(404).json({ message:'Please provide the name of the department, company Id and the department head'})
        } else {
            res.status(201).json(department)
        }
    } catch (error) {
        res.status(500).json({ error: 'Error while attempting to add department'});
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
                    message: 'That department does not exist',
                });
            }
        } catch (error) {
            res.status(500).json({ message: 'We ran into an error updating this department' });
        }
    } else {
        res.status(400).json({
            message: 'Please provide the Id of the department',
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
                message: 'That department does not exist, perhaps it was deleted already' 
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'We ran into an error removing this department' });
    }
});

module.exports = router;