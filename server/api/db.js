const pg = require("pg");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const jwtSecret = 'reelWheels';

// Users
const getAllUsers = async () => {
    const response = await client.query(`SELECT * FROM Users ORDER BY id ASC`);
    return response.rows;
};

const getUserById = async (id) => {
    const response = await client.query(`SELECT * FROM Users WHERE id = $1`, [id]);
    return response.rows[0];
};

const getUserByUsername = async (username) => {
    const response = await client.query(`SELECT * FROM Users WHERE username = $1`, [username]);
    return response.rows[0];
};
  
const deleteUser = async (id) => {
    await client.query(`DELETE FROM Users WHERE id = $1`, [id]);
    return { id };
};

const createUser = async (user) => {
    const { username, password, firstName, lastName, email, address, phoneNumber, birthdate, isAdmin } = user;
    const token = await jwt.sign({ id: user.id }, jwtSecret);
    console.log("Token generated:", token);
    const response = await client.query(
    `INSERT INTO users (username, password, firstName, lastName, email, address, phoneNumber, birthdate, isAdmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [username, await bcrypt.hash(password, 5), firstName, lastName, email, address, phoneNumber, birthdate, isAdmin]
    );
    return response.rows[0];
};

const updateUser = async (id, user) => {
    const {username, password, firstName, lastName, email, address, phoneNumber, birthdate, isAdmin } = user;
    const response = await client.query(
      `UPDATE users SET username = $1, password = $2, firstName = $3, lastName = $4, email = $5, address = $6, phoneNumber = $7, birthdate = $8, isAdmin = $9 WHERE id = $10 RETURNING *`,
      [username, password, firstName, lastName, email, address, phoneNumber, birthdate, isAdmin, id]
    );
    return response.rows[0];
};


// MovieAPI
// const getAllMovies = async () => {
//     const response = await client.query(`SELECT * FROM MovieAPI ORDER BY id ASC`);
//     return response.rows;
// };

// const getMovieById = async (id) => {
//     const response = await client.query(`SELECT * FROM MovieAPI WHERE id = $1`, [id]);
//     return response.rows[0];
// };

// const getMovieByTitle = async (title) => {
//     const response = await client.query(`SELECT * FROM MovieAPI WHERE title = $1`, [title]);
//     return response.rows[0];
// };


// Theater
const getAllTheaters = async () => {
    const response = await client.query(`SELECT * FROM Theater ORDER BY id ASC`);
    return response.rows;
};

const getTheaterById = async (id) => {
    const response = await client.query(`SELECT * FROM Theater WHERE id = $1`, [id]);
    return response.rows[0];
};

const getTheaterByLocation = async (Location) => {
    const response = await client.query(`SELECT * FROM Theater WHERE Location = $1`, [Location]);
    return response.rows[0];
};
  
const deleteTheater = async (id) => {
    await client.query(`DELETE FROM Theater WHERE id = $1`, [id]);
    return { id };
};

const createTheater = async (Theater) => {
    const { Location, Address, Capacity, email } = Theater;
    const response = await client.query(
      `INSERT INTO products (Location, Address, Capacity, email) VALUES ($1, $2, $3, $4) RETURNING *`,
      [ Location, Address, Capacity, email ]
    );
    return response.rows[0];
};


// Showtimes
const getAllShowtimes = async () => {
    const response = await client.query(`SELECT * FROM Showtimes ORDER BY id ASC`);
    return response.rows;
};

const getShowtimesByTheaterId = async (id) => {
    const response = await client.query(`SELECT * FROM Showtimes WHERE theater_id = $1`, [id]);
    return response.rows[0];
};

const getShowtimesByMovieId = async (Location) => {
    const response = await client.query(`SELECT * FROM Showtimes WHERE movie_id = $1`, [Location]);
    return response.rows[0];
};
  
const deleteShowtimes = async (id) => {
    await client.query(`DELETE FROM Showtimes WHERE id = $1`, [id]);
    return { id };
};

const updateShowtimes = async (id, Showtimes) => {
    const {  theater_id, movie_id, times } = Showtimes;
    const response = await client.query(
        `UPDATE Showtimes SET theater_id = $1, movie_id = $2, times = $3 WHERE id = $4 RETURNING *`,
        [ theater_id, movie_id, times, id]
    );
    return response.rows[0];
};
      
const createShowtimes = async (Showtimes) => {
    const { theater_id, movie_id, times } = Showtimes;
    const response = await client.query(
      `INSERT INTO Showtimes (theater_id, movie_id, times) VALUES ($1, $2, $3) RETURNING *`,
      [ theater_id, movie_id, times ]
    );
    return response.rows[0];
};


// Reservations
const getAllReservations = async () => {
    const response = await client.query(`SELECT * FROM Reservations ORDER BY id ASC`);
    return response.rows;
};

const getReservationById = async (id) => {
    const response = await client.query(`SELECT * FROM Reservations WHERE id = $1`, [id]);
    return response.rows[0];
};

const getReservationByUserId = async (params_id) => {
    const response = await client.query(
      `SELECT * FROM Reservations WHERE user_id = $1`,
      [params_id]
    );
    return response.rows;
};

const deleteReservation = async (id) => {
    await client.query(`DELETE FROM Reservations WHERE id = $1`, [id]);
    return { id };
};

const deleteReservationByUserId = async (id) => {
    await client.query(`DELETE FROM Reservations WHERE user_id = $1`, [id]);
    return { id };
};

const createReservation = async (Reservations) => {
    const { user_id, quantity, carpass, isPurchased, showtime_id, timePurchased } = Reservations;
    const response = await client.query(
        `INSERT INTO Reservations (user_id, quantity, carpass, isPurchased, showtime_id, timePurchased) VALUES ($1, $2, $3, $4, $5, now() RETURNING *`,
        [user_id, quantity, carpass, isPurchased, showtime_id, timePurchased]
    );
    return response.rows[0];
};


module.exports = {
    // Users
    getAllUsers,
    getUserById,
    getUserByUsername,
    deleteUser,
    createUser,
    updateUser,

    // Theater
    getAllTheaters,
    getTheaterById,
    getTheaterByLocation,
    deleteTheater,
    createTheater,

    // MovieAPI
    // getAllMovies,
    // getMovieById,
    // getMovieByTitle,

    // Showtimes
    getAllShowtimes,
    getShowtimesByTheaterId,
    getShowtimesByMovieId,
    deleteShowtimes,
    updateShowtimes,
    createShowtimes,

    // Reservations
    getAllReservations,
    getReservationById,
    getReservationByUserId,
    deleteReservation,
    deleteReservationByUserId,
    createReservation,
}