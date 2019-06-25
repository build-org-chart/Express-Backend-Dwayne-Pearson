const router = require('express').Router();

const db = require('../requests/requests-model.js');

router.get('/', async (req, res) => {
    const requests = await db.find();

    try {
        if (requests) {
            res.status(200).json(requests);
        } else {
            res.status(404).json({ message: "Please create a request"});
        }
    } catch (error) {
        res.status(500).json({ error: 'Problem with your server man'});
    }
});

router.get('/:id', async (req, res) => {
    const { id } = await req.params;
    const request = await db.findById(id);

    try {
        if (!request) {
            res.status(404).json({ message: "The request with this ID could not be found" })
        } else {
            res.status(200).json(request);
        }
    } catch(error) {
        res.status(500).json({ message: "no no, not today...server error baby"})
    }
});

router.post('/', async (req, res) => {
    const request = await db.add(req.body);
    const { sender_id, recipient_id, subject, content } = req.body;

    try {
        if (!sender_id || !recipient_id || !subject || !content) {
            res.status(404).json({ message:'Please fill in all requested information'})
        } else {
            res.status(201).json(request)
        }
    } catch (error) {
        res.status(500).json({ error: 'Error while attempting to process request'});
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
                    message: 'That request does not exist',
                });
            }
        } catch (error) {
            res.status(500).json({ message: 'We ran into an error updating this request' });
        }
    } else {
        res.status(400).json({
            message: 'Please provide the Id of the request',
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
                message: 'That request does not exist, perhaps it was deleted already' 
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'We ran into an error removing this request' });
    }
});

module.exports = router;