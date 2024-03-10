const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  team1logo: {
    type: String,
    required: false
  },
  team2logo: {
    type: String,
    required: false
  },
  team1name: {
    type: String,
    required: true
  },
  team2name: {
    type: String,
    required: true
  },
  team1score: {
    type: Number,
    required: true
  },
  team2score: {
    type: Number,
    required: true
  },
  gametime: {
    type: String,
    required: true
  },
  quarter: {
    type: Number,
    required: true
  },
  final:{
    type: Boolean,
    required: true
  },
  team1coach: {
    type: String,
    required: true
  },
  team2coach: {
    type: String,
    required: true
  },
  team1division: {
    type: String,
    required: false
  },
  team2division: {
    type: String,
    required: false
  },
  sports: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  date: { //game date
    type: Date,
    required: true
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Schedule = mongoose.model('schedules', ScheduleSchema);
