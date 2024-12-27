import mongoose from "mongoose";
import bookModel from "../../DB/models/book.models.js";

// Get all books (مش مطلوب)
export const getBooks = async (req, res) => {
    try {
        const books = await bookModel.find();
        if (books.length > 0) {
            res.json(books);
        } else {
            res.status(404).json({ message: "No books found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error getting books", error });
        console.log(error);
    }
};


// Create a single book
export const createbook = async (req, res) => {
    try {
        const newBook = new bookModel(req.body); 
        await newBook.save();
        return res.status(201).json({ msg: "Book saved successfully" });
    } catch (error) {
        res.status(400).send(error.message);
    }
};


// Insert multiple books
export const createBatchBooks = async (req, res) => {
    try {
        const books = req.body;
        await bookModel.insertMany(books);
        res.status(201).json({ msg: "Books added successfully" });
    } catch (error) {
        res.status(400).send(error.message);
    }
};


// Create a capped collection for logs
export const createCappedCollection = async (req, res) => {
    try {
        const db = mongoose.connection.db;
        await db.createCollection("logs", {
            capped: true,
            size: 1048576  // Size of capped collection in bytes (1MB)
        });
        res.status(201).json({ msg: 'Capped collection "logs" created with a size limit of 1MB' });
    } catch (error) {
        res.status(500).send({ message: "Error creating capped collection", error });
    }
};


// Create an index on the "title" field
export const createIndexOnTitle = async (req, res) => {
    try {
        await bookModel.createIndexes({ title: 1 });
        res.status(201).send('Index created successfully on title field');
    } catch (error) {
        res.status(500).send({ message: "Error creating index", error });
    }
};


// Update the book with title "Future"
export const updateBookFuture = async (req, res) => {
    try {
        const book = await bookModel.findOneAndUpdate(
            { title: "Future" },
            { year: 2022 },
            { new: true }
        );
        if (book) {
            res.status(200).json({ msg: "Book updated successfully", book });
        } else {
            res.status(404).json({ msg: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating book", error });
    }
};


// Find book by title (e.g., "Brave New World")
export const findBookByTitle = async (req, res) => {
    try {
        const { title } = req.query;
        const book = await bookModel.findOne({ title });
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ msg: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error finding book", error });
    }
};


// Find books published between specific years (e.g., 1990-2010)
export const findBooksByYearRange = async (req, res) => {
    try {
        const { from, to } = req.query;
        const books = await bookModel.find({ year: { $gte: from, $lte: to } });
        if (books.length > 0) {
            res.status(200).json(books);
        } else {
            res.status(404).json({ msg: "No books found in this range" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error finding books", error });
    }
};


// Find books by genre
export const findBooksByGenre = async (req, res) => {
    try {
        const { genre } = req.query;
        const books = await bookModel.find({ genre: { $in: [genre] } });
        if (books.length > 0) {
            res.status(200).json(books);
        } else {
            res.status(404).json({ msg: "No books found for this genre" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error finding books", error });
    }
};


// Skip and limit books
export const skipLimitBooks = async (req, res) => {
    try {
        const books = await bookModel.find()
            .sort({ year: -1 })
            .skip(2)
            .limit(3);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error });
    }
};


// Find books with year as integer
export const findBooksByYearInteger = async (req, res) => {
    try {
        const books = await bookModel.find({ year: { $type: 'int' } });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error });
    }
};


// Exclude certain genres
export const excludeGenres = async (req, res) => {
    try {
        const books = await bookModel.find({
            genre: { $nin: ["Horror", "Science Fiction"] }
        });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error });
    }
};


// Delete books published before a certain year
export const deleteBooksBeforeYear = async (req, res) => {
    try {
        const { year } = req.query;
        const result = await bookModel.deleteMany({ year: { $lt: year } });
        res.status(200).json({ msg: `${result.deletedCount} books deleted` });
    } catch (error) {
        res.status(500).json({ message: "Error deleting books", error });
    }
};


// Aggregation: Filter books published after 2000 and sort by year
export const aggregateBooksAfter2000 = async (req, res) => {
    try {
        const books = await bookModel.aggregate([
            { $match: { year: { $gt: 2000 } } },
            { $sort: { year: -1 } }
        ]);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error aggregating books", error });
    }
};


// Aggregation: Find books after 2000, show specific fields
export const aggregateBooksFields = async (req, res) => {
    try {
        const books = await bookModel.aggregate([
            { $match: { year: { $gt: 2000 } } },
            { $project: { title: 1, author: 1, year: 1 } }
        ]);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error aggregating books", error });
    }
};


// Aggregation: Break genres array into separate documents
export const aggregateGenres = async (req, res) => {
    try {
        const books = await bookModel.aggregate([
            { $unwind: "$genre" },
            { $project: { title: 1, genre: 1 } }
        ]);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error aggregating genres", error });
    }
};


// Aggregation: Join books with logs collection
export const aggregateBooksLogs = async (req, res) => {
    try {
        const books = await bookModel.aggregate([
            {
                $lookup: {
                    from: "logs",
                    localField: "_id",
                    foreignField: "book_id",
                    as: "book_logs"
                }
            }
        ]);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error aggregating books with logs", error });
    }
};
