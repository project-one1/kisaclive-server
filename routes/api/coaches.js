const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");


// Load Coaches model
const Coaches = require("../../models/Coaches");

// @route GET api/coach/test
// @description tests coach route
// @access Public
router.get("/test", (req, res) => res.send("Coaches route testing!"));

// @route GET api/books
// @description Get all books
// @access Public
router.get("/", (req, res) => {
  Coaches.find()
    .then((coach) => res.json(coach))
    .catch((err) =>
      res.status(404).json({ noplayerfound: "No Players found" })
    );
});

router.get("/search", (req, res) => {
  console.log("coach", req.query)

  const query = {
    searchQuery: req.query.searchQuery,
    school: req.query.school == "All School"? "": req.query.school,
    grade: req.query.grade == "All Grade"? "": req.query.grade,
    sex: req.query.sex == "All Sex"? "": req.query.sex,
    sport: req.query.sport == "All Sport"? "": req.query.sport,
  }

  Coaches.find({
    coachname:  { $regex:query.searchQuery, $options : 'i' } ,
    school: { $regex:query.school}
  })
    .then((coach) => res.json(coach))
    .catch((err) => res.status(404).json({ noplayerfound: "No Player found" }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get("/:id", (req, res) => {
  Coaches.findById(req.params.id)
    .then((coach) => res.json(coach))
    .catch((err) => res.status(404).json({ noplayerfound: "No Coaches found" }));
});

// @route GET api/books
// @description add/save book
// @access Public
router.post("/",(req, res) => {
    Coaches.create(req.body)
      .then((coach) => res.json({ msg: "Coaches added successfully" }))
      .catch((err) =>
        res.status(400).json({ error: "Unable to add this coach" })
      );
  }
);

router.post("/many", (req, res) => {
  Coaches.create(req.body)
    .then((coach) => res.json({ msg: "Players added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this coach" })
    );
});

// @route GET api/books/:id
// @description Update book
// @access Public
router.put("/:id", (req, res) => {
  Coaches.findByIdAndUpdate(req.params.id, req.body)
    .then((coach) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete("/:id", (req, res) => {
  Coaches.findByIdAndRemove(req.params.id, req.body)
    .then((coach) => res.json({ mgs: "Coaches entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a coach" }));
});

module.exports = router;
