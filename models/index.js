const User = require('./User');
const Room = require('./Room');
const Message = require('./Message');
const Interest = require( './Interest');
const Category = require('./Category');
const roomMember = require('./roomMember');

Interest.belongsTo(Category, {
  foreignKey: 'category_id',
});

Interest.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Room.belongsTo(User, {
  foreignKey: 'creator_id',
  onDelete: 'CASCADE'
});

Room.hasMany(Message, {
  foreignKey: 'room_id',
});

Message.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Interest, {
  foreignKey: 'user_id',
});

User.hasMany(Room, {
  foreignKey: 'creator_id',
});

Room.hasMany(roomMember, {
  foreignKey: 'room_id',
});

User.hasMany(roomMember, {
  foreignKey: 'member_id',
});

roomMember.belongsTo(Room, {
  foreignKey: 'room_id',
  onDelete: 'CASCADE'
});

roomMember.belongsTo(User, {
  foreignKey: 'member_id',
  onDelete: 'CASCADE'
});

module.exports = {
  User,
  Room,
  Message,
  Interest,
  Category,
  roomMember
};