const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class roomMember extends Model {}

roomMember.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  member_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id',
    },
  },
  room_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Room',
      key: 'id',
    },
  },
}, {
  sequelize,
  freezeTableName: true,
})

module.exports = roomMember;