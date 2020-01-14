const Book = require('./book');
// const Author = require('../author/author');
// const Genre = require('../genre/genre');

const books = (_, args, ctx) => {
  return Book.find({})
    .populate('authors')
    .populate('genres')
    .populate('status')
    .sort({ title: args.sort === 'DESC' ? -1 : 1 })
    .exec();
};

const book = (_, args, ctx) => {
  return Book.findById(args.id)
    .populate('authors')
    .populate('genres')
    .exec();
};

const addBook = (_, args, ctx) => {
  console.log(args.input);
  const authorsInput = args.input.authors.map(ids => ids.id);
  const genresInput = args.input.genres.map(ids => ids.id);
  return Book.create({
    ...args.input,
    authors: authorsInput,
    genres: genresInput,
  });
};

const updateBook = (_, args, ctx) => {
  console.log(args);
  const authorsInput = args.input.authors.map(ids => ids.id);
  const genresInput = args.input.genres.map(ids => ids.id);

  return Book.findOneAndUpdate(
    { _id: args.id },

    {
      ...args.input,
      authors: authorsInput,
      genres: genresInput,
    }
    // { $addToSet: { authors: { $each: args.input.authors } } }
  );
};

const deleteBook = (_, args, ctx) => {
  return Book.deleteOne({ _id: args.id });
};

// const authors = book => {
//   console.log('called in authors');
//   return Author.find({ _id: { $in: book.authors } }).exec();
// };

// const genres = book => {
//   console.log('called in genres');
//   return Genre.find({ _id: { $in: book.genres } }).exec();
// };

module.exports = {
  Query: {
    book,
    books,
  },
  Mutation: {
    addBook,
    updateBook,
    deleteBook,
  },
  // Book: {
  //   // authors,
  //   genres,
  // },
};
