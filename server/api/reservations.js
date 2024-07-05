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

// Post reservations by user id
router.post("/user/:userId", veryTokey, async (req, res) => {
  const userId = parseInt(req.params.userId);
  const { quantity, carpass, showtime_id } = req.body;

  if (carpass && quantity > 1) {
    return res
      .status(400)
      .json({ error: "Cannot purchase more than one car pass ticket." });
  }

  try {
    const showtime = await prisma.showtimes.findUnique({
      where: { id: showtime_id },
    });

    if (!showtime) {
      return res.status(404).json({ error: "Showtime not found" });
    }

    if (carpass) {
      if (showtime.carPassTickets < 1) {
        return res.status(400).json({ error: "No car pass tickets available" });
      }
      showtime.carPassTickets -= 1;
    } else {
      if (showtime.generalAdmissionTickets < quantity) {
        return res
          .status(400)
          .json({ error: "Not enough general admission tickets available" });
      }
      showtime.generalAdmissionTickets -= quantity;
    }

    showtime.totalTickets -= quantity;

    await prisma.showtimes.update({
      where: { id: showtime_id },
      data: {
        carPassTickets: showtime.carPassTickets,
        generalAdmissionTickets: showtime.generalAdmissionTickets,
        totalTickets: showtime.totalTickets,
      },
    });

    const newReservation = await prisma.reservations.create({
      data: {
        quantity,
        carpass,
        showtime_id,
        user_id: userId,
        timePurchased: new Date(),
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
