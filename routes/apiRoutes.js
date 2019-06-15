// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var Comment = require("../models/comments.js");

// Routes
// =============================================================
module.exports = function(app) {
 

  // If a user sends data to add a new comment...
  app.post("/api/new", function(req, res) {
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
};
