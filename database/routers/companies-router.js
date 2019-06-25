const router = require('express').Router();

const db = require('../companies/companies-model.js');

router.get('/', async (req, res) => {
    const companies = await db.find();

    try {
        if (companies) {
            res.status(200).json(companies);
        } else {
            res.status(404).json({ message: "Be the first to create a department"});
        }
    } catch (error) {
        res.status(500).json({ error: 'Problem with your server man'});
    }
});

router.get('/:id', async (req, res) => {
    const { id } = await req.params;
    const company = await db.findById(id);

    try {
        if (!company) {
            res.status(404).json({ message: "The company with this ID could not be found" })
        } else {
            res.status(200).json(company);
        }
    } catch(error) {
        res.status(500).json({ message: "no no, not today...server error baby"})
    }
});

router.post('/', async (req, res) => {
    const company = await db.add(req.body);
    const { name } = req.body;

    try {
        if (!name) {
            res.status(404).json({ message:'Please provide the name of the company'})
        } else {
            res.status(201).json(company)
        }
    } catch (error) {
        res.status(500).json({ error: 'Error while attempting to add company'});
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
                    message: 'That company does not exist',
                });
            }
        } catch (error) {
            res.status(500).json({ message: 'We ran into an error updating this company' });
        }
    } else {
        res.status(400).json({
            message: 'Please provide the Id of the company',
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
                message: 'That company does not exist, perhaps it was deleted already' 
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'We ran into an error removing this company' });
    }
});

module.exports = router;