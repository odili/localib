import Book from './book';
import Author from '../author/author';
import Genre from '../genre/genre';

const books = (_, res, cts) => {
  return Book.find({}).exec();
};

const book = (_, args, cts) => {
  return (
    Book.findById(args.id)
      // .populate('authors')
      // .populate('genres')
      .exec()
  );
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

const authors = book => {
  return Author.find({ _id: { $in: book.authors } }).exec();
};

const genres = book => {
  return Genre.find({ _id: { $in: book.genres } }).exec();
};

export default {
  Query: {
    book,
    books,
  },
  Mutation: {
    addBook,
    updateBook,
    deleteBook,
  },
  Book: {
    authors,
    genres,
  },
};
