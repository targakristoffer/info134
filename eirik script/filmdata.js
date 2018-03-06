var parameters = get_query_string_parameters();
var id = parameters.id;
var movie_object = movies_object[id];
var genre_object = genres_object[id];
var review_object = reviews_object[id];

// Finner bildeurl som hører til filmen du ser på
function imgURL(id) {
	var sID = id.toString();
	var num = parseInt(sID.charAt(0));

	if(id >999){
		return ("https://nelson.uib.no/o/" + num + "/" + id +".jpg");
	}else{
		return ("https://nelson.uib.no/o/0/" + id +".jpg");
	}
}
// Setter inn bildet
function bilde(id) {
	var elem = document.createElement("img");
	elem.setAttribute("src",imgURL(id))
	document.getElementById("bild").appendChild(elem);
}

window.onload = function(){
movie_object = movies_object[id];
    if (!movie_object) {
		panic("Could not retrieve movie_object!");
		return;
    }
    // setter inn otitle
    var title_element = document.getElementById("otitle");
    title_element.innerHTML = movie_object["otitle"];

    var title2_element = document.getElementById("overtitle");
    title2_element.innerHTML = movie_object["otitle"];

    //Loop som finner alle sjangere
    var txt ="<Strong>Sjanger: </Strong> ";
        for(var i in genre_object){
            txt += genre_object[i] + ", ";
        }
    document.getElementById("genre").innerHTML = txt;

    var noTittel_element = document.getElementById("noTittel");
    noTittel_element.innerHTML = "<Strong>Norsk Tittel: </Strong>" + movie_object["ntitle"];

    var folk_element = document.getElementById("folk");
    folk_element.innerHTML = movie_object["folk"];

    var dir_element = document.getElementById("dir");
    dir_element.innerHTML = movie_object["dir"];

    var nokkel_element = document.getElementById("nokkel");
    nokkel_element.innerHTML = "<strong> Nøkkelord: </strong><br>" +  movie_object["description"];

    var land_element = document.getElementById("land");
    land_element.innerHTML = movie_object["country"];

    var year_element = document.getElementById("year");
    year_element.innerHTML = movie_object["year"];

    var minutes_element = document.getElementById("min");
    minutes_element.innerHTML = "(" + movie_object["length"] + " minutes)";

    // kaller bilde metode
    bilde(id);

    //finner youtube link til trailer
    var trailer_elem = document.getElementById("trailerDiv");
		if(movie_object["youtube trailer id"]){
			var trailerUrl = movie_object["youtube trailer id"];
			var ifrm = document.createElement("iframe");
			ifrm.src = "https://www.youtube.com/embed/" + trailerUrl;
			trailer_elem.appendChild(ifrm);
		}else{
			trailer_elem.innerHTML = "No trailer found";
		}


    var reviews = Object.keys(review_object);

    for(var i = 0; i < reviews.length; i++){

        var li = document.createElement("li");

        li.appendChild(document.createTextNode(review_object[reviews[i]].username + " skrev: '" + review_object[reviews[i]].comment + 
            "' og gav ein  rating: " + review_object[reviews[i]].rating));
        
        document.getElementById("reviews").appendChild(li);
    }
}
