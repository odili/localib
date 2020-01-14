const Genre = require('./genre');
// const Book = require('../book/book');

const genres = (_, args, ctx) => {
  return Genre.find({})
    .populate('books')
    .sort({ name: args.sort === 'DESC' ? -1 : 1 })
    .exec();
};

const genre = (_, args, ctx) => {
  return Genre.findById(args.id)
    .populate('books')
    .exec();
};

const addGenre = (_, args, ctx) => {
  return Genre.create(args.input);
};

const updateGenre = (_, args, ctx) => {
  return Genre.findOneAndUpdate({ _id: args.id }, args.input);
};

const deleteGenre = (_, args, ctx) => {
  return Genre.deleteOne({ _id: args.id });
};

// const books = parent => {
//   return Book.find({ genres: parent._id });
// };

module.exports = {
  Query: {
    genre,
    genres,
  },
  Mutation: {
    addGenre,
    updateGenre,
    deleteGenre,
  },
  // Genre: {
  //   books,
  // },
};
