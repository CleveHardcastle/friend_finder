const router = require('express').Router();
const { roomMember, User } = require('../../models');

// triggered when a logged in user joins a room
router.put('/', async (req, res) => {
  try {
    const joinRoom = await roomMember.create({ ...req.body, member_id: req.session.user_id });
    res.status(200).json(joinRoom);
  } catch(err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const rowsAffected = await roomMember.destroy({ where: { room_id: req.params.id, user_id: req.session.user_id }});

    if (rowsAffected > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch(err) {
    res.status(400).json(err);
  }
})

module.exports = router