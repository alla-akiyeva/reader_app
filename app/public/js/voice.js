
    var writer = []
    var bookName = []
    var review = []

// Button for writer


    if ('webkitSpeechRecognition' in window) {
    } else {
      alert("Error")
    }
    var recognizing;
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    reset();
    recognition.onend = reset;
    recognition.onresult = function (event) {
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          textarea.insertAdjacentHTML('beforeend', event.results[i][0].transcript + "<br>");
          // console.log(event)


          var tempData = []

          for (var i = 0; i < event.results.length; i++) {
            console.log(event.results[i][0].transcript);

            tempData.push(event.results[i][0].transcript)

          }
          author = tempData;
          console.log("writer", writer)



        }
      }
    }
    function reset() {
      recognizing = false;
      button.innerHTML = "Writer";
    }
    function toggleStartStop() {
      if (recognizing) {
        recognition.stop();
        reset();
      } else {
        recognition.start();
        recognizing = true;
        button.innerHTML = "Click to Stop";
      }
    }

    // Button for Book name


    if ('webkitSpeechRecognition' in window) {
    } else {
      alert("Error")
    }
    var recognizingBookName;
    var recognitionBookName = new webkitSpeechRecognition();
    recognitionBookName.continuous = true;
    reset2();
    recognitionBookName.onend = reset;
    recognitionBookName.onresult = function (event2) {
      for (var i = event2.resultIndex; i < event2.results.length; ++i) {
        if (event2.results[i].isFinal) {
          textarea2.insertAdjacentHTML('beforeend', event2.results[i][0].transcript + "<br>");
          // console.log(event2)

          var tempData = []

          for (var i = 0; i < event2.results.length; i++) {
            console.log(event2.results[i][0].transcript);

            tempData.push(event2.results[i][0].transcript)

          }
          bookName = tempData
          console.log("bookName", bookName)


        }
      }
    }
    function reset2() {
      recognizingBookName = false;
      button2.innerHTML = "Book name";
    }
    function toggleStartStop2() {
      if (recognizingBookName) {
        recognitionBookName.stop();
        reset2();
      } else {
        recognitionBookName.start();
        recognizingBookName = true;
        button2.innerHTML = "Click to Stop";
      }
    }

    // Button for Review


    if ('webkitSpeechRecognition' in window) {
    } else {
      alert("Error")
    }
    var recognizingReview;
    var recognitionReview = new webkitSpeechRecognition();
    recognitionReview.continuous = true;
    reset3();
    recognitionReview.onend = reset;
    recognitionReview.onresult = function (event3) {
      for (var i = event3.resultIndex; i < event3.results.length; ++i) {
        if (event3.results[i].isFinal) {
          textarea3.insertAdjacentHTML('beforeend', event3.results[i][0].transcript + "<br>");
          // console.log(event3)

          var tempData = []

          for (var i = 0; i < event3.results.length; i++) {
            console.log(event3.results[i][0].transcript);

            tempData.push(event3.results[i][0].transcript)

          }
          review = tempData
          console.log("review", review)


        }
      }
    }
    function reset3() {
      recognizingReview = false;
      button3.innerHTML = "Review";
    }
    function toggleStartStop3() {
      if (recognizingReview) {
        recognitionReview.stop();
        reset3();
      } else {
        recognitionReview.start();
        recognizingReview = true;
        button3.innerHTML = "Click to Stop";
      }
    }


 