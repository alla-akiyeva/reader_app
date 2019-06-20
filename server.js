

// Dependencies
// =============================================================
var express = require("express");

// var exphbs = require('express-handlebars');
const Book = require('./models').Book;
const Comment = require('./models').Comment;
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory to be served
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/api-routes.js")(app);

// Here we introduce HTML routing to serve different HTML files
require("./routes/html-routes.js")(app);

// Starts the server to begin listening
// =============================================================

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
