// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var Comment = require("../models/comments.js");
var Book = require("../models/book.js");


// Routes
// =============================================================
module.exports = function(app) {
 
  app.get("/api/books", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    Book.findAll({
      // include: [db.Post]
    }).then(function(dbBook) {
      res.json(dbBook);
    });
  });

  // If a user sends data to add a new comment...
  app.post("/api/comment", function(req, res) {
    // Take the request...
    var comments = req.body;

    var routeName = comments.comment.replace(/\s+/g, "").toLowerCase();

    // Then add the comment to the database using sequelize
    Comment.create({
      routeName: routeName,
      comment: comments.comment
    });

    res.status(204).end();
  });

  app.post("/api/book", function(req, res) {
    // Take the request...
    var book = req.body;
  
    // Create a routeName
  
    // Using a RegEx Pattern to remove spaces from character.name
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    var routeName = book.title.replace(/\s+/g, "").toLowerCase();
  
    // Then add the book to the database using sequelize
    Book.create({
      routeName: routeName,
      title: book.title,
      image: book.image,
      author: book.author,
      description: book.description
    });
  
    res.status(204).end();
  });
  
//Display Book



};



