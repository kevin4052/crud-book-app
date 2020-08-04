const express = require('express');
const router  = express.Router();
const Book = require("../../models/books");

router.get('/', (req, res, next) => {
  Book.find().then(allbooks => {
    // console.log(allbooks);
    res.render('book-views/books', {books: allbooks})
  }).catch(err => console.log(`Error find all books: ${err}`))
})

/* GET add-book page */
router.get('/add-book', (req, res, next) => {
  res.render('book-views/add-book');
});

/* POST add-book page */
router.post('/details', (req, res, next) => {
  console.log({ body: req.body });
  Book.create(req.body)
      .then((newBook) => {
          res.render("book-views/book-details", { book: newBook });
      }).catch(err => console.log(`Error adding new book: ${err}`))
});

router.get('/details/:bookId', (req, res, next) => {
  console.log({ body: req.body });
  Book.findById(req.params.bookId)
    .then(book => {
    res.render("book-views/book-details", { book });
  }).catch(err => console.log(`Error finding book by Id: ${err}`))
  
})


module.exports = router;