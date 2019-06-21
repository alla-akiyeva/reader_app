/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for API based on form inputs
 */
function buildQueryURL() {
    // queryURL is the url we'll use to query the API
    const queryURL = "https://www.googleapis.com/books/v1/volumes?";

    // Begin building an object to contain our API call's query parameters
    const queryParams = {};

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

const container = $("#card-container");



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
        const queryURL = buildQueryURL();

        // Make the AJAX request to the API - GETs the JSON data at the queryURL.

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            const results = response;
            for (let i = 0; i < 10; i++) {
                const books = response.items[i]
                const bookName = books.volumeInfo.title;
                let author = "Unknown";
                if (books.volumeInfo.authors) {
                    author = books.volumeInfo.authors[0];
                }
                const bookImage = books.volumeInfo.imageLinks ? books.volumeInfo.imageLinks.thumbnail : "https://images.freeimages.com/images/large-previews/aca/book-1193740.jpg";

                // const bookImage = books.volumeInfo.imageLinks.thumbnail
                const description = books.volumeInfo.description


                const card = $("<div>").attr('class', 'card');
                card.attr("id", "card" + i);

                const colm1 = $("<div>").attr("class", "col-md-3");
                const colm2 = $("<div>").attr("class", "col-md-8");
                const row = $("<div>").attr("class", "row");

                const img = $("<img>").attr("data-id", [i]).attr("src", bookImage);

                const btn = $("<button>").attr("data-id", [i]).addClass("btn btn-success");
                // .attr("class", 'btn btn-success');
                btn.text("Add to Library");

                const h6 = $("<h6>").attr("data-id", [i]).text(author)

                let p = $("<p>").attr("data-id", [i]).text(description);



                const h5 = $("<h5>").text(bookName);
                h5.attr("id", "title" + i);


                // let p = $("<p>").text(description);

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

                const index = $(this).attr("data-id");
                $(this).replaceWith("<span style=‘color:green; font-weight:bold’>Added to Library ✓</span>");
                console.log(index);



                const selectedBook = results.items[index];


                const newBook = {

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


//.on("click") function associated with the clear button
$("#clear").on("click", clear);







