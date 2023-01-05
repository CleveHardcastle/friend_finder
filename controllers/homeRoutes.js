const router = require('express').Router();
const { Room, User, roomMember } = require('../models');

router.get('/', async (req, res) => {
  try {
    // If user is logged in, render room user is in 
    if (req.session.loggedIn) {
      const roomsData = await Room.findAll({
        attributes: ["id", "title", "description", "creator_id"],
        include: [{ 
          model: roomMember,
          attributes: [],
          where: {
            member_id: req.session.userId
          }
        }],
      });

      const rooms = roomsData.map((room) => room.get({ plain: true }));
      res.render('allRooms', { rooms });

    } else {
      const roomsData = await Room.findAll({ include: User });
      const rooms = roomsData.map((room) => room.get({ plain: true }));

      res.render('allRooms', { rooms });
    }
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
  }
  res.render('signup');
});

module.exports = router;