const router = require("express").Router();
const { Message, Room, User } = require("../models");


router.get("/", async (req, res) => {
  try {
    const room = await Room.findAll({
      attributes: ["title", "description"],
      inculde: [
        {
          model: Message,
          attributes: ["text"],
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
    const room = await Room.findByPk(req.params.id, {
      attributes: ["title", "description"],
      inculde: [
        {
          model: Message,
          attributes: ["text"],
        },
      ],
    });
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;