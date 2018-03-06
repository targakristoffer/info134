

window.onload = function() {
	var query_params = get_query_string_parameters();

	search_results = movies_object;
	
	var results = []; 

	if (query_params.film_title) {
        film_title = document.getElementById("film_title");
			// iterates over all objects in movies_object
			for (var movie in movies_object){
				if(movies_object[movie].otitle.toLowerCase().includes(query_params.film_title.toLowerCase().trim())){
					results.push(movies_object[movie]);
				}
			}	
		}
	
	if (query_params.actor) {
        actor = document.getElementById("actor");
        for(var movie in movies_object){
        	if(!movies_object[movie].folk == ""){
        		if(movies_object[movie].folk.toLowerCase().includes(query_params.actor.toLowerCase().trim())){
        			results.push(movies_object[movie]);
        		}
        	}
        }
    }

    if (query_params.director) {
	director = document.getElementById("director");
		for(var movie in movies_object){
			if(!movies_object[movie].dir == ""){
				if(movies_object[movie].dir.toLowerCase().includes(query_params.director.toLowerCase().trim())){
					results.push(movies_object[movie]); 
				}
			}
		}
    }

	if (query_params.genre) {
        genre = document.getElementById("genre");
		for (var key in genres_object){
			if(genres_object[key].includes(query_params.genre.toLowerCase().trim())){
				for(movie in movies_object){
					if(movie.includes(parseInt(key))){
						results.push(movies_object[movie]);
					} 
				}
			}
		}
	}
	
	if (query_params.country) {
        country = document.getElementById("country");
		for(movie in movies_object){
			if(!movies_object[movie].country == ""){
				if(movies_object[movie].country.toLowerCase().includes(query_params.country.toLowerCase().trim())){
					results.push(movies_object[movie]);
				}
			}
		}
    } 

    if (!results.length == 0){
    	for(var i = 0; i < results.length; i++){

    		var title = document.createElement("a");
    		var br = document.createElement("br");

    		title.appendChild(document.createTextNode(results[i].otitle));

    		title.setAttribute("href", "visFilm.html?id=" + results[i].id);
    	
    		document.getElementById("a");

    		document.getElementById("top").appendChild(title);
    		document.getElementById("top").appendChild(br);	
    	}
    }else{
    	var ingenResultat = document.createElement("h4");

    	if(query_params.film_title == ""){
    		ingenResultat.appendChild(document.createTextNode("Ingenting vart skrevet i søkefeltet."));

    	}else if (window.location.href.includes("search.html")){
    		ingenResultat.appendChild(document.createTextNode("Ingen resultat for '" + query_params.film_title + 
    			"' vart funne"));
    	}

    	document.getElementById("top").appendChild(ingenResultat);
    }
}