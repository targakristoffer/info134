function startProgram() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://hotell.difi.no/api/json/bergen/dokart?");
    xhr.onreadystatechange = function() {
	if (xhr.readyState === 4 && xhr.status === 200) {
	    console.log("Type", xhr.getResponseHeader("Content-Type"));
	    console.log("Text", xhr.responseText);
	}
    };
    xhr.send();
}
window.onload = startProgram;

function check_method(){
  var uri = decodeURIComponent(document.location.href);
  var regex = new RegExp( "toalett", 'g' );
  var regex2 = new RegExp( "advanced=Search", 'g');
  if (uri.substring(uri.indexOf("?")+1).match(regex)){
      return match_search(2);
    }
  if (uri.substring(uri.indexOf("?")+1).match(regex2)){
      return match_search(1);
    }
   return full_load();

}

function full_load(){
var pos1 = {lat:60.395343, lng:5.325745};
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 14,
  center:pos1
});
for(var i =0; i < mydata.length; i++){
  var teller = i + 1;
  var a =  teller.toString() + " " + mydata[i].plassering +" Adresse: " + mydata[i].adresse;
  var b = document.getElementById("toalettListe").innerHTML
  var pos = {lat:parseFloat(mydata[i].latitude), lng:parseFloat(mydata[i].longitude)};
  document.getElementById("toalettListe").innerHTML = b + a + "<br>";
  var marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    position: pos,
    map: map,
    label: teller.toString()
  });
  }
}

function fill_map(søkeobj){
  var obj = søkeobj;
  var teller = 1;
  var mydata = JSON.parse(xhr.responseText);
  var pos1 = {lat:60.395946, lng:5.325745};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center:pos1
  });
  document.getElementById('toalettListe').innerHTML = "";
  for(var i =0; i < mydata.length; i++){
    var a =  teller.toString() + ". " + mydata[i].plassering;
    var b = document.getElementById("toalettListe").innerHTML;
    var pos = {lat: parseFloat(mydata[i].latitude), lng: parseFloat(mydata[i].longitude)};
    for(var j= 0; j < obj.length; j++){
    if(mydata[i].plassering == obj[j]){
      document.getElementById("toalettListe").innerHTML = b+ a + "<br>";
    var marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: pos,
      map: map,
      label: teller.toString()
    });

    teller = teller + 1;
  }
  }
  }
}

function fast_search(){
  var uri = decodeURIComponent(document.location.href);
  var result = [];
  var query_string="";
  var k = 0;

  if (uri.indexOf("=") < 0)
      return result;
  query_string = uri.substring(uri.indexOf("=")+1);
  if (query_string.indexOf("#") >= 0)
      query_string = query_string.substring(0, query_string.indexOf("#"));
  var l = query_string.length;
  for(var i = 0; i < l; i++){
      if (query_string.indexOf("+") < 0){
        result[k] = query_string;
        break;
    }

    i = query_string.indexOf("+");
    result[k] = query_string.substring(0,i);
    query_string = query_string.substring(i+1,l);

    k = k +1;

  }


  var søk ={};

  for(var i = 0; i < result.length;i++){
    if(result[i].match(/(plassering)/)){
      søk.plassering = result[i].substring(result[i].indexOf(":")+1).toUpperCase();
    }
    if(!result[i].match(/(\w+[:])/)){
      søk.adresse = result[i].substring(result[i].indexOf(":")+1);
    }
    if(result[i].match(/(kjønn:)/)){
      if(result[i].substring(result[i].indexOf(":")+1).toUpperCase() == "HERRE"){
        søk.herre = 1;
      }
      if(result[i].substring(result[i].indexOf(":")+1).toUpperCase() == "DAME"){
        søk.dame=1;
    }
  }
    if(result[i].match(/(tid)/)){
      søk.tid = result[i].substring(result[i].indexOf(":")+1).toUpperCase();
    }
    if(result[i].match(/(pissoir_only)/)){
      søk.pissoir_only = result[i].substring(result[i].indexOf(":")+1).toUpperCase();
    }
    if(result[i].match(/(stellerom)/)){
      søk.stellerom = result[i].substring(result[i].indexOf(":")+1).toUpperCase();
    }
    if(result[i].match(/(pris)/)){
      søk.pris = result[i].substring(result[i].indexOf(":")+1).toUpperCase();
    }
    if(result[i].match(/(rullestol)/)){
      søk.rullestol = result[i].substring(result[i].indexOf(":")+1).toUpperCase();
    }
  }
  return søk;

}

function advanced(){
  var uri = decodeURIComponent(document.location.href);
  var result = [];
  var query_string="";
  var k = 0;
  if (uri.indexOf("=") < 0)
      return result;
  query_string = uri.substring(uri.indexOf("?")+1);
  if (query_string.indexOf("#") >= 0)
      query_string = query_string.substring(0, query_string.indexOf("#"));
  var l = query_string.length;
  for(var i = 0; i < l; i++){
      if (query_string.indexOf("&") < 0){
        result[k] = query_string;
        break;
    }
    i = query_string.indexOf("&");
    result[k] = query_string.substring(0,i);
    query_string = query_string.substring(i+1,l);

    k = k +1;
}

var søk = {};
for(var i = 0; i < result.length;i++){
  if(result[i].match(/(plassering)/)){
      if(result[i].indexOf("=")+1 > 0)
    søk.plassering = result[i].substring(result[i].indexOf("=")+1).toUpperCase();
  }

  if(result[i].match(/(kjønnHerre)/)){
    if(result[i].substring(result[i].indexOf("=")+1) == "on"){
      søk.herre = 1;
    }
  }
  if(result[i].match(/(kjønnDame)/)){
  if(result[i].substring(result[i].indexOf("=")+1) == "on"){
    søk.dame=1;
  }
}
  if(result[i].match(/(tid)/)){
    if(result[i].indexOf("=")+1 > 0)
    søk.tid = result[i].substring(result[i].indexOf("=")+1);
  }
  if(result[i].match(/(pissoir_only)/)){
      if(result[i].substring(result[i].indexOf("=")+1) == "on"){
    søk.pissoir_only = 1;
  }
}
  if(result[i].match(/(stellerom)/)){
      if(result[i].substring(result[i].indexOf("=")+1) == "on"){
    søk.stellerom = 1;
  }
}
  if(result[i].match(/(pris)/)){
    søk.pris = result[i].substring(result[i].indexOf("=")+1);
  }

  if(result[i].match(/(rullestol)/)){
      if(result[i].substring(result[i].indexOf("=")+1) == "on"){
    søk.rullestol = 1;
  }
  }
}
return søk;
}


function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop)){
            return false;
          }
        }
  return true;
}

function match_search(search_method){
var k = {};
  if(search_method == 1){
   k = advanced();
 }
  if(search_method == 2){
     k = fast_search();
   }
if(isEmpty(k)){
  return full_load();
}
console.log(k);
  var result = [];
  var mydata = JSON.parse(data);
  var teller = 0;
  var arr=[];

    for(var x in k){
      for(var i in mydata){
        var regex = new RegExp( k[x], 'g' );
        if(mydata[i][x].match(regex)){
        arr[teller] = mydata[i].plassering;
        teller = teller +1;
      }
      }
    }
    result = find_common(arr);
    fill_map(result);
  }

function find_common(arr){
  var result = [];
  var teller = 0;

  for(var i = 0; i < arr.length; i++){
    for(var j = i+1; j < arr.length; j++){
      if(arr[i] == arr[j]){
        result[teller] = arr[i];
        teller = teller + 1;
        i = i + 1;
        j = i + 1;
      }
    }
  }

  var new_result = [];
  var l  = result.length;

  for(var i = 0; i < l; i++){
    for(var j = i+1; j < l; j++){
      if(result[i] == result[j]){
       new_result = find_common(result);
      }
    }
  }
  if(result[0] == null){
    return arr;
  }
  if (new_result[0] == null){
    return result;
  }
  return new_result;
}
