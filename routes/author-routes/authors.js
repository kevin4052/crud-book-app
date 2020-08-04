const express = require('express');
const router  = express.Router();
const Authors = require("../../models/authors");
const Author = require('../../models/authors');

router.get('/', (req, res, next) => {
  Authors.find()
    .then(authorsFromDb => {
      console.log(authorsFromDb);
      res.render('author-views/authors', {authors: authorsFromDb})
  }).catch(err => console.log(`Error find all authors: ${err}`))
})

/* GET add-author page */
router.get('/add-author', (req, res, next) => {
  res.render('author-views/add-author');
});

router.post('/details', (req, res, next) => {
  console.log({ body: req.body });
  Author.create(req.body)
    .then(newAuthor => {
      res.redirect('/authors');
    }).catch(err => console.log(`Error finding author by Id: ${err}`))
})

/*GET book details page*/
router.get('/details/:authorId', (req, res, next) => {
  console.log({ body: req.body });
  Author.findById(req.params.authorId)
    .then(author => {
    res.render("author-views/author-details", { author });
  }).catch(err => console.log(`Error finding book by Id: ${err}`))
  
})

/*POST book update*/
router.post("/update/:authorId", (req, res, next) => {
  Author.findByIdAndUpdate(req.params.authorId, req.body, {new: true})
    .then(updatedAuthor => {
      console.log({ updatedAuthor });
      res.redirect('back');
    }).catch(err => console.log(`Error updating book: ${err}`))
})

module.exports = router;