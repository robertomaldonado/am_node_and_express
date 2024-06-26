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
  res.render("post-detail", { post: posts[0] });
});

router.get("/posts/:id/edit", async (req, res) => {
  const query = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  const [posts] = await db.query(query);
  if (!posts || posts.length === 0) {
    res.status(404).render("404");
    return;
  }
  res.render("update-post", { post: posts[0] });
});

router.post("/posts/:id/edit", async (req, res) => {
  const { title, summary, content, author } = req.body;
  const query = `
  UPDATE posts SET 
    title = ?, 
    summary = ?, 
    body = ?
  WHERE id = ?
  `;
  await db.query(query, [title, summary, content, req.params.id]);
  res.redirect("/posts");
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

router.post("/posts/:id/delete", async (req, res) => {
  const postId = req.params.id;
  await db.query("DELETE FROM posts WHERE id = ?", [postId]);
  res.redirect("/posts");
});

module.exports = router;
