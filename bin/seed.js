const mongoose = require("mongoose");
const Author = require('../models/authors');
const Book = require('../models/books');

const authors = [
    {
        firstName: "Stephen",
        lastName: "King",
        dob: "September 21, 1947",
        picture: "https://images.gr-assets.com/authors/1362814142p8/3389.jpg",
        books: []
    },
    {
        firstName: "Kentaro",
        lastName: "Miura",
        dob: "July 11, 1966",
        picture: "https://vignette.wikia.nocookie.net/berserk/images/c/c1/Kentarou_Miura.png/revision/latest/top-crop/width/720/height/900?cb=20171005042113",
        books: []
    },
    {
        firstName: "Joanne",
        lastName: "Rowling",
        dob: "July 31, 1965",
        picture: "https://assets.theickabog.com/wp-content/uploads/2020/05/JKRowling_Photo_small.jpg",
        books: []
    },
    {
        firstName: "George",
        lastName: "Orwell",
        dob: "June 25, 1903",
        picture: "https://upload.wikimedia.org/wikipedia/commons/7/7e/George_Orwell_press_photo.jpg",
        books: []
    }
];

const books = [
    {
        title: "Nineteen Eighty-Four",
        published: "June 8, 1949",
        genre: ["Science Fiction", "Dystopian Fiction"],
        coverArt: "https://kbimages1-a.akamaihd.net/44e87379-3192-458b-8eb3-8824c9747513/1200/1200/False/1984-nineteen-eighty-four-10.jpg",
        authors: []
    },
    {
        title: "Berserk",
        published: "October 1989",
        genre: ["Dark fantasy"],
        coverArt: "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Berserk_vol01.jpg/220px-Berserk_vol01.jpg",
        authors: []
    },
    {
        title: "Carrie",
        published: "April 5, 1974",
        genre: ["Horror fiction"],
        coverArt: "https://images-na.ssl-images-amazon.com/images/I/91P7rIp-ayL.jpg",
        authors: []
    },
    {
        title: "Harry Potter and the Philosopher's Stone",
        published: "June 26, 1997",
        genre: ["Fantasy"],
        coverArt: "https://images-na.ssl-images-amazon.com/images/I/51ifu1aebKL._SX332_BO1,204,203,200_.jpg",
        authors: []
    },
    {
        title: "The Shining",
        published: "January 28, 1977",
        genre: ["Horror fiction"],
        coverArt: "https://prodimage.images-bn.com/pimages/9780345806789_p0_v2_s1200x630.jpg",
        authors: []
    }
];

mongoose
    .connect("mongodb://localhost/crud-books-app", {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then((x) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);

        Author.collection.drop();
        Book.collection.drop();

        Author.create(authors)
            .then(authorsFromDB => {
                console.log({ authorsFromDB });
            }).catch(err => console.log(`Error seeding database with authors: ${err}`))

        Book.create(books)
            .then(booksFromDB => {
                console.log({ booksFromDB });
            }).catch(err => console.log(`Error seeding database with books: ${err}`))

        setTimeout(() => {
            mongoose.disconnect();
        }, 10000);
    })
    .catch((err) => console.error("Error connecting to mongo", err));