const mongoose = require('mongoose');

const CoachesSchema = new mongoose.Schema({
  coachimage: {
    type: String,
    required: false
  },
  coachname: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  },
  sports: {
    type: String,
    required: true
  },
  division: {
    type: String,
    required: false
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Coaches = mongoose.model('coaches', CoachesSchema);
