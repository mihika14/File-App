const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  path: String,
  size: Number,
  dateAdded: {
    type: Date,
    default: Date.now
  },
  contentType: String 
});


module.exports = mongoose.model('files', fileSchema);