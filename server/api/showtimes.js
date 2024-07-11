const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//get Showtimes
router.get("/", async (req, res) => {
  try {
    const showtimes = await prisma.showtimes.findMany({});
    res.status(200).json(showtimes);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//get Showtimes by Movie ID
router.get("/:movieId", async (req, res) => {
  const movieId = parseInt(req.params.movieId);
  try {
    const showtimes = await prisma.showtimes.findMany({
      where: {
        movie_id: movieId,
      },
    });
    res.status(200).json(showtimes);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//get nearest theater showtimes by coordinates
router.post("/nearest", async (req, res) => {
  const { latitude, longitude, movieId } = req.body;

  try {
    const theaters = await prisma.theater.findMany({});
    let nearestTheater = null;
    let minDistance = Number.MAX_VALUE;

    theaters.forEach((theater) => {
      const distance = Math.sqrt(
        Math.pow(theater.latitude - latitude, 2) +
          Math.pow(theater.longitude - longitude, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestTheater = theater;
      }
    });

    if (nearestTheater) {
      const showtimes = await prisma.showtimes.findMany({
        where: {
          theater_id: nearestTheater.id,
          movie_id: movieId,
        },
      });

      res.status(200).json(showtimes);
    } else {
      res.status(404).json({ msg: "No theaters found" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
