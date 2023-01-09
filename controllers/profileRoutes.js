const router = require("express").Router();
const { User, Interest, roomMember, Room, Category } = require("../models");
const withAuth = require('../utils/auth');
const cloud_name = 'danpwq1p5';

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
    const img_url = `https://res.cloudinary.com/${cloud_name}/image/upload/w_150,c_fill,ar_1:1,g_auto,r_max/${userData.img_url}.jpg`
    const owner = (req.session.userId == req.params.id);
    const loggedIn = req.session.loggedIn;
    const userId = loggedIn ? req.session.userId : null;

    res.render('userProfile', { user, rooms, img_url, owner, loggedIn, userId });
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
    const loggedIn = true;
    const userId = req.session.userId;

    res.render('editProfile', { user, categories, genderOptions, loggedIn, userId });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
