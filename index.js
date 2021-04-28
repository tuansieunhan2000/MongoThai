const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3001;
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
const route = require('./router');
app.use('/product', route);
  
app.listen(port, () => console.log(`runnnn`));
