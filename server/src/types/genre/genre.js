const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 3,
    max: 100,
  },
});

genreSchema.virtual('url').get(function() {
  return `/genre/${this._id}`;
});

genreSchema.virtual('books', {
  ref: 'book',
  localField: '_id',
  foreignField: 'genres',
});

module.exports = mongoose.model('genre', genreSchema);
