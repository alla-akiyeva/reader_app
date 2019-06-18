window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        title:{
            text: " Weekly reading minutes"
        },
        // axisY: {
        //     title: 
        // },
        data: [{        
            type: "column",  
            showInLegend: true, 
            legendMarkerColor: "grey",
            dataPoints: [      
                { y: 20, label: "Monday" },
                { y:50,  label: "Tuesday" },
                { y: 45,  label: "Wednesday" },
                { y:30 ,  label: "Thursday" },
                { y: 20,  label: "Friday" },
                { y:60, label: "Saturday" },
                { y:75,  label: "Sunday" },
            ]
        }]
    });
    setTimeout(function(){
        chart.render();
    },1000);
 ;}