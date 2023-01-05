const router = require("express").Router();

const homeRoutes = require("./homeRoutes");
const apiRoutes = require("./api");
const profileRoutes = require("./profileRoutes");
const room = require("./room.js");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/profile", profileRoutes);
// router.use("/room", room);

module.exports = router;
