const router = require('express').Router();
const { Category, Interest, User } = require('../models');

// This has to be above the id get, prob should move to own file
router.get('/categories', async (req, res) => {
    try {
        const categoryData = await Category.findAll();
        const category = categoryData.map((category) => category.get({plain: true}));
        return res.json(category);
    } catch (err) {
        res.status(404).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Interest,
                    attributes: ['body'],
                    include: [
                        {
                            model: Category,
                            attributes: ['name']
                        }
                    ]
                }
            ]
        });

        const user = userData.get({ plain: true });

        return res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const [affectedRows] = await User.update(req.body, {
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
});

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
});


module.exports = router;