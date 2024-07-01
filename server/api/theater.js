// ADD ROUTES/ROUTER
const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

export const getAllTheaters = async (req, res) => {
    try {
        const response = await prisma.theater.findMany()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    };
};



export const getTheaterById = async (req, res) => {
    try {
        const response = await prisma.theater.findUnique({
            where: {
                id: Number(req.params.id),
            },
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    };
};

// ? check if input for location should be "string" or "location"
export const getTheaterByLocation = async (req, res) => {
    try {
        const response = await prisma.theater.findUnique({
            where: {
                Location: Location(req.params.id),
            },
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    };
};

export const createTheater = async (req, res) => {
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
};

export const updateTheater = async (req, res) => {
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
};

export const deleteTheater = async (req, res) => {
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
};

module.exports = theaterRouter;