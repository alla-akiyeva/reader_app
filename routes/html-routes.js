var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  // voice route loads voice.html
  app.get("/voice", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/voice.html"));
  });

  // library route loads library.html
  app.get("/library", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/library.html"));
  });

  

};
