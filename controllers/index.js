const router = require("express").Router();

const homeRoutes = require("./homeRoutes");
const apiRoutes = require("./api");
const profile = require("./profile");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/profile", profile);

module.exports = router;
