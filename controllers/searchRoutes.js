const router = require("express").Router();
const { Room, User, roomMember } = require("../models");
const op = require('sequelize').Op;

router.get("/:text", async (req, res) => {
    try {
        const search = req.params.text.split("_");
        console.log(search);
        const loggedIn = req.session.loggedIn;

        let rooms = [];
        let newRoom;

        for (let i = 0; i < search.length; i++) {
            const roomsData = await Room.findAll({
                where: {
                  [op.or]: [
                    {
                    title: {
                      [op.like]: `%${search[i]}%`
                    }
                  },
                  {
                    description: {
                      [op.like]: `%${search[i]}%`
                    }
                  }
                ]
            }
            });
    
            newRoom = roomsData.map((room) => room.get({ plain: true }));
            console.log(newRoom);
            rooms = rooms.concat(newRoom);
            console.log(rooms);
        }

        rooms = rooms.sort((a, b) => a.id - b.id).filter(
            function(room, index, rooms){
                return !index || room.id != rooms[index -1].id;
            });
        
        res.render("browse", {rooms, loggedIn});

    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;