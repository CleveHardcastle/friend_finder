const router = require("express").Router();
const { Room, User, roomMember } = require("../models");
const room = require("./api/roomRoutes");

router.get("/", async (req, res) => {
  try {
    // If user is logged in, render room user is in
    if (req.session.loggedIn) {
      let roomsData = await Room.findAll({
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

      if ( roomsData.length === 0 ){
        roomsData = await Room.findAll({ include: User });
      }

      const loggedIn = true;
      const userId = req.session.userId;
      const rooms = roomsData.map((room) => room.get({ plain: true }));
      res.render("allRooms", { rooms, loggedIn, userId });

    } else {
      const roomsData = await Room.findAll({ include: User });
      const rooms = roomsData.map((room) => room.get({ plain: true }));
      const loggedIn = false;

      res.render("allRooms", { rooms, loggedIn }); 
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
  }
  const loggedIn = false;
  res.render("login", { loggedIn });
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
  }
  const loggedIn = false;
  res.render("signup", { loggedIn });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/dashboard", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/");
  } else {
    try {
      const roomData = await Room.findAll({
        include: User,
        where: { creator_id: req.session.userId },
      });
      const rooms = roomData.map((room) => room.get({ plain: true }));
      const userId = req.session.userId
      const loggedIn = true
      
      res.render("dashboard", { rooms, loggedIn, userId });
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

router.get("/dashboard", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/");
  } else {
    try {
      const roomData = await Room.findAll({
        include: User,
        where: { creator_id: req.session.userId },
      });
      const rooms = roomData.map((room) => room.get({ plain: true }));

      res.render("dashboard", { rooms });
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
