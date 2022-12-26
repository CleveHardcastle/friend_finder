const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {} 

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8],
    }
  },
  description: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
    validate: {
      isInt: true
    }
  }
}, {
  sequelize,
  freezeTableName: true,
})

module.exports = User;