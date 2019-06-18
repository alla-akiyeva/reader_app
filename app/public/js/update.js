var recognition = new webkitSpeechRecognition();

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
    console.log("this is working")
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


$("#deletebtn").click(function() {
  $("textarea").val("");
})

$("#updatebtn").click(function() {

  console.log($("textarea").val())
  var comment = $("textarea").val()

  var container = $(".container")
  var card = $("<div>").attr("class", "card")
  var cardbody = $("<div>").attr("class", "card-body")
  var p = $("<p>").attr("class", "card-text").text(comment)

  container.append(card)
  card.append(cardbody)
  cardbody.append(p)

});

