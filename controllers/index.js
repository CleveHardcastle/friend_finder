const router = require("express").Router();

const homeRoutes = require("./homeRoutes");
const apiRoutes = require("./api");
const profileRoutes = require("./profileRoutes");
const room = require("./roomRoutes");
const searchRoutes = require("./searchRoutes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/profile", profileRoutes);
router.use("/room", room);
router.use("/search", searchRoutes);

module.exports = router;
