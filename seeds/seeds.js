const { User, Room, Message, Interest, Category, roomMember } = require('../models');


const userData = require('./userData.json');
const roomData = require('./roomData.json');
const roomMemberData = require('./roomMember.json');
const sequelize = require('../config/connection');

const seedDatabase = async() => {
  await sequelize.sync({force: true});

  const users = await User.bulkCreate(userData);
  const rooms = await Room.bulkCreate(roomData);
  const roomMembers = await roomMember.bulkCreate(roomMemberData);
  const categories = await Category.bulkCreate(require('./categoryData.json'));
  const messages = await Message.bulkCreate(require('./messageData.json'));
  const interests = await Interest.bulkCreate(require('./interestData.json'));

  process.exit(0);
};

seedDatabase();