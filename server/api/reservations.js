const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// get all reservations
router.get('/', async (req, res) => {
    try {
      const reservations = await prisma.reservations.findMany({
        include: {
          user: true,      
          showtime: true   
        },
      });
      res.json(reservations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  //reservations by user id
router.get('/user/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
      const reservations = await prisma.reservations.findMany({
        where: {
          user_id: userId
        },
        include: {
          user: true,  
          showtime: true  
        }
      });
      res.json(reservations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  //reservations by theater id
router.get('/theater/:theaterId', async (req, res) => {
    const theaterId = parseInt(req.params.theaterId);
    try {
      const reservations = await prisma.reservations.findMany({
        where: {
          showtime: {
            theater_id: theaterId
          }
        },
        include: {
          user: true,  // Include user details
          showtime: true  // Include showtime details
        }
      });
      res.json(reservations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// post reservations by user id
router.post('/user/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    const { quantity, carpass, showtime_id } = req.body;
    try {
      const newReservation = await prisma.reservations.create({
        data: {
          quantity,
          carpass,
          showtime_id,
          user: {
            connect: { id: userId }  // Connect reservation to user
          }
        }
      });
      res.json(newReservation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// delete reservation by id
router.delete('/:reservationId', async (req, res) => {
    const reservationId = parseInt(req.params.reservationId);
    try {
      await prisma.reservations.delete({
        where: {
          id: reservationId
        }
      });
      res.json({ message: 'Reservation deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  module.exports = router;