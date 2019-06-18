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
    queryParams.q = $("#character-search")
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
* @param {object} BookData - object containing NYT API data
*/

function updateCards(BookData) {
    for (var i = 0; i < 5; i++) {

        var books = BookData.items[i]
        var bookName = books.volumeInfo.title
        // var author = dataForSingleItem.blog_text
        var bookImage = books.volumeInfo.imageLinks.thumbnail
        var description = books.volumeInfo.description

        $(".card-deck").append(
            '<div class="card" style="width: 123px;">',
            '<img class="card-img-top" src="' + bookImage + '" alt="Card image cap">',
            '<div class="card-body">',
            '<h5 class="card-title">' + bookName + '</h5>',
            '<p class="card-text">' + description + '</p>',
            '</div>'
        );

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
