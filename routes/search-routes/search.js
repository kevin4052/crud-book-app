const express = require('express');
const router = express.Router();
const Author = require('../../models/authors');
const Book = require('../../models/books');

/*GET home page for search*/
router.get('/', (req, res, next) => {
    console.log({ query: req.query });
    Author.find({
        $or: [
            { fistName: new RegExp(req.query.query, "i") },
            { lastName: new RegExp(req.query.query, "i") }
        ]})
        .then(authorResultsFromDB => {
            console.log({authorResultsFromDB});
            Book.find({ title: new RegExp(req.query.query, "i")})
                .then(bookResultsFromDB =>{
                    console.log({bookResultsFromDB});
                    const data = {
                        authorResults: authorResultsFromDB,
                        bookResults: bookResultsFromDB
                    }
                    res.render("search-views/search", data);
                }).catch(err => console.log(`Error searching for book: ${err}`))
        }).catch(err => console.log(`Error searching for author: ${err}`))
})

module.exports = router;