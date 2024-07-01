const express = require('express');
const router = express.Router();

router.use("/users", require("./users"))
router.use("/theater", require("./theater"))
router.use("/showtimes", require("./showtimes"))
router.use("/reservations", require("./reservations"))
router.use("/movieApi", require("./movieApi"))

module.exports = router