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

    const roomsData = await Room.findAll({
      attributes: ["id", "title", "description", "creator_id"],
      include: [{ 
        model: roomMember,
        attributes: [],
        where: {
          member_id: req.params.id
        }
      }],
    });

    const user = userData.get({ plain: true });
    const rooms = roomsData.map((room) => room.get({ plain: true }));
    const owner = (req.session.userId == req.params.id);

    res.render('userProfile', { user, rooms, owner });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: ["id", "first_name", "last_name", "gender", "age"],
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

    const categoryData = await Category.findAll({attributes: ["id", "name"]});

    const user = userData.get({ plain: true });
    const categories = categoryData.map((category) => category.get({ plain: true }));
    const genderOptions = ["Female", "Male", "Non-binary/Non-conforming", "Prefer not to respond"];

    res.render('editProfile', { user, categories, genderOptions })
    // res.json({ userData, categoryData})
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
