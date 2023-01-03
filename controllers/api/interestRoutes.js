const router = require('express').Router();
const { Category, Interest, User } = require('../models');

router.post('/:id', async (req, res) => {
    try {
        const interestData = await Interest.create({ 
            ...req.body, 
            user_id: req.params.id 
        });
        res.json(interestData);

    } catch (err) {
        res.status(500).json(err);
    }
});

//update interest (interest id)
router.put('/interest/:id', async (req, res) => {
    try {
        const [affectedRows] = await Interest.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if (affectedRows > 0) {
            res.status(200).end();
          } else {
            res.status(404).end();
          }
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;