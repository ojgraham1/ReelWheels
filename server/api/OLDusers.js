// const express = require("express");
// const router = express.Router();

// //import token / admin
// const {  
//   getAllUsers,
//   getUserById,
//   getUserByUsername,
//   deleteUser,
//   createUser 
// } = require ("./db")

// // add tokens
// router.get("/", async (req, res, next) => {
//   try {
//     res.send(await getAllUsers());
//     } catch (err) {
//     next(err);
//   }
// });

// router.get("/:id", async (req, res, next) => {
//   try {
//     res.send(await getUserById(req.params.id));
//     } catch (err) {
//     next(err);
//   }
// });

// router.get("/:username", async (req, res, next) => {
//   try {
//     res.send(await getUserByUsername(req.params.id));
//     } catch (err) {
//     next(err);
//   }
// });

// router.delete("/:id", async (req, res, next) => {
//   try {
//     const deletedUser = await deleteUser(req.params.id);
//     if (deletedUser) {
//     res.json(deletedUser);
//     } else {
//     res.status(404).send("User not found");
//     }
//     } catch (err) {
//     next(err);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const newUser = await createUser(req.body);
//     res.status(201).json(newUser);
//     } catch (err) {
//     next(err);
//   }
// });


// module.exports = router;

