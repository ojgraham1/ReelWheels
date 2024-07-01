const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      select: {
        username: true,
      },
    });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// export const getAllUsers = async (req, res) => {
//     try {
//         const response = await prisma.users.findMany()
//         res.status(200).json(response)
//     } catch (error) {
//         res.status(500).json({ msg: error.message })
//     };
// };

// Get User By Id
router.get("/:id", async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: Number(req.params.id),
      },
      select: {
        username: true,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

// Get User By Username
// ? Check if username: username() is correct input for this field
router.get("/username/:username", async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        username: req.params.username,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

// Create New User
// ? check if boolean is correct input
router.post("/", async (req, res) => {
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
    const newUser = await prisma.users.create({
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
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// export const createUser = async (req, res) => {
//     const { username, password, firstName, lastName, email, address, phoneNumber, birthdate, isAdmin  } = req.body
//     try {
//         const user = await prisma.users.create({
//             data: {
//                 username: username,
//                 password: password,
//                 firstName: firstName,
//                 lastName: lastName,
//                 email: email,
//                 address: address,
//                 phoneNumber: phoneNumber,
//                 birthdate: birthdate,
//                 isAdmin: Boolean,
//             },
//         })
//         res.status(201).json(user)
//     } catch (error) {
//         res.status(400).json({ msg: error.message })
//     };
// };

// // Update Existing User
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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
