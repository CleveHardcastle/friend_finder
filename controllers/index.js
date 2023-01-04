const router = require("express").Router();

const homeRoutes = require("./homeRoutes");
const apiRoutes = require("./api");
const profile = require("./profile");
const room = require("./room.js");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/profile", profile);
// router.use("/room", room);

module.exports = router;
