const express = require('express');
const router  = express.Router();
const Authors = require("../../models/authors");

router.get('/', (req, res, next) => {
  Authors.find()
    .then(allAuthors => {
      console.log(allAuthors);
      res.render('author-views/authors', {authors: allAuthors})
  }).catch(err => console.log(`Error find all authors: ${err}`))
})

/* GET add-author page */
router.get('/add-author', (req, res, next) => {
  res.render('author-views/add-author');
});