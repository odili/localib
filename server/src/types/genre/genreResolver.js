import Genre from './genre';
import Book from '../book/book';

const genres = (_, args, ctx) => {
  return Genre.find({}).exec();
};

const genre = (_, args, ctx) => {
  return Genre.findById(args.id)
    .populate('book')
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

const books = parent => {
  return Book.find({ genres: parent._id });
};

export default {
  Query: {
    genre,
    genres,
  },
  Mutation: {
    addGenre,
    updateGenre,
    deleteGenre,
  },
  Genre: {
    books,
  },
};
