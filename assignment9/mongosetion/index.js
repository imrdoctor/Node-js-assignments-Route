import express from 'express';
import approotee from './src/utils/app.controller.js';

const app = express();
const port = 7512;


approotee(app,express)
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('localhost:' + port);
});
