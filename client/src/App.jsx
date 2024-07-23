import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./api/sliceAuth";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/directory/NavBar";
import Theaters from "./components/theater/TheaterList";
import Concessions from "./components/concessions/foodMenu";
import Browse from "./components/movies/BrowseList";
import BrowsePage from "./components/movies/BrowsePage";
import BrowseTvPage from "./components/movies/BrowseTvPage";
import MovieList from "./components/movies/MovieList";
import MoviePage from "./components/movies/MoviePage";
import Watchlist from "./components/transactions/WatchList";
import Register from "./components/acc/Register";
import Login from "./components/acc/Login";
import Account from "./components/acc/Account";
import SearchBar from "./components/directory/SearchBar";
import Footer from "./components/directory/Footer";
import AboutUs from "./components/acc/AboutUs";

function App() {
  const [userToken, setUserToken] = useState(null); // State to hold user token
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Select token

  useEffect(() => {
    // Effect to check for token in local storage
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(setToken(token)); // Dispatch action to set token
      setUserToken(token);
    }
  }, [dispatch]); //Run the function once

  useEffect(() => {}, [token]); // Effect to monitor changes in token

  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/theaters" element={<Theaters />} />
        <Route path="/concessions" element={<Concessions />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/browse/:id" element={<BrowsePage />} />
        <Route path="/browse/tv/:id" element={<BrowseTvPage />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users/:username"
          element={<Account token={userToken} />}
        />
        <Route
          path="/users/:username"
          element={<Account token={userToken} />}
        />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
