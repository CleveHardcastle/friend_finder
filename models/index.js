const User = require('./User');
const Room = require('./Room');
const Message = require('./Message');
const Interest = require( './Interest');
const Category = require('./Category');
const roomMember = require('./roomMember')

Interest.belongsTo(Category, {
  foreignKey: 'category_id',
});

Interest.belongsTo(User, {
  foreignKey: 'user_id',
});

Room.belongsTo(User, {
  foreignKey: 'creator_id',
  onDelete: 'CASCADE'
});

Room.belongsToMany(User, {
  through: roomMember,
  foreignKey: 'room_id',
});

Room.hasMany(Message, {
  foreignKey: 'room_id',
});

Message.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Interest, {
  foreignKey: 'user_id',
});

User.hasMany(Room, {
  foreignKey: 'creator_id',
});

User.belongsToMany(Room, {
  through: roomMember,
  foreignKey: 'member_id',
});

module.exports = {
  User,
  Room,
  Message,
  Interest,
  Category,
  roomMember
};