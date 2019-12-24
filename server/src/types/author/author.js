const mongoose = require('mongoose');
const moment = require('moment');

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    max: 100,
  },
  familyName: {
    type: String,
    required: true,
    max: 100,
  },
  dateOfBirth: Date,
  dateOfDeath: Date,
});

authorSchema.virtual('name').get(function() {
  return `${this.familyName} ${this.firstName}`;
});

authorSchema.virtual('lifespan').get(function() {
  return this.dateOfBirth
    ? moment(this.dateOfBirth).format('Do MMM, YYYY')
    : '';
});
authorSchema.virtual('dobInput').get(function() {
  return this.dateOfBirth ? moment(this.dateOfBirth).format('YYYY-MM-DD') : '';
});

authorSchema.virtual('dod').get(function() {
  return this.dateOfDeath ? moment(this.dateOfDeath).format('Do MMM,YYYY') : '';
});
authorSchema.virtual('dodInput').get(function() {
  return this.dateOfDeath ? moment(this.dateOfDeath).format('YYYY-MM-DD') : '';
});

authorSchema.virtual('url').get(function() {
  return `/author/${this._id}`;
});

module.exports = mongoose.model('author', authorSchema);
