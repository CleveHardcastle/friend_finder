const router = require("express").Router();
const { Message, Room, User } = require("../models");


router.get("/", async (req, res) => {
  try {
    const room = await Room.findAll({
      include: [
        {
          model: Message,
        },
      ],
    });
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/:id", async (req, res) => {
  try {
    const roomData = await Room.findByPk(req.params.id, {
      include: [
        {
          model: Message,
          include: [
            {
              model: User
            }
          ]
        },
      ],
    });
    const room = roomData.get({ plain: true });
    const loggedIn = req.session.loggedIn;

    res.render('room', { room, loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;