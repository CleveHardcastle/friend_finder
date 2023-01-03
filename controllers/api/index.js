const router = require("express").Router();

const messageRoutes = require("./messageRoutes");
const roomRoutes = require("./roomRoutes");


router.use("/message", messageRoutes);
router.use("/room", roomRoutes);


module.exports = router;
