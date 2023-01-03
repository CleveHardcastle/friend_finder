const router = require('express').Router();
const { Category } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const categoryData = await Category.findAll({
            attributes: ['name']
        });

        const categories = categoryData.map((category) => category.get({ plain: true }));
        return res.json(categories);
    } catch {
        res.status(500).json(err);
    }
})

module.exports = router;