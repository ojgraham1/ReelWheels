const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


// Get All Theaters
router.get("/", async (req, res) => {
    try {
        const theaters = await prisma.theater.findMany()
        res.status(200).json(theaters)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    };
});

// Get Theater By Id
router.get("/:id", async (req, res) => {
    try {
        const theater = await prisma.theater.findUnique({
            where: {
                id: Number(req.params.id),
            },
        })
        res.status(200).json(theater)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    };
});

// Get Theater By Location
router.get("/location/:location", async (req, res) => {
    try {
        console.log(req.params.location)

        const theater = await prisma.theater.findMany({
            where: {
                Location: {
                    contains: req.params.location,
                }
            },
        })
        res.status(200).json(theater)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    };
});

// Create New Theater
router.post("/", async (req, res) => {
    console.log(req.body);
    const { Location, Address, Capacity, email } = req.body
    try {
        const theater = await prisma.theater.create({
            data: {
                Location: Location, 
                Address: Address, 
                Capacity: Capacity, 
                email: email,
            },
        })
        res.status(201).json(theater)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    };
});

// Update Existing Theater
router.put("/:id", async (req, res) => {
    const { Location, Address, Capacity, email } = req.body
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
        })
        res.status(200).json(theater)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    };
});

// Delete Existing Theater
router.delete("/:id", async (req, res) => {
    try {
        const theater = await prisma.theater.delete({
            where: {
                id: Number(req.params.id),
            },
        })
        res.status(200).json(theater)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    };
});

module.exports = router;