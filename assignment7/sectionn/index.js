import express from 'express';
import approotee from './src/app.controller.js';
const app = express();
const port = 3005;

approotee(app,express)
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});