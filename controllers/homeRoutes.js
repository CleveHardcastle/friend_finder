const router = require("express").Router();
const { Room, User, roomMember } = require("../models");
const room = require("./api/roomRoutes");

router.get("/", async (req, res) => {
  try {
    // If user is logged in, render room user is in
    const loggedIn = req.session.loggedIn
    if (req.session.loggedIn) {
      const roomsData = await Room.findAll({
        attributes: ["id", "title", "description", "creator_id"],
        include: [
          {
            model: roomMember,
            attributes: [],
            where: {
              member_id: req.session.userId,
            },
          },
        ],
      });

      const rooms = roomsData.map((room) => room.get({ plain: true }));
      res.render("allRooms", { rooms, loggedIn });
    } else {
      const roomsData = await Room.findAll({ include: User });
      const rooms = roomsData.map((room) => room.get({ plain: true }));

      res.render("allRooms", { rooms, loggedIn });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  const loggedIn = req.session.loggedIn;
  if (req.session.loggedIn) {
    res.redirect("/");
  }
  res.render("login", { loggedIn });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  const loggedIn = false;
  res.render('logout', { loggedIn });
})

router.get("/signup", (req, res) => {
  const loggedIn = req.session.loggedIn;
  if (req.session.loggedIn) {
    res.redirect("/");
  }
  res.render("signup", { loggedIn });
});

router.get("/about", (req, res) => {
  const loggedIn = req.session.loggedIn;
  res.render("about", { loggedIn });
});

router.get("/dashboard", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
  } else {
    try {
      const roomData = await Room.findAll({
        include: User,
        where: { creator_id: req.session.userId }
      })
      const rooms = roomData.map((room) => room.get({ plain: true }));
      const loggedIn = req.session.loggedIn;

      res.render('dashboard', { rooms, loggedIn });
    } catch (err) {
      res.status(500).json(err);
    }
  
  }
});

module.exports = router;
