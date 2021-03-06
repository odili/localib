const Author = require('./author');
// const Book = require('../book/book');

const authors = (_, args, ctx) => {
  return Author.find({})
    .populate('books')
    .sort({ familyName: args.sort === 'DESC' ? -1 : 1 })
    .exec();
};

const author = (_, args, ctx) => {
  return Author.findById(args.id)
    .populate('books')
    .exec();
};

const addAuthor = (_, args, ctx) => {
  return Author.create(args.input);
};

const updateAuthor = (_, args, ctx) => {
  return Author.findOneAndUpdate({ _id: args.id }, args.input).exec();
};

const deleteAuthor = (_, args, ctx) => {
  return Author.deleteOne({ _id: args.id });
};

// const books = parent => {
//   return Book.find({ authors: parent._id });
// };

const search = () => {};

module.exports = {
  Query: {
    author,
    authors,
    search,
  },
  Mutation: {
    addAuthor,
    updateAuthor,
    deleteAuthor,
  },
  // Author: {
  //   books,
  // },
  Result: {
    __resolveType(obj, context, info) {
      if (obj.title) {
        return 'Book';
      }
      if (obj.name) {
        return 'Author';
      }

      return null;
    },
  },
};
