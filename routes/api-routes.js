// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var db = require("../models");


// Routes
// =============================================================
module.exports = function (app) {
 ////Add Book to the Database


 app.post("/api/books", function (req, res) {

    db.Book.create(req.body).then(function(dbBook) {
      res.json(dbBook);
    });
  
});

  ////Display Books
  app.get("/api/books", function (req, res) {
    db.Book.findAll({
      include: [db.Comment]
    }).then(function (dbBook) {
      res.json(dbBook);
    });
  });

  ////Display Each Book by ID

  app.get("/api/books/:id", function (req, res) {
    db.Book.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Comment]
    }).then(function (dbBook) {
      res.json(dbBook);
    });
  });

//Comments


 app.get("/api/comments", function(req, res) {
  var query = {};
  if (req.query.book_id) {
    query.BookId = req.query.book_id;
  }
 
  db.Comment.findAll({
    where: query,
    include: [db.Book]
  }).then(function(dbComment) {
    res.json(dbComment);
  });
});

// Get route for retrieving a single comment
app.get("/api/comments/:id", function(req, res) {
  // Here we add an "include" property to our options in our findOne query
 
  db.Comment.findOne({
    where: {
      id: req.params.id
    },
    include: [db.Book]
  }).then(function(dbComment) {
    res.json(dbComment);
  });
});

  // POST route for saving a new comment
  app.post("/api/comments", function(req, res) {
    db.Comment.create(req.body).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  ////Send a new comment...
  // app.post("/api/comment", function (req, res) {
  //   // Take the request...
  //   var comments = req.body;

  //   var routeName = comments.comment.replace(/\s+/g, "").toLowerCase();

  //   // Then add the comment to the database using sequelize
  //   Comment.create({
  //     routeName: routeName,
  //     comment: comments.comment
  //   });
  //   res.status(204).end();
  // });


  // DELETE route for deleting comments
  app.delete("/api/comments/:id", function(req, res) {
    db.Comment.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  // PUT route for updating comments
  app.put("/api/comments", function(req, res) {
    db.Comment.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbComment) {
      res.json(dbComment);
    });
  });

};



