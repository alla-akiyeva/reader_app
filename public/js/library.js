// Code here handles what how the page displays all of the books

var container = $("#card-container");


  
$.get("/api/books", function(data) {
    
    
    // for each book that our server sends us back
    for (var i = 0; i < data.length; i++) {

        console.log(data[i])
        

        var card = $("<div>").attr('class', 'card');
        var colm1 = $("<div>").attr("class", "col-md-3");
        var colm2 = $("<div>").attr("class", "col-md-8");
        var row = $("<div>").attr("class", "row");
        var img = $("<img>").attr("src", data[i].image);
        var h5 = $("<h5>").text(data[i].title);
        var btn = $("<button>").attr("class", 'btn btn-success');

        btn.append("<a style='color: white' href='/update?book_id=" + data[i].id + "'>Update</a>");
        console.log(data[i].id)
        var h6 = $("<h6>").text(data[i].author)
    
        var p = $("<p>").text(data[i].description);
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


});

