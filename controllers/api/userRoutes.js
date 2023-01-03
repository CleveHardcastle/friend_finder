const router = require('express').Router();
const { Category, Interest, User } = require('../../models');

router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Interest,
                    attributes: ['id','body'],
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

module.exports = router;
