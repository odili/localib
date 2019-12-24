import BookInstance from './bookInstance';
import Book from '../book/book';

const bookInstances = (_, args, ctx) => {
  return BookInstance.find({}).exec();
};

const bookInstance = (_, args, ctx) => {
  return BookInstance.findById(args.id)
    .populate('book')
    .exec();
};

const addBookInstance = (_, args, ctx) => {
  console.log(args.input);
  return BookInstance.create({
    ...args.input,
    book: args.input.book.id,
  });
};

const updateBookInstance = (_, args, ctx) => {
  return BookInstance.findOneAndUpdate(
    { _id: args.id },
    {
      ...args.input,
      book: args.input.book.id,
    }
  );
};

const deleteBookInstance = (_, args, ctx) => {
  return BookInstance.deleteOne({ _id: args.id });
};

const book = parent => {
  return Book.findById(parent.book._id).exec();
};

export default {
  Query: {
    bookInstance,
    bookInstances,
  },
  Mutation: {
    addBookInstance,
    updateBookInstance,
    deleteBookInstance,
  },
  BookInstance: {
    book,
  },
};
