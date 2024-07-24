const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { veryTokey, isAdmin } = require('../auth/middleware')


// Get All Users
router.get("/", veryTokey, async (req, res) => {
  try {
    const users = await prisma.users.findMany()
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// Get User By Id
router.get("/:id", veryTokey, async (req, res) => {
  try {
        const user = await prisma.users.findUnique({
            where: {
                id: Number(req.params.id),
            },
        })
        res.status(200).json(user)
    } catch (error) {
       res.status(404).json({ msg: error.message })
    };
});

// Get User By Username
router.get("/username/:username", veryTokey, async (req, res) => {
  try {
    console.log(req.params.username);

    const user = await prisma.users.findUnique({
      where: {
        username: req.params.username
      },

    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});


// // Update Existing User
router.put("/:id", veryTokey, async (req, res) => {
  const {
    username,
    password,
    firstName,
    lastName,
    email,
    address,
    phoneNumber,
    birthdate,
    isAdmin,
  } = req.body;
  try {
    const user = await prisma.users.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        phoneNumber: phoneNumber,
        birthdate: birthdate,
        isAdmin: Boolean(isAdmin),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// // Delete Existing User
router.delete("/:id", veryTokey, async (req, res) => {
  try {
    const user = await prisma.users.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;