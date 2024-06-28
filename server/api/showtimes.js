const express = require("express");
const router = express.Router();
const {
  getAllShowtimes,
  getShowtimesByTheaterId,
  getShowtimesByMovieId,
  deleteShowtimes,
  createShowtimes
} = require("./db");

router.get("/", async (req, res, next) => {
  try {
    const allShowtimes = await getAllShowtimes();
    res.send(allShowtimes);
  } catch (err) {
    next(err);
  }
});

router.get("/theater/:id", async (req, res, next) => {
  try {
    const showtimes = await getShowtimesByTheaterId(req.params.id);
    res.send(showtimes);
  } catch (err) {
    next(err);
  }
});

router.get("/movie/:id", async (req, res, next) => {
  try {
    const showtimes = await getShowtimesByMovieId(req.params.id);
    res.send(showtimes);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedShowtime = await deleteShowtimes(req.params.id);
    if (deletedShowtime) {
      res.json(deletedShowtime);
    } else {
      res.status(404).send("Showtime not found");
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newShowtime = await createShowtimes(req.body);
    res.status(201).json(newShowtime);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
