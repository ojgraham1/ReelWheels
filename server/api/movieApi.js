// // const { PrismaClient } = require("@prisma/client");
// // const axios = require("axios");
// // const express = require("express");
// // const pokemonRouter = express.Router();
const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// //paldea
// pokemonRouter.get("/gen9", async (req, res, next) => {
//   const response = await axios.get("https://pokeapi.co/api/v2/pokedex/31");

//   res.send(response.data.pokemon_entries);
// });

// //kitakami
// pokemonRouter.get("/gen9a", async (req, res, next) => {
//   const response = await axios.get("https://pokeapi.co/api/v2/pokedex/32");

//   res.send(response.data.pokemon_entries);
// });

// //blueberry academy
// pokemonRouter.get("/gen9b", async (req, res, next) => {
//   const response = await axios.get("https://pokeapi.co/api/v2/pokedex/33");

//   res.send(response.data.pokemon_entries);
// });

// //   get pokemon by id
// pokemonRouter.get("/:id", async (req, res, next) => {
//   const response = await axios.get(
//     `https://pokeapi.co/api/v2/pokemon/${req.params.id}`
//   );

//   res.send(response.data);
// });
// // get pokemon species by id
// pokemonRouter.get("/species/:id", async (req, res, next) => {
//   const response = await axios.get(
//     `https://pokeapi.co/api/v2/pokemon-species/${req.params.id}`
//   );

//   res.send(response.data);
// });
// // get pokemon evolution chain
// pokemonRouter.get("/evolution/:id", async (req, res, next) => {
//   const response = await axios.get(
//     `https://pokeapi.co/api/v2/evolution-chain/${req.params.id}`
//   );

//   res.send(response.data);
// });

// module.exports = pokemonRouter;