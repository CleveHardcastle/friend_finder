const router = require('express').Router();
const { Room, User, roomMember } = require('../models');
const room = require('./api/roomRoutes');

router.get('/', async (req, res) => {
  try {
    // if (req.session.loggedIn) {
    //   const roomsData = await roomMember.findAll( { 
    //     where: {
    //       member_id: req.session.user_id
    //     },
    //     include: Room
    //   });

    //   const rooms = roomsData.map((room) => room.get({ plain: true }));
    //   res.render('home', { rooms });

    // } else {
    const roomsData = await Room.findAll({ include: User });
    const rooms = roomsData.map((room) => room.get({ plain: true }));

    res.render('allRooms', { rooms });
    // }
  } catch(err) {
    res.status(500).json(err);
  }
})

module.exports = router;