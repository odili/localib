const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'author',
      required: true,
    },
  ],
  summary: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  genres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'genre',
      required: true,
    },
  ],
});

bookSchema.virtual('url').get(function() {
  return `/book/${this._id}`;
});

bookSchema.virtual('status', {
  ref: 'bookinstance',
  localField: '_id',
  foreignField: 'book',
});

module.exports = mongoose.model('book', bookSchema);
