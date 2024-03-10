const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");

const Schedule = require("../../models/Schedule");

// @route GET api/schedules/test
// @description tests schedule route
// @access Public
router.get("/test", (req, res) => res.send("schedule route testing!"));

// @route GET api/books
// @description Get all books
// @access Public
router.get("/", (req, res) => {
  Schedule.find()
    .then((schedules) => res.json(schedules))
    .catch((err) =>
      res.status(404).json({ noplayerfound: "No Players found" })
    );
});

router.get("/search", (req, res) => {
  console.log("schedule", req.query)

  const query = {
    searchQuery: req.query.searchQuery,
  }

  Schedule.find({
    team1name:  { $regex:query.searchQuery, $options : 'i' } ,
    team2name:  { $regex:query.searchQuery, $options : 'i' }
  })
    .then((schedule) => res.json(schedule))
    .catch((err) => res.status(404).json({ noplayerfound: "No Player found" }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get("/:id", (req, res) => {
  Schedule.findById(req.params.id)
    .then((schedule) => res.json(schedule))
    .catch((err) => res.status(404).json({ noplayerfound: "No Schedule found" }));
});

// @route GET api/books
// @description add/save book
// @access Public
router.post("/",(req, res) => {
    Schedule.create(req.body)
      .then((schedules) => res.json({ msg: "Schedule added successfully" }))
      .catch((err) =>
        res.status(400).json({ error: "Unable to add this schedule" })
      );
  }
);

router.post("/many", (req, res) => {
  Schedule.create(req.body)
    .then((schedules) => res.json({ msg: "Players added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this schedule" })
    );
});

// @route GET api/books/:id
// @description Update book
// @access Public
router.put("/:id", (req, res) => {
  Schedule.findByIdAndUpdate(req.params.id, req.body)
    .then((schedule) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete("/:id", (req, res) => {
  Schedule.findByIdAndRemove(req.params.id, req.body)
    .then((schedule) => res.json({ mgs: "Schedule entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a schedule" }));
});
    


module.exports = router;