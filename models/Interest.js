const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Interest extends Model {}

Interest.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement : true,
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  freezeTableName: true,
})

module.exports = Interest;