const router = require("express").Router();
const { Message, Room, User, roomMember } = require("../models");


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

  let _userId = req.session.userId;
  if (!_userId){
    _userId = 0;
  }
  let joined = false;

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
          {
            model: roomMember,
            where: {
              member_id: _userId
            },
            required: false
          }
        ],
      });


    const room = roomData.get({ plain: true });
    const loggedIn = req.session.loggedIn;
    const userId = req.session.userId;

    if (room.roomMembers.length >= 1)
    {
      joined = true;
    }

    res.render('room', { room, loggedIn, userId, joined });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/:id', async (req,res) => {
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
        {
          model: roomMember,
          include: [{
            model: User
          }]
        }
      ]
    })

    const room = roomData.get({ plain: true });
    const loggedIn = 
    res.render('editRoom', { room, loggedIn });

  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;