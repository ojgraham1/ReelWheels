const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { veryTokey, isAdmin } = require("../auth/middleware");

// get all reservations
router.get("/", isAdmin, async (req, res) => {
  try {
    const reservations = await prisma.reservations.findMany({
      include: {
        user: true,
        showtime: true,
      },
    });
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/", isAdmin, async (req, res) => {
  try {
    const reservations = await prisma.reservations.findMany({
      include: {
        user: true,
        showtime: true,
      },
    });
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//reservations by user id
router.get("/user/:userId", veryTokey, async (req, res) => {
  const userId = parseInt(req.params.userId);
  try {
    const reservations = await prisma.reservations.findMany({
      where: {
        user_id: userId,
      },
      include: {
        user: true,
        showtime: true,
      },
    });
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//reservations by user id
router.get("/user/:userId", veryTokey, async (req, res) => {
  const userId = parseInt(req.params.userId);
  try {
    const reservations = await prisma.reservations.findMany({
      where: {
        user_id: userId,
      },
      include: {
        user: true,
        showtime: true,
      },
    });
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//reservations by theater id
router.get("/theater/:theaterId", isAdmin, async (req, res) => {
  const theaterId = parseInt(req.params.theaterId);
  try {
    const reservations = await prisma.reservations.findMany({
      where: {
        showtime: {
          theater_id: theaterId,
        },
      },
      include: {
        user: true, // Include user details
        showtime: true, // Include showtime details
      },
    });
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//reservations by theater id
router.get("/theater/:theaterId", isAdmin, async (req, res) => {
  const theaterId = parseInt(req.params.theaterId);
  try {
    const reservations = await prisma.reservations.findMany({
      where: {
        showtime: {
          theater_id: theaterId,
        },
      },
      include: {
        user: true, // Include user details
        showtime: true, // Include showtime details
      },
    });
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// post reservations by user id
router.post("/user/:userId", veryTokey, async (req, res) => {
  const userId = parseInt(req.params.userId);
  const { quantity, carpass, showtime_id } = req.body;
  try {
    const newReservation = await prisma.reservations.create({
      data: {
        quantity,
        carpass,
        showtime_id,
        user: {
          connect: { id: userId }, // Connect reservation to user
        },
      },
    });
    res.json(newReservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/user/:userId", veryTokey, async (req, res) => {
  const userId = parseInt(req.params.userId);
  const { quantity, carpass, showtime_id } = req.body;
  try {
    const showtime = await prisma.showtimes.findUnique({
      where: { id: showtime_id },
      include: { theater: true },
    });

    if (!showtime) {
      return res.status(404).json({ error: "Showtime not found" });
    }

    let updatedData = {};
    if (carpass) {
      if (showtime.theater.carpassAvailable >= quantity) {
        updatedData.carpassAvailable =
          showtime.theater.carpassAvailable - quantity;
      } else {
        return res
          .status(400)
          .json({ error: "Not enough car pass tickets available" });
      }
    } else {
      if (showtime.theater.generalAdmissionAvailable >= quantity) {
        updatedData.generalAdmissionAvailable =
          showtime.theater.generalAdmissionAvailable - quantity;
      } else {
        return res
          .status(400)
          .json({ error: "Not enough general admission tickets available" });
      }
    }

    await prisma.theater.update({
      where: { id: showtime.theater_id },
      data: updatedData,
    });

    const newReservation = await prisma.reservations.create({
      data: {
        quantity,
        carpass,
        showtime_id,
        user: { connect: { id: userId } },
      },
    });

    res.json(newReservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete reservation by id
router.delete("/:reservationId", veryTokey, async (req, res) => {
  const reservationId = parseInt(req.params.reservationId);
  try {
    await prisma.reservations.delete({
      where: {
        id: reservationId,
      },
    });
    res.json({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
