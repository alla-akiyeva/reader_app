/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for API based on form inputs
 */
function buildQueryURL() {
    // queryURL is the url we'll use to query the API
    var queryURL = "https://www.googleapis.com/books/v1/volumes?";

    // Begin building an object to contain our API call's query parameters
    var queryParams = {};

    // Grab text the user typed into the search input, add to the queryParams object
    queryParams.q = $("#book-search")
        .val()
        .trim();


    // Logging the URL so we have access to it for troubleshooting
    console.log("---------------\nURL: " + queryURL + "\n---------------");
    console.log(queryURL + $.param(queryParams));
    return queryURL + $.param(queryParams);
}

//Show Results --->

/**
* takes API data (JSON/object) and turns it into elements on the page
* @param {object} BookData - object containing API data
*/

var container = $("#card-container");

// function updateCards(response) {
//     for (var i = 0; i < 3; i++) {
//         var books = response.items[i]
//         var bookName = books.volumeInfo.title;
//         var author = books.volumeInfo.authors[0];
//         var bookImage = books.volumeInfo.imageLinks.thumbnail
//         var description = books.volumeInfo.description


//         var card = $("<div>").attr('class', 'card');
//         card.attr("id", "card" + i);

//         var colm1 = $("<div>").attr("class", "col-md-3");
//         var colm2 = $("<div>").attr("class", "col-md-8");
//         var row = $("<div>").attr("class", "row");

//         var img = $("<img>").attr("data-id", [i]).attr("src", bookImage);
//         // var h5 = $("<h5>").attr("data-id", [i]).text(bookName);
//         //var btn = $("<button>").attr("value",[i])
//         var btn = $("<button>").attr("data-id", [i]).addClass("myclass");
//         // .attr("class", 'btn btn-success');
//         btn.text("Add to Library");

//         var h6 = $("<h6>").attr("data-id", [i]).text(author)

//         var p = $("<p>").attr("data-id", [i]).text(description);

//         // var img = $("<img>").attr("src", bookImage);

//         var h5 = $("<h5>").text(bookName);
//         h5.attr("id", "title" + i);

//         // //var btn = $("<button>").attr("value",[i])
//         // var btn = $("<button>").attr("id", "add-btn" + i);
//         // // .attr("class", 'btn btn-success');
//         // btn.text("Add to Library");

//         // var h6 = $("<h6>").text(author);
//         // h6.attr("id", "author" + i);


//         var p = $("<p>").text(description);
//         // console.log(bookName, author);
//         container.append(card)
//         card.append(row);
//         row.append(colm1);
//         row.append(colm2);
//         colm1.append(img);
//         colm2.append(h5);
//         colm2.append(h6);
//         colm2.append(p);
//         colm2.append(btn);


//     }
// }

// Function to empty out the articles
function clear() {
    // $("#body-section").empty();
    location.reload(true);

}

$(document).ready(function () {

    // CLICK HANDLERS
    // ==========================================================

    // .on("click") function associated with the Search Button
    $("#search-btn").on("click", function (event) {
        // This line allows us to take advantage of the HTML "submit" property. Prevents the page from reloading on form submit.
        event.preventDefault();

        // Empty the region associated with the articles
        // clear();


        // Build the query URL for the ajax request to the NYT API
        var queryURL = buildQueryURL();

        // Make the AJAX request to the API - GETs the JSON data at the queryURL.
        // The data then gets passed as an argument to the updatePage function
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response;
            for (var i = 0; i < 5; i++) {
                var books = response.items[i]
                var bookName = books.volumeInfo.title;
                var author = books.volumeInfo.authors[0];
                var bookImage = books.volumeInfo.imageLinks.thumbnail
                var description = books.volumeInfo.description


                var card = $("<div>").attr('class', 'card');
                card.attr("id", "card" + i);

                var colm1 = $("<div>").attr("class", "col-md-3");
                var colm2 = $("<div>").attr("class", "col-md-8");
                var row = $("<div>").attr("class", "row");

                var img = $("<img>").attr("data-id", [i]).attr("src", bookImage);
                // var h5 = $("<h5>").attr("data-id", [i]).text(bookName);
                //var btn = $("<button>").attr("value",[i])
                var btn = $("<button>").attr("data-id", [i]).addClass("myclass");
                // .attr("class", 'btn btn-success');
                btn.text("Add to Library");

                var h6 = $("<h6>").attr("data-id", [i]).text(author)

                var p = $("<p>").attr("data-id", [i]).text(description);

                // var img = $("<img>").attr("src", bookImage);

                var h5 = $("<h5>").text(bookName);
                h5.attr("id", "title" + i);

                // //var btn = $("<button>").attr("value",[i])
                // var btn = $("<button>").attr("id", "add-btn" + i);
                // // .attr("class", 'btn btn-success');
                // btn.text("Add to Library");

                // var h6 = $("<h6>").text(author);
                // h6.attr("id", "author" + i);


                var p = $("<p>").text(description);
                // console.log(bookName, author);
                container.append(card)
                card.append(row);
                row.append(colm1);
                row.append(colm2);
                colm1.append(img);
                colm2.append(h5);
                colm2.append(h6);
                colm2.append(p);
                colm2.append(btn);

            }

            $("#card-container").on("click", ".myclass", function selectBook(response) {

                var index = $(this).attr("data-id");

                console.log(index);

                // var id = `title${index}`;
                // console.log($("h5").text);

                var selectedBook = results.items[index];
                

                var newBook = {
                    // title
                    title: selectedBook.volumeInfo.title,
                    // role from role input
                    author: selectedBook.volumeInfo.authors[0],
                    // age from age input
                    description: selectedBook.volumeInfo.description,
                    // points from force-points input
                    image: selectedBook.volumeInfo.imageLinks.thumbnail
                };

                console.log(newBook.title, newBook.author);

                // var bookName = selectedBook.volumeInfo.title;
                // var author = selectedBook.volumeInfo.authors[0];
                // var bookImage = selectedBook.volumeInfo.imageLinks.thumbnail
                // var description = selectedBook.volumeInfo.description

                // send an AJAX POST-request with jQuery
                $.post("/api/new", newBook)
                    // on success, run this callback
                    .then(function (data) {
                        // log the data we found
                        console.log(data);
                        // tell the user we're adding a character with an alert window
                        console.log("Adding a Book...");
                    });

                // empty each input box by replacing the value with an empty string
                $("#book-search").val("");

            });

        });
    });
});


//  .on("click") function associated with the clear button
$("#clear").on("click", clear);







