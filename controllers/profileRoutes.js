const router = require("express").Router();
const { User, Interest, roomMember, Room, Category } = require("../models");
const withAuth = require('../utils/auth')

router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Interest,
          attributes: ["id", "body"],
          include: [{
            model: Category,
            attributes: ["name"],
          }],
        },
      ],
    });

    const user = userData.get({ plain: true });
    const owner = (req.session.userId == req.params.id);

    res.render('userProfile', { user, owner });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: ["first_name", "last_name", "gender", "age"],
      include: [
        {
          model: Interest,
          attributes: ["id", "category_id", "body"],
          include: [{
            model: Category,
            attributes: ["name"],
          }],
        },
      ],
    });
    
    const user = userData.get({ plain: true });

    res.render('editProfile', { user })
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
