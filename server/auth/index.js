const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Register 
router.post('/register', async (req, res) => {
  const { username, password, firstName, lastName, email, address, phoneNumber, birthdate, isAdmin } = req.body;

  try {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    const newUser = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        firstName,
        lastName,
        email,
        address,
        phoneNumber,
        birthdate,
        isAdmin: Boolean(isAdmin),
      }
    });

    res.status(201).json({ message: 'User registered successfully', newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login 
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {

    const user = await prisma.users.findUnique({
      where: {
        username,
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1w' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

