const mongoose = require("mongoose");

const book = new mongoose.Schema(
  {
    bookTitle: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    bookDescription: {
      type: String,
      required: true,
    },
    bookPDFURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("book", book);
