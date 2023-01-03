const room = require('express').Router();
const e = require('express');
const { Room } = require('../../models');

room.post('/', async (req, res) => {
  try {
    const newRoom = await Room.create({ ...req.body,  creator_id: req.session.user_id });
    res.status(200).json(newRooms);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

room.put('/:id', async (req, res) => {
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

room.delete('/:id', async (req, res) => {
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