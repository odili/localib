import mongoose from 'mongoose';

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

export default mongoose.model('book', bookSchema);
