const router = require("express").Router();
const { User, Interest, roomMember, Room } = require("../models");

router.get("/", async (req, res) => {
  try {
    const profile = await User.findAll({
      attributes: ["first_name", "last_name", "gender", "age"],
      include: [
        {
          model: Interest,
          attributes: ["body"],
        },
      ],
    });

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const profile = await User.findByPk(req.params.id, {
      attributes: ["first_name", "last_name", "gender", "age"],
      include: [
        {
          model: Interest,
          attributes: ["body"],
        },
      ],
    });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
