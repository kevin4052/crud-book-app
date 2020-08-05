const express = require('express');
const router  = express.Router();
const Author = require("../../models/authors");
const Book = require("../../models/books");

router.get('/', (req, res, next) => {
  Author.find()
    .then(authorsFromDb => {
      console.log(authorsFromDb);
      res.render('author-views/authors', {authors: authorsFromDb})
  }).catch(err => console.log(`Error find all authors: ${err}`))
})

/* GET add-author page */
router.get('/add-author', (req, res, next) => {
  res.render('author-views/add-author');
});

/*POST add new author*/
router.post('/add-author', (req, res, next) => {
  Author.create(req.body)
    .then(newAuthor => {
      console.log(newAuthor);
      res.redirect(`/authors/details/${newAuthor._id}`);
    }).catch(err => console.log(`Error finding author by Id: ${err}`))
})

/*GET author details edit form page*/
router.get('/details/edit/:authorId', (req, res, next) => {
  Author.findById(req.params.authorId)
    .then(authorfromDB => {
      Book.find()
        .then(books => {
          const data = {
            ...authorfromDB,
            books,
            edit: true
          };
          console.log(data)
          res.render("author-views/author-details", data);
        })
  }).catch(err => console.log(`Error finding author by Id: ${err}`))
  
})

router.get('/details/:authorId', (req, res, next) => {
  Author.findById(req.params.authorId)
    .then(authorfromDB => {
      const data = {
        ...authorfromDB,
        edit: false
      };
      console.log(data);
      res.render('author-views/author-details', data)
    }).catch(err => console.log(`Error finding author by Id: ${err}`))
})

/*POST author update*/
router.post("/update/:authorId", (req, res, next) => {
  Author.findByIdAndUpdate(req.params.authorId, req.body, {new: true})
    .then(updatedAuthor => {
      console.log({ updatedAuthor });
      res.redirect(`/authors/details/${updatedAuthor._id}`);
    }).catch(err => console.log(`Error updating author: ${err}`))
})

/*POST author delete*/
router.post("/delete/:authorId", (req, res, next) => {
  Author.findByIdAndDelete(req.params.authorId)
    .then(() => {
      res.redirect('/authors');
    }).catch(err => console.log(`Error deleting author: ${err}`))
})

module.exports = router;