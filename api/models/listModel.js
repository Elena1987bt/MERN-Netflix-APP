const mongoose = require('mongoose');

const listSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    type: { type: String },
    genre: { type: String },
    content: { type: Array },
  },
  { timestamps: true }
);

const List = mongoose.model('List', listSchema);
module.exports = List;
