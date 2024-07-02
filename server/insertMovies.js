const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const { application, response } = require("express");
require("dotenv").config();

const prisma = new PrismaClient();

// Fetching data for now playing movies from the API.
async function fetchNowPlayingMovies() {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/now_playing",
    {
      params: {
        api_key: process.env.TMDB_API_KEY,
      },
    }
  );
  return response.data.results;
}

// Push movie into database.
async function insertNowPlayingMovies() {
  const movies = await fetchNowPlayingMovies();

  for (const movie of movies) {
    await prisma.movieAPI.upsert({
      where: { id: movie.id }, // Checking to see if movie exist in database!
      update: {
        title: movie.title,
        overview: movie.overview,
        release_date: new Date(movie.release_date),
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        vote_average: movie.vote_average,
      },
      create: {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        release_date: new Date(movie.release_date),
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        vote_average: movie.vote_average,
      },
    });
  }

  console.log("Movies inserted/updated successfully."); // This will display in console if everything goes to plan
}
// Error handler
// insertNowPlayingMovies()
//   .catch((e) => console.error(e))
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

module.exports = insertNowPlayingMovies;
