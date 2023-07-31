const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/books/insertbooks", (req, res) => {
  const title = req.body.title;
  const pages = req.body.pagesQtd;

  const queryInsert = `INSERT INTO books (title, pages) VALUES ('${title}', '${pages}')`;

  conn.query(queryInsert, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/books");
  });
});

app.get("/books", (req, res) => {
  const queryGetAll = "SELECT * FROM books";

  conn.query(queryGetAll, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const books = data;
    console.log(books);

    res.render("books", { books });
  });
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;

  const queryGetById = `SELECT * FROM books WHERE id = ${id}`;

  conn.query(queryGetById, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const book = data[0];
    console.log(book);

    res.render("book", { book });
  });
});

app.get("/books/edit/:id", (req, res) => {
  const id = req.params.id;

  const queryGetById = `SELECT * FROM books WHERE id = ${id}`;

  conn.query(queryGetById, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const book = data[0];

    res.render("editbook", { book });
  });
});

app.post("/books/updatebook", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const pages = req.body.pagesQtd;

  const queryUpdate = `UPDATE books SET title = '${title}', pages = ${pages} WHERE id = ${id}`;

  conn.query(queryUpdate, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect("/books");
  });
});

app.post("/books/remove/:id", (req, res) => {
  const id = req.params.id;

  const queryDelete = `DELETE FROM books WHERE id = ${id}`;

  conn.query(queryDelete, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/books");
  });
});

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

conn.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Banco conectado");

  app.listen(3000);
});
