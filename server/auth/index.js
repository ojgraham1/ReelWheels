const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const jwtSecret = process.env.JWTSEC;

console.log(jwtSecret);

const prisma = new PrismaClient();
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
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

  if (!username || !password || !firstName || !lastName || !email) {
    console.error("Missing required fields", req.body);
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        firstName,
        lastName,
        email,
        address,
        phoneNumber,
        birthdate: new Date(birthdate),
        isAdmin: Boolean(isAdmin),
      },
    });

    console.log("User registered successfully", newUser);
    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const user = await prisma.users.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { data: { userId: user.id, isadmin: user.isAdmin } },
      jwtSecret,
      { expiresIn: "1w" }
    );

    res.status(200).json({ token, userId: user.id });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
