import { Router } from "express";
import {
    createbook, createBatchBooks, createCappedCollection, createIndexOnTitle,
    getBooks, updateBookFuture, findBookByTitle, findBooksByYearRange, findBooksByGenre,
    skipLimitBooks, findBooksByYearInteger, excludeGenres, deleteBooksBeforeYear,
    aggregateBooksAfter2000, aggregateBooksFields, aggregateGenres, aggregateBooksLogs
} from "./book.service.js";

const bookControllar = Router();

bookControllar.get('/all', getBooks);
bookControllar.post('/books', createbook);
bookControllar.post('/books/batch', createBatchBooks);
bookControllar.post('/logs/capped', createCappedCollection);
bookControllar.post('/books/index', createIndexOnTitle);
bookControllar.patch('/books/Future', updateBookFuture);
bookControllar.get('/books/title', findBookByTitle);
bookControllar.get('/books/year', findBooksByYearRange);
bookControllar.get('/books/genre', findBooksByGenre);
bookControllar.get('/books/skip-limit', skipLimitBooks);
bookControllar.get('/books/year-integer', findBooksByYearInteger);
bookControllar.get('/books/exclude-genres', excludeGenres);
bookControllar.delete('/books/before-year', deleteBooksBeforeYear);
bookControllar.get('/books/aggregate1', aggregateBooksAfter2000);
bookControllar.get('/books/aggregate2', aggregateBooksFields);
bookControllar.get('/books/aggregate3', aggregateGenres);
bookControllar.get('/books/aggregate4', aggregateBooksLogs);

export default bookControllar;
