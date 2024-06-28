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

const createUser = async (user) => {
    const { username, password, firstName, lastName, email, address, phoneNumber, birthdate, isAdmin } = user;
    const token = await jwt.sign({ id: user.id }, jwtSecret);
    console.log("Token generated:", token);
    const response = await client.query(
    `INSERT INTO users (username, password, firstName, lastName, email, address, phoneNumber, birthdate, isAdmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [username, password, firstName, lastName, email, address, phoneNumber, birthdate, isAdmin]
    );
    return response.rows[0];
};


// MovieApi

// Theater

// Showtimes

// Reservations


module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    deleteUser,
    createUser,
}