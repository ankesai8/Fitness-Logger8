const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8008;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

app.use(express.static("frontend"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/exercises", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

console.log(process.env.MONGODB_URI);

// routes
app.use(require("./Router/apiroutes.js"));
app.use(require("./Router/htmlroutes.js"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
