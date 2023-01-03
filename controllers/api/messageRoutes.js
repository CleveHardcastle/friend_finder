const message = require('express').Router();
const { Message } = require('../../models');
const withAuth = require('../../utils/auth')

message.get('/', async (req, res) => {
  try {
    const messageData = await Message.findAll();
    res.status(200).json(messageData);
  } catch(err) {
    res.status(400).json(err);
  }
})

message.post('/', withAuth, async (req, res) => {
  try {
    const newMessage = await Message.create( { ...req.body, user_id: req.session.userId });
    res.status(200).json(newMessage);
  } catch(err) {
    console.err(err);
    res.status(400).json(err);
  }
});

message.put('/:id', withAuth, async (req, res) => {
  try {
    const [rowsAffected] = await Message.update(req.body, { where: { id: req.params.id }});

    if (rowsAffected > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(400).json(err);
  }
})


module.exports = message;