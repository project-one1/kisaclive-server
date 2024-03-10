const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  playerimage: {
    type: String,
    required: false
  },
  playername: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  },
  sport: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  division: {
    type: String,
    required: false
  },
  playernumber: {
    type: String,
    required: true
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Player = mongoose.model('player', PlayerSchema);
