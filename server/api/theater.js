const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const {isAdmin } = require('../auth/middleware')


// Get All Theaters
router.get("/", async (req, res) => {
  try {
    const theaters = await prisma.theater.findMany();
    res.status(200).json(theaters);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Get Theater By Id
router.get("/:id", async (req, res) => {
  try {
    const theater = await prisma.theater.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(theater);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

// Get Theater By Location
router.get("/location/:location", async (req, res) => {
  try {
    console.log(req.params.location);

    const theater = await prisma.theater.findMany({
      where: {
        Location: {
          contains: req.params.location,
        },
      },
    });
    res.status(200).json(theater);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

// Create New Theater
router.post("/", isAdmin, async (req, res) => {
  console.log(req.body);
  const { Location, Address, Capacity, email } = req.body;
  try {
    const theater = await prisma.theater.create({
      data: {
        Location: Location,
        Address: Address,
        Capacity: Capacity,
        email: email,
      },
    });
    res.status(201).json(theater);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// Update Existing Theater
router.put("/:id", isAdmin, async (req, res) => {
  const { Location, Address, Capacity, email } = req.body;
  try {
    const theater = await prisma.theater.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        Location: Location,
        Address: Address,
        Capacity: Capacity,
        email: email,
      },
    });
    res.status(200).json(theater);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// Delete Existing Theater
router.delete("/:id",isAdmin, async (req, res) => {
  try {
    const theater = await prisma.theater.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(theater);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// Get Showtimes By Theater Id
router.get("/:id/showtimes", async (req, res) => {
  try {
    const showtimes = await prisma.theater.findMany({
      where: {
        id: Number(req.params.id),
      },
      include: {
        showtimes: true,
      },
    });
    res.status(200).json(showtimes);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});
// Create Showtime For Theater
router.post("/:id/showtimes", async (req, res) => {
  const { movie_id, showtime } = req.body;
  try {
    const showtime = await prisma.showtimes.create({
      data: {
        movie_id: movie_id,
        showtime: showtime,
        theater: {
          connect: {
            id: Number(req.params.id),
          },
        },
      },
    });
    res.status(201).json(showtime);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
// delete Showtime for Theater
router.delete("/:id/showtimes/:showtime_id", async (req, res) => {
  try {
    const showtime = await prisma.showtimes.delete({
      where: {
        id: Number(req.params.showtime_id),
      },
    });
    res.status(200).json(showtime);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
// Update Showtime for Theater
router.put("/:id/showtimes/:showtime_id", async (req, res) => {
  const { movie_id, showtime } = req.body;
  try {
    const showtime = await prisma.showtimes.update({
      where: {
        id: Number(req.params.showtime_id),
      },
      data: {
        movie_id: movie_id,
        showtime: showtime,
      },
    });
    res.status(200).json(showtime);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;
