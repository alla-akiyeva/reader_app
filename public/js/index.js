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



// Function to empty out the articles
function clear() {
    // $("#body-section").empty();
    location.reload(true);

}

$(document).ready(function () {

    // CLICK HANDLERS
    // ==========================================================

    $("#search-btn").on("click", function (event) {
       
        event.preventDefault();

        // Build the query URL for the ajax request 
        var queryURL = buildQueryURL();

        // Make the AJAX request to the API - GETs the JSON data at the queryURL.
     
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response;
            for (var i = 0; i < 10; i++) {
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
                var btn = $("<button>").attr("data-id", [i]).addClass("btn btn-success");
                // .attr("class", 'btn btn-success');
                btn.text("Add to Library");

                var h6 = $("<h6>").attr("data-id", [i]).text(author)

                var p = $("<p>").attr("data-id", [i]).text(description);



                var h5 = $("<h5>").text(bookName);
                h5.attr("id", "title" + i);


                var p = $("<p>").text(description);
    
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

            $("#card-container").on("click", ".btn.btn-success", function selectBook(response) {

                var index = $(this).attr("data-id");
                $(this).replaceWith("<span style=‘color:green; font-weight:bold’>Added to Library ✓</span>");
                console.log(index);

    

                var selectedBook = results.items[index];
                

                var newBook = {
               
                    title: selectedBook.volumeInfo.title,
             
                    author: selectedBook.volumeInfo.authors[0],
                 
                    description: selectedBook.volumeInfo.description,
                
                    image: selectedBook.volumeInfo.imageLinks.thumbnail
                };

        
                $.post("/api/books", newBook)
                    // on success, run this callback
                    .then(function (data) {
                      
                      
                    });
                $("#book-search").val("");

            });

        });
    });
});


//  .on("click") function associated with the clear button
$("#clear").on("click", clear);







