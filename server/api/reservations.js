const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// get all reservations
app.get('/reservations', async (req, res) => {
    try {
      const reservations = await prisma.reservations.findMany({
        include: {
          user: true,
          showtime: {
            include: {
              theater: true,
              movie: true,
            },
          },
        },
      });
      res.json(reservations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  module.exports = router;