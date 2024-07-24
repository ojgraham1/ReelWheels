const express = require("express");
const axios = require("axios");
const cors = require("cors");
const cron = require("node-cron");
const insertNowPlayingMovies = require("./insertMovies");
const app = express();
const port = 3000;

// add API
const TMDB_API_KEY =
  process.env.TMDB_API_KEY || "60bff7c4b3bc017974f0186538e281a6";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/../client/dist"));

// Route import
const usersRoute = require("./api/users");
const showtimesRoute = require("./api/showtimes");
const reservationsRoute = require("./api/reservations");
const theaterRoute = require("./api/theater");
const authRoute = require("./auth/index");
const movieApiRoute = require("./api/movieApi");
const { veryTokey, isAdmin } = require("./auth/middleware");

//Routes
app.use("/users", usersRoute);
app.use("/reservations", veryTokey, reservationsRoute);
app.use("/theater", theaterRoute);
app.use("/showtimes", showtimesRoute);
app.use("/auth", authRoute);
app.use("/api/movies", movieApiRoute);

// insertMovies script ran every day at midnight
cron.schedule("0 0 * * *", () => {
  console.log("Cron job triggered: Running insertNowPlayingMovies...");
  insertNowPlayingMovies()
    .then(() => console.log("Movies inserted/updated successfully."))
    .catch((error) =>
      console.error("Error running insertMovies script:", error)
    );
});

//fetch movies from TMDB API
app.get("/api/movies", async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });
    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching movies from TMDB:", error);
    res.status(500).json({ error: "Failed to fetch movies!" });
  }
});

app.use("*", express.static(__dirname + "/../client/dist"));
// start the server on port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=33
