// Code here handles what how the page displays all of the books

const container = $("#card-container");


  
$.get("/api/books", function(data) {
    
    
    // for each book that our server sends us back
    for (let i = 0; i < data.length; i++) {

        console.log(data[i])
        

        const card = $("<div>").attr('class', 'card');
        const colm1 = $("<div>").attr("class", "col-md-3");
        const colm2 = $("<div>").attr("class", "col-md-8");
        const row = $("<div>").attr("class", "row");
        const img = $("<img>").attr("src", data[i].image);
        const h5 = $("<h5>").text(data[i].title);
        const btn = $("<button>").attr("class", 'btn btn-success');

        btn.append("<a style='color: white' href='/update?book_id=" + data[i].id + "'>Update</a>");
        console.log(data[i].id)
        const h6 = $("<h6>").text(data[i].author)
    
        const p = $("<p>").text(data[i].description);
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

