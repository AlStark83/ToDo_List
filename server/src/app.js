const express = require("express");
const mainRouter = require("./routes/index.js");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("./mongodb.js");

const app = express();


app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    credentials: true, 
  })
);


app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/", mainRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;
