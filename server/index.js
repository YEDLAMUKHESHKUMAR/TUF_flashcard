const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
// const port = 5000;
require("dotenv").config();

const { URL } = require("url");
const databaseUrl = process.env.DATABASE_URL;
const url = new URL(databaseUrl);
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());

const db = mysql.createConnection({
  host: url.hostname,
  port: url.port,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

app.get("/flashcards", (req, res) => {
  db.query("SELECT * FROM flashcards", (err, result) => {
    if (err) throw err;
    res.json(result);
    console.log(result);
  });
});

app.post("/flashcards", (req, res) => {
  const {
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_answer,
    explanation,
  } = req.body;
  const query =
    "INSERT INTO flashcards (question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [
      question,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_answer,
      explanation,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ id: result.insertId, ...req.body });
    }
  );
});

app.put("/flashcards/:id", (req, res) => {
  const { id } = req.params;
  const {
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_answer,
    explanation,
  } = req.body;
  const query =
    "UPDATE flashcards SET question = ?, option_a = ?, option_b = ?, option_c = ?, option_d = ?, correct_answer = ?, explanation = ? WHERE id = ?";
  db.query(
    query,
    [
      question,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_answer,
      explanation,
      id,
    ],
    (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ id, ...req.body });
    }
  );
});

app.delete("/flashcards/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM flashcards WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.sendStatus(204);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
