const room = require('express').Router();
const { Room } = require('../../models');
const withAuth = require('../../utils/auth')

room.post('/', withAuth, async (req, res) => {
  try {
    const newRoom = await Room.create({ ...req.body,  creator_id: req.session.userId });
    res.status(200).json(newRoom);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

room.put('/:id', withAuth, async (req, res) => {
  try {
    const [rowsAffected] = await Room.update(req.body, { where: { id: req.params.id }});

    if (rowsAffected > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(400).json(err);
  }
})

room.delete('/:id', withAuth, async (req, res) => {
  try {
    const rowsAffected = await Room.destroy({ where: { id: req.params.id }});

    if (rowsAffected > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch(err) { 
    res.status(400).json(err);
  }
})

module.exports = room;