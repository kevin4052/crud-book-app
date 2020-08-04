const express = require('express');
const router  = express.Router();
const Book = require("../../models/books");

router.get('/', (req, res, next) => {
  Book.find().then(allBooks => {
    // console.log(allBooks);
    res.render('book-views/books', {books: allBooks})
  }).catch(err => console.log(`Error find all books: ${err}`))
})

/* GET add-book page */
router.get('/add-book', (req, res, next) => {
  res.render('book-views/add-book');
});

/* POST add a book */
router.post('/details', (req, res, next) => {
  console.log({ body: req.body });
  Book.create(req.body)
      .then((newBook) => {
          res.redirect("/books");
      }).catch(err => console.log(`Error adding new book: ${err}`))
});

/*POST book details page*/
router.get('/details/:bookId', (req, res, next) => {
  console.log({ body: req.body });
  Book.findById(req.params.bookId)
    .then(book => {
    res.render("book-views/book-details", { book });
  }).catch(err => console.log(`Error finding book by Id: ${err}`))
  
})

router.get("/update/:bookId", (req, res, next) => {
  Book.findById(req.params.bookId)
    .then(book => {
      res.render('book-views/book-update', {book});
    }).catch(err => console.log(`Error finding book by Id: ${err}`))
})

/*POST book update*/
router.post("/update/:bookId", (req, res, next) => {
  Book.findByIdAndUpdate(req.params.bookId, req.body, {new: true})
    .then(updatedBook => {
      console.log({ updatedBook });
      res.redirect('back');
    }).catch(err => console.log(`Error updating book: ${err}`))
})

/*POST book delete*/
router.post("/delete/:bookId", (req, res, next) => {
  Book.findByIdAndDelete(req.params.bookId)
    .then(() => {
      res.redirect('/books');
    }).catch(err => console.log(`Error deleting book: ${err}`))
})




module.exports = router;