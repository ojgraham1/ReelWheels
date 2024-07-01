const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3000;

const TMDB_API_KEY =
  process.env.TMDB_API_KEY || "60bff7c4b3bc017974f0186538e281a6";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

app.use(cors());
app.use(express.json());

// Route import
const usersRoute = require("./api/users");
const reservationsRoute = require("./api/reservations");
const theaterRoute = require("./api/theater");

//Routes
app.use("/users", usersRoute);
app.use("/reservations", reservationsRoute);
app.use("/theater", theaterRoute);



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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=33
