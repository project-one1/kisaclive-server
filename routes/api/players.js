const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");

// Load Player model
const Player = require("../../models/Player");

// @route GET api/players/test
// @description tests player route
// @access Public
router.get("/test", (req, res) => res.send("player route testing!"));
router.get("/search", (req, res) => {
  console.log(req.query)

  const query = {
    searchQuery: req.query.searchQuery,
    school: req.query.school == "All School"? "": req.query.school,
    grade: req.query.grade == "All Grade"? "": req.query.grade,
    sex: req.query.sex == "All Sex"? "": req.query.sex,
    sport: req.query.sport == "All Sport"? "": req.query.sport,
  }

  Player.find({
    playername:  { $regex:query.searchQuery, $options : 'i' } ,
    school: { $regex:query.school},
    grade: { $regex:query.grade}
  })
    .then((player) => res.json(player))
    .catch((err) => res.status(404).json({ noplayerfound: "No Player found" }));
});
// { $in: [req.query.searchQuery,"Chloe Lee"] }
/* router.get("/search/:id", (req, res) => {
  console.log(req.body)
  console.log(req.params.searchname);
  Player.find({
    playername: { $in: [req.params.searchname, "Chloe Lee"] },
    school: "SJA",
  })
    .then((player) => res.json(player))
    .catch((err) => res.status(404).json({ noplayerfound: "No Player found" }));
}); */



// @route GET api/books
// @description Get all books
// @access Public
router.get("/", (req, res) => {
  //hello
  Player.find()
    .then((players) => res.json(players))
    .catch((err) =>
      res.status(404).json({ noplayerfound: "No Players found" })
    );
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get("/:id", (req, res) => {
  console.log(req.params.id);
  Player.findById(req.params.id)
    .then((player) => res.json(player))
    .catch((err) => res.status(404).json({ noplayerfound: "No Player found" }));
});

// @route GET api/books
// @description add/save book
// @access Public
router.post("/", (req, res) => {
  Player.create(req.body)
    .then((player) => res.json({ msg: "Player added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this player" })
    );
});

router.post("/many", (req, res) => {
  console.log(req.body)
  Player.create(req.body)
    .then((player) => res.json({ msg: "Players added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this player" })
    );
});

// @route GET api/books/:id
// @description Update book
// @access Public
router.put("/:id", (req, res) => {
  Player.findByIdAndUpdate(req.params.id, req.body)
    .then((player) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete("/:id", (req, res) => {
  Player.findByIdAndRemove(req.params.id, req.body)
    .then((player) => res.json({ mgs: "Player entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a player" }));
});

module.exports = router;
