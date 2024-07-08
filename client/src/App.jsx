import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "./api/sliceAuth";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/directory/NavBar";
import Home from "./components/directory/Home";
import Theaters from "./components/theater/TheaterList";
import TheaterPage from "./components/theater/TheaterPage";
import Concessions from './components/concessions/foodMenu';
import Browse from "./components/movies/BrowseList";
import BrowsePage from "./components/movies/BrowsePage";
import BrowseTvPage from "./components/movies/BrowseTvPage";
import MovieList from "./components/movies/MovieList";
import MoviePage from "./components/movies/MoviePage";
import Watchlist from "./components/transactions/WatchList"
import Cart from "./components/transactions/Cart";
import Register from "./components/acc/Register";
import Login from "./components/acc/Login";
import Account from "./components/acc/Account";

function App() {
  const [userToken, setUserToken] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    if (token) {
      dispatch(setToken(token));
      setUserToken(token);
    }
  }, [dispatch]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/theaters" element={<Theaters />} />
        <Route path="/theater/:id" element={<TheaterPage />} />
        <Route path="/concessions" element={<Concessions />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/browse/:id" element={<BrowsePage />} />
        <Route path="/browse/tv/:id" element={<BrowseTvPage />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account token= {userToken} />} />
      </Routes>
    </div>
  );
}

export default App;
