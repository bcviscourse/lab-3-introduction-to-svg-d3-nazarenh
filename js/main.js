/* main JS file */


function stylenum(n){
    let s= n.toString();
    let ar=[];
    let i= s.length-1;
    let counter=0;
    while (i>-1){
        if (counter==3){
            ar.push(",");
            ar.push(s[i]);
            counter=1;
            i=i-1;
        }
        else{
            ar.push(s[i]);
            counter=counter+1;
            i=i-1;
        }
    }
    ar.reverse();
    let final= '';
    for (let i=0;i<ar.length;i++){
        final= final+ ar[i];
    }
    return final;
}

// console.log(stylenum(10000));


d3.csv("/data/cities.csv")
    .then(function(data){
        console.log(data);


        //filtering data to include EUcities:
        let eucities = data.filter(function(value,index){
            if (value.eu=="true") return value;
        });
        console.log(eucities.length);


        //printing num of EUcities to HTML page:
        d3.select("body")
            .append("div")
            .text("Number of EU Cities: "+eucities.length)
            .attr("class","title");


        //converting each numeric value in data to number:
        data.forEach(v =>{
            v.population = +v.population;
            v.x= +v.x;
            v.y= +v.y;
            console.log(typeof v.x, typeof v.y, typeof v.population);
        });

        //adding svg space:
        var svg = d3.select("body").append("svg")
            .attr("height", 550)
            .attr("width", 700);

        //adding circles to svg:
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("fill","purple")
            .attr("cx", function(d,index){return d.x+15;})
            .attr("cy", function(d,index){return d.y+15;})
            .attr("r", function(d,index){
                if (d.population< 1000000){return 4;}
                else{return 8;}
            })
            .on("mouseover", function(d) {
                div.transition()
                  .duration(200)
                  .style("opacity", .9);
                div.html("<strong>"+d.city+", "+d.country+"</strong>"+"\nPopulation: "+stylenum(d.population))
                  .style("left", (d3.event.pageX) + "px")
                  .style("top", (d3.event.pageY - 28) + "px");
                })
            .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
            })
            .on("click", function(d){
                console.log(d.city+": "+stylenum(d.population));
                document.getElementById("teller").innerHTML="You just clicked on: "+"<strong>"+d.city+"</strong>"+", population "+stylenum(d.population)+".";
            });

        //adding text labels for circles:
        svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text(function(d){
                if (d.eu== "true"){return d.city;}
            })
            .attr("class","city-label")
            .attr("x", function(d){return d.x+25;})
            .attr("y", function(d){return d.y+5;})
            .attr("opacity", function(d){
                if (d.population< 1000000){return 0;}
                else{return 1;}
            });
        
        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);



    })
    .catch(function(error){
        console.log("Error");
    })

