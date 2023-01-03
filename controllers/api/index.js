const router = require('express').Router();

const messageRoutes = require('./messageRoutes');
const roomRoutes = require('./roomRoutes');
const userRoutes = require('./userRoutes');
const interestRoutes = require('./interestRoutes');
const categoryRoutes = require('./categoryRoutes');


router.use('/message', messageRoutes);
router.use('/room', roomRoutes);
router.use('/user', userRoutes);
router.use('/interest', interestRoutes);
router.use('/category', categoryRoutes);


module.exports = router;