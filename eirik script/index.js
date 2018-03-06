

window.onload = function(){

	var randomMovies = [];

	//Fjerner movies_object som ikkje finnes
	for(var i = 0; i < 4; i++){
		randomMovies.push(pickRandomMovie());
		if (movies_object[randomMovies[i]] == undefined){
			randomMovies.pop();
			i--;
		}
	}

	for(var x = 0; x < randomMovies.length; x++){

		var link = document.createElement("a");
		var div = document.createElement("div");
		var img = document.createElement("img");

		link.setAttribute("href", "visFilm.html?id=" + randomMovies[x]);
		div.setAttribute("id", "bilder");
		img.setAttribute("src", imgURL(randomMovies[x]));
		link.setAttribute("id","link")

		document.getElementById("bildeTekst").appendChild(div);
		document.getElementById("bilder").appendChild(link);
		document.getElementById("link").appendChild(img);

	}
}

// Finner random filmer fra movies_object
function pickRandomMovie(){
	var min = 1;
	var max = Object.keys(movies_object).length;

	return Math.floor(Math.random() * (max - min)) + min;
}

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
