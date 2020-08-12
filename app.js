// ================= FILE IMPORTS ===================
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// ============= END FILE IMPORTS ===================

// ========== MONGOOSE CONNECTION SETUP =============

require("./config/mongoose-setup");

// ======== END MONGOOSE CONNECTION SETUP ===========

// ============== MIDDLEWARE SETUP ==================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ============ END MIDDLEWARE SETUP ================

// ========== EXPRESS VIEW ENGINE SET UP ============

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

// ======= END EXPRESS VIEW ENGINE SET UP ===========

// ============== GLOBAL VARIABLES ==================

// default value for title local
app.locals.title = "CRUD Book App";

// ============ END GLOBAL VARIABLES ================

// ===================== ROUTES =====================

app.use("/", require("./routes/index"));
app.use("/books", require("./routes/book-routes/books"));
app.use("/authors", require("./routes/author-routes/authors"));
app.use("/search", require("./routes/search-routes/search"));
app.use("/auth", require("./routes/auth-routes/auth.route"));
app.use("/user", require("./routes/user-routes/user.route"));

// =================== END ROUTES ===================

// ============= EXPORT APP AT THE END ==============

module.exports = app;