
var bookContainer = $(".jumbotron");
var commentsContainer = $("#card-container");
var url = window.location.search;
var bookId;
bookId = url.split("=")[1];




function bookInfo() {

  bookId = url.split("=")[1];


  $.get("/api/books/" + bookId).then(function (data) {
   
    for (var i = 0; i < 1; i++) {
      
      var card = $("<div>").attr('id', 'main-card').addClass("card");
      var colm1 = $("<div>").attr("class", "col-md-2");
      var colm2 = $("<div>").attr("class", "col-md-9");
      var row = $("<div>").attr("class", "row");
      var img = $("<img>").attr("src", data.image);
      var h5 = $("<h5>").text(data.title);
      var h6 = $("<h6>").text(data.author)
      var p = $("<p>").text(data.description);
      bookContainer.append(card)
      card.append(row);
      row.append(colm1);
      row.append(colm2);
      colm1.append(img);
      colm2.append(h5);
      colm2.append(h6);
      colm2.append(p);
    
    }
  });
}







///Voice Recognition

var recognition = new webkitSpeechRecognition();
var comments;
var commentContainer = $("#main-container");
recognition.continuous = true;
reset();
recognition.onend = reset;

recognition.onresult = function (event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      textarea.value += event.results[i][0].transcript;
    }
  }
}

function reset() {
  recognizing = false;
  button.innerHTML = "Record";
}

function toggleStartStop() {
  
  event.preventDefault();
  if (recognizing) {
    recognition.stop();
    reset();
  } else {
    recognition.start();
    recognizing = true;
    button.innerHTML = "Stop";
  }
}


$("#deletebtn").click(function () {
  $("textarea").val("");
})

$("#updatebtn").click(function () {

  var comment = $("textarea").val()

  var container = $(".container")
  var card = $("<div>").attr("class", "card")
  var cardbody = $("<div>").attr("class", "card-body")
  var p = $("<p>").attr("class", "card-text").text(comment)

  container.append(card)
  card.append(cardbody)
  cardbody.append(p)

  var newComment = {
    comment: comment,
    bookId: bookId
  };
  console.log(newComment)
  $.post("/api/comments", newComment)
    .then(function (data) {
      console.log(data);
      console.log("Adding comment...");
    });

});


// The code below handles the case where we want to get blog posts for a specific book


if (url.indexOf("?book_id=") !== -1) {
  bookId = url.split("=")[1];
  getComments(bookId);
}

// If there's no bookId we just get all comments as usual
else {
  getComments();
}


// This function grabs posts from the database and updates the view
function getComments(book) {
  bookId = book || "";
  if (bookId) {
    bookId = "/?book_id=" + bookId;
  }
  $.get("/api/comments" + bookId, function (data) {
    console.log(data)
    console.log("Comments", data);
    comments = data;
    if (!comments || !comments.length) {
      console.log("No Comments Found");
    }
    else {
      initializeRows();
    }
  });
}



function initializeRows() {
  commentsContainer.empty();
  var commentsToAdd = [];
  for (var i = 0; i < comments.length; i++) {
    commentsToAdd.push(createNewRow(comments[i]));
    // commentsToAdd.push(createNewRow(comments[i]));
    console.log((comments[i]).comment)
    console.log(moment((comments[i].createdAt)).format('MMMM Do YYYY, h:mm:ss a'))
  }
  commentsContainer.append((comments[i]));

  ;


}

// This function constructs a post's HTML
function createNewRow(comments) {
  var container = $(".container")
  var card = $("<div>").attr("class", "card")
  var cardbody = $("<div>").attr("class", "card-body")
  var p = $("<p>").attr("class", "card-text").text(comments.comment)
  var span = $("<span>").attr("class", "small-text").text(moment((comments.createdAt)).format('MMMM Do YYYY, h:mm:ss a'))
  container.append(card)
  card.append(cardbody)
  cardbody.append(p)
  cardbody.append(span)
}





bookInfo();