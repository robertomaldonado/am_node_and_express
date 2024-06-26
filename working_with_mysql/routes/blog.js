const express = require("express");

const db = require("../data/database");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/posts");
});

router.get("/posts/:id", async (req, res) => {
  const query = `
  SELECT posts.*, authors.name AS author_name, authors.email AS author_email
  FROM posts 
    INNER JOIN authors ON posts.author_id = authors.id 
  WHERE posts.id = ${req.params.id}`;
  [posts] = await db.query(query);
  // Handle no posts
  if (!posts || posts.length === 0) {
    res.status(404).render("404");
    return;
  }
  const postData = {
    ...posts[0],
    date: posts[0].date.toISOString(),
    humandReadableDate: posts[0].date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  res.render("post-detail", { post: postData });
});

router.get("/posts", async (req, res) => {
  const query = `
  SELECT posts.*, authors.name AS author_name 
  FROM posts
    INNER JOIN authors ON posts.author_id = authors.id`;
  const [posts] = await db.query(query);
  res.render("posts-list", { posts: posts });
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
