const express = require("express");
const router = express.Router();
const {  getAllTheaters,
    getTheatersById,
    deleteTheater,
    createTheater } = require ("./db")

// add tokens
    router.get("/", async (req, res, next) => {
        try {
          res.send(await getAllTheaters());
        } catch (err) {
          next(err);
          }
          });

    router.get("/:id", async (req, res, next) => {
        try {
            res.send(await getTheatersById(req.params.id));
            } catch (err) {
              next(err);
            }
          });

    router.delete("/:id", async (req, res, next) => {
        try {
            const deletedTheater = await deleteTheater(req.params.id);
            if (deletedTheater) {
            res.json(deletedTheater);
            } else {
            res.status(404).send("Theater not found");
            }
            } catch (err) {
            next(err);
            }
            });
    router.post("/", async (req, res, next) => {
        try {
            const newTheater = await createTheater(req.body);
            res.status(201).json(newTheater);
            } catch (err) {
            next(err);
            }
            });
    
    
          module.exports = router;
