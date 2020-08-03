const express = require('express');
const router  = express.Router();
const Book = require("../../models/books");

/* GET add-book page */
router.get('/', (req, res, next) => {
  res.render('book-views/add-book');
});

/* POST add-book page */
router.post('/create', (req, res, next) => {
    console.log({ body: req.body });
    Book.create(req.body)
        .then((newBook) => {
            res.render("book-views/book-details", { book: newBook })
        }).catch(err => console.log(`Error adding new book: ${err}`))
  });

module.exports = router;