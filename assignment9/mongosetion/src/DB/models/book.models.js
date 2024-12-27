import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [1, 'Title must not be empty']
      },
      author: String,
      nationality: String,
      year: Number,
      genre: [String]
}, {})

const bookModel = mongoose.models.Book || mongoose.model('Book', bookSchema);

export default bookModel;