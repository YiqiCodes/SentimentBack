require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? "./.env" : "./.env.development",
});

console.log("env", process.env);
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./queries");
const port = 3000;
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3002");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/users", db.getUsers);

app.get("/users/:username", db.getUserById);

app.put("/users/register", db.createUser);

app.put("/users/update", db.updateUser);

app.delete("/users/:id", db.deleteUser);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.listen(process.env.PGPORT || port, () => {
  console.log(`App running on port ${process.env.PGPORT || port}.`);
});
