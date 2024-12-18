import express from 'express';
import approot from './src/app.controllar.js';
const port = 3005;
const app = express();

approot(app,express);


app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});