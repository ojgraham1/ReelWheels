const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all movies
router.get("/", async (req, res) => {
  try {
    const movies = await prisma.movieAPI.findMany();
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch movies!" });
  }
});

// Get movie by id
router.get("/:id", async (req, res) => {
  const movieId = parseInt(req.params.id);
  try {
    const movie = await prisma.movieAPI.findUnique({
      where: { id: movieId },
    });
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ error: "Movie not found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch movie!" });
  }
});

// Search movie by title
router.get("/search/:title", async (req, res) => {
  const { title } = req.params;
  try {
    const movies = await prisma.movieAPI.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error searching movies:", error);
    res.status(500).json({ error: "Failed to search movies!" });
  }
});

// Get movies by release date
router.get("/filter/release_date", async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const movies = await prisma.movieAPI.findMany({
      where: {
        release_date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to filter movies!" });
  }
});

// Get movies by rating
router.get("/filter/rating", async (req, res) => {
  const { minRating, maxRating } = req.query;
  try {
    const movies = await prisma.movieAPI.findMany({
      where: {
        vote_average: {
          gte: parseFloat(minRating),
          lte: parseFloat(maxRating),
        },
      },
    });
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to filter movies!" });
  }
});

module.exports = router;
