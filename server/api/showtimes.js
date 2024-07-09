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

module.exports = router;
