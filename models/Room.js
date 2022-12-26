const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Room extends Model {}

Room.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creator_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    },
  }
}, {
  sequelize,
  freezeTableName: true,
  timestamps: true,
})

module.exports = Room;