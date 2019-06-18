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

function updateCards(BookData) {
    for (var i = 0; i < 5; i++) {
    var books = BookData.items[i]
    var bookName = books.volumeInfo.title
    var bookImage = books.volumeInfo.imageLinks.thumbnail
    var description = books.volumeInfo.description
    var author = books.volumeInfo.authors[0];

    var card = $("<div>").attr('class', 'card');
    var colm1 = $("<div>").attr("class", "col-md-3");
    var colm2 = $("<div>").attr("class", "col-md-8");
    var row = $("<div>").attr("class", "row");
    var img = $("<img>").attr("src", bookImage);
    var h5 = $("<h5>").text(bookName);
    var btn = $("<button>").attr("class", 'btn btn-success');
    btn.text("Add to Library");

    var h6 = $("<h6>").text(author)

    var p = $("<p>").text(description);
    console.log(bookName, author);
    //var img = $("<img>");
    //img.attr("src", bookImage);
    container.append(card)
    card.append(row);
    row.append(colm1);
    row.append(colm2);
    colm1.append(img);
    colm2.append(h5);
    colm2.append(h6);
    colm2.append(p);
    colm2.append(btn);
    // container.append(h4);
    // container.append(p);
    // container.append(img);
   

    

 }
}


// Function to empty out the articles
function clear() {
    // $("#body-section").empty();
    location.reload(true);

}


// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$("#search-btn").on("click", function (event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
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
    }).then(updateCards

        //     function(response) {

        //     // Log the queryURL
        //     console.log(queryURL);

        //     // Log the resulting object
        //     console.log(response);

        //   }

    );


});


//  .on("click") function associated with the clear button
$("#clear").on("click", clear);
