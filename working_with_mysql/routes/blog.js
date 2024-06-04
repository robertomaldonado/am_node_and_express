const express = require("express");

const db = require("../data/database");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/posts");
});

router.get("/posts", (req, res) => {
  res.render("posts-list");
});

router.get("/new-post", async (req, res) => {
  const [authors] = await db.query("SELECT * FROM authors");
  res.render("create-post", { authors: authors });
});

router.post("/posts", async (req, res) => {
  const { title, summary, content, author } = req.body;
  await db.query(
    "INSERT INTO posts (title, summary, body, author_id) VALUES (?, ?, ?, ?)",
    [title, summary, content, author]
  );
  res.redirect("/posts");
});

module.exports = router;
