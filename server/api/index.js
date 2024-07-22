const express = require("express");
const router = express.Router();

// Adding routes for each module using router.use
router.use("/users", require("./users"));
router.use("/theater", require("./theater"));
router.use("/showtimes", require("./showtimes"));
router.use("/reservations", require("./reservations"));

module.exports = router;
