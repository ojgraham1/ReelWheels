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
    // const { username, password, firstName, lastName, email, address, phoneNumber, birthdate, isAdmin } = user;
    // const token = await jwt.sign({ id: user.id }, jwtSecret);
    // // console.log("Token generated:", token);
    // const response = await client.query(
    // `INSERT INTO users (username, password, firstName, lastName, email, address, phoneNumber, birthdate, isAdmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    // [username, await bcrypt.hash(password, 5), firstName, lastName, email, address, phoneNumber, birthdate, isAdmin]
    // );
    // return response.rows[0];
};

const updateUser = async (id, user) => {
    const {username, password, firstName, lastName, email, address, phoneNumber, birthdate, isAdmin } = user;
    const response = await client.query(
      `UPDATE users SET username = $1, password = $2, firstName = $3, lastName = $4, email = $5, address = $6, phoneNumber = $7, birthdate = $8, isAdmin = $9 WHERE id = $10 RETURNING *`,
      [username, password, firstName, lastName, email, address, phoneNumber, birthdate, isAdmin, id]
    );
    return response.rows[0];
};


// MovieApi

// Theater

// Showtimes

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

const createReservation = async (Reservations) => {
    const { user_id, quantity, carpass, isPurchased, showtime_id, timePurchased } = Reservations;
    const response = await client.query(
        `INSERT INTO Reservations (user_id, quantity, carpass, isPurchased, showtime_id, timePurchased) VALUES ($1, $2, $3, $4, $5, $6 RETURNING *`,
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

    // Reservations
    getAllReservations,
    getReservationById,
    getReservationByUserId,
    deleteReservation,
    createReservation,
}