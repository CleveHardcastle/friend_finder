const router = require('express').Router();
const { Category, Interest, User } = require('../../models');
const withAuth = require('../../utils/auth')


router.post('/', withAuth, async (req, res) => {
  try {
    const interestData = await Interest.create({ 
      ...req.body, 
      user_id: req.session.userId
    });
    res.json(interestData);

  } catch (err) {
    res.status(500).json(err);
  }
});

//update interest (interest id)
router.put('/:id', withAuth, async (req, res) => {
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

router.delete('/:id', withAuth, async (req, res) => {
  try{ 
    const affectedRows = await Interest.destroy({ where: { id: req.params.id }});

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch(err) {
    res.status(400).json();
  }
})

module.exports = router;