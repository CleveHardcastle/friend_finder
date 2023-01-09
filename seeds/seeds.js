const { User, Room, Message, Interest, Category, roomMember } = require('../models');

const sequelize = require('../config/connection');

const seedDatabase = async() => {
  await sequelize.sync({force: true});

  const categories = await Category.bulkCreate(require('./categoryData.json'));

  process.exit(0);
};

seedDatabase();