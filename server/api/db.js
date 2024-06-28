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
    const response = await client.query(`SELECT * FROM Users WHERE id = $1`, [
        id,
    ]);
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
  
// MovieApi

// Theater

// Showtimes

// Reservations


module.exports = {
    getAllUsers,
    getUserById
}