const router = require("express").Router();

const apiRoutes = require("./api");
const profile = require("./profile");

router.use("/api", apiRoutes);
router.use("/profile", profile);

module.exports = router;
