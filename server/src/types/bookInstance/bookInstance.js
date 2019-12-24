const mongoose = require('mongoose');
const moment = require('moment');

const bookInstanceSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'book',
    required: true,
  },
  imprint: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['AVAILABLE', 'MAINTENANCE', 'LOANED', 'RESERVED'],
    default: 'MAINTENANCE',
    required: true,
  },
  dueBack: {
    type: Date,
    default: Date.now(),
  },
});

bookInstanceSchema.virtual('url').get(function() {
  return `/bookinstance/${this._id}`;
});

bookInstanceSchema.virtual('dueBackFormatted').get(function() {
  return moment(this.dueBack).format('MMMM Do, YYYY');
});
bookInstanceSchema.virtual('dueBackInput').get(function() {
  return moment(this.dueBack).format('YYYY-MM-DD');
});

module.exports = mongoose.model('bookinstance', bookInstanceSchema);
