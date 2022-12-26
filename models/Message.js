const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Message extends Model {}

Message.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement : true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  freezeTableName: true,
  timestamps: true,
})

module.exports = Message;