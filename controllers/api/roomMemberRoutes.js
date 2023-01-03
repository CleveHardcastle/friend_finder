const router = require('express').Router();
const { roomMember, User } = require('../../models');
const withAuth = require('../../utils/auth')

// triggered when a logged in user joins a room
router.post('/', withAuth, async (req, res) => {
  try {
    const joinRoom = await roomMember.create({ ...req.body, member_id: req.session.userId });
    res.status(200).json(joinRoom);
  } catch(err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const rowsAffected = await roomMember.destroy({ where: { room_id: req.params.id, member_id: req.session.userId }});

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