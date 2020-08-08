const express = require('express');
const router  = express.Router();
const Book = require("../../models/books");
const Author = require('../../models/authors');

router.get('/', (req, res, next) => {
  Book.find()
    .then(allBooks => {

      console.log(allBooks);
      res.render('book-views/books', {books: allBooks});

  }).catch(err => console.log(`Error find all books: ${err}`))
});

/* GET add-book page */
router.get('/add-book', (req, res, next) => {
  res.render('book-views/add-book');
});

/* POST add a book */
router.post('/add-book', (req, res, next) => {

  Book.create(req.body)
      .then((newBook) => {

          console.log(newBook);
          res.redirect(`/books/details/${newBook._id}`);

      }).catch(err => console.log(`Error adding new book: ${err}`))
});

/*GET book details page*/
router.get('/details/edit/:bookId', (req, res, next) => {

  Book.findById(req.params.bookId)
    .then(bookfromDB => {

      Author.find()
        .then(authors => {
          const data = {
            ...bookfromDB,
            authors,
            edit: true
          }

          console.log(data);
          res.render("book-views/book-details", data);

        }).catch(err => console.log(`Error finding all authors: ${err}`))
  }).catch(err => console.log(`Error finding book by Id: ${err}`))
});

router.get('/details/:bookId', (req, res, next) => {

  Book.findById(req.params.bookId)
    .populate('authors')
    .then(bookfromDB => {

      const data = {
        ...bookfromDB,
        edit: false 
      };

      console.log({data});
      res.render('book-views/book-details', data);

    }).catch(err => console.log(`Error finding book from id: ${err}`))
});

/*POST book update*/
router.post("/update/:bookId", (req, res, next) => {

  Book.findByIdAndUpdate(req.params.bookId, req.body, {new: true})
    .populate('authors')
    .then(updatedBook => {

      console.log({ updatedBook });
      res.redirect(`/books/details/${updatedBook._id}`);

    }).catch(err => console.log(`Error updating book: ${err}`))
});

/*POST book delete*/
router.post("/delete/:bookId", (req, res, next) => {

  Book.findByIdAndDelete(req.params.bookId)
    .then(() => {

      res.redirect('/books');

    }).catch(err => console.log(`Error deleting book: ${err}`))
});

router.post("/remove-author/:bookId/:authorId", (req, res, next) => {

  Book.findById(req.params.bookId)
    .then(bookFromDB => {

      bookFromDB.authors.pull(req.params.authorId);
      bookFromDB
        .save()
        .then(updatedBook => {

          console.log({updatedBook})
          res.redirect(`back`)
          
        }).catch(err => console.log(`Error saving updated book: ${err}`))
    }).catch(err => console.log(`Error finding book for removing author: ${err}`))
})

module.exports = router;