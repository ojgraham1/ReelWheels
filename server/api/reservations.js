const express = require("express");
const router = express.Router();
const {
  getAllReservations,
  getReservationsByUserId,
  getReservationById,
  deleteReservationsById,
  deleteReservationsByUserId,
  createReservations
} = require("./db");

router.get("/", async (req, res, next) => {
  try {
    const reservations = await getAllReservations();
    res.send(reservations);
  } catch (err) {
    next(err);
  }
});

router.get("/user/:id", async (req, res, next) => {
  try {
    const reservations = await getReservationsByUserId(req.params.userId);
    res.send(reservations);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const reservation = await getReservationById(req.params.id);
    if (reservation) {
      res.send(reservation);
    } else {
      res.status(404).send("Reservation not found");
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedReservation = await deleteReservationsById(req.params.id);
    if (deletedReservation) {
      res.json(deletedReservation);
    } else {
      res.status(404).send("Reservation not found");
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/user/:id", async (req, res, next) => {
    try {
      const deletedReservation = await deleteReservationsByUserId(req.params.id);
      if (deletedReservation) {
        res.json(deletedReservation);
      } else {
        res.status(404).send("Reservation not found");
      }
    } catch (err) {
      next(err);
    }
  });

router.post("/", async (req, res, next) => {
  try {
    const newReservation = await createReservations(req.body);
    res.status(201).json(newReservation);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
