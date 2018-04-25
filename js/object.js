
var jsonData = {};

function favToalett(){
  get_data("https://hotell.difi.no/api/json/bergen/dokart?");
}

function get_data(url){
  console.log(url);
  xhr = new XMLHttpRequest();
  xhr.open("GET",url);
  xhr.onreadystatechange = function(){
      if(xhr.readyState === 4 && xhr.status === 200){
        if(isJson(xhr.response)){
        parse_data(xhr.response);
      }
      else{
        return null;
      }
    }
  }
  xhr.send();
}
/* Returnerer true dersom stringen er lik et json objekt.*/
function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

/* Gjør om en string til et json objekt.*/
function parse_data(json){
  jsonData = JSON.parse(json);
  check_method();
}

/* Ser etter hvilket type søk som er gjort (hurtig /avansert) */
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
for(var i =0; i < jsonData.entries.length; i++){
  var teller = i + 1;
  var a =  jsonData.entries[i].plassering +" Adresse: " + jsonData.entries[i].adresse;
  var b =  jsonData.entries[i].navn;
  var pos = {lat:parseFloat(jsonData.entries[i].latitude), lng:parseFloat(jsonData.entries[i].longitude)};
  var ol = document.getElementById("liste");
  var li = document.createElement("li");

  if (jsonData.entries[i].plassering != undefined) {
    li.innerHTML = a;
    ol.appendChild(li);
  }

  else {li.innerHTML = b;
    ol.appendChild(li);
  }
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
  var pos1 = {lat:60.395946, lng:5.325745};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center:pos1
  });

  for(var i =0; i < jsonData.entries.length; i++){
    var a = jsonData.entries[i].plassering;
    var pos = {lat: parseFloat(jsonData.entries[i].latitude), lng: parseFloat(jsonData.entries[i].longitude)};

    var ol = document.getElementById("liste");
    var li = document.createElement("li");


    for(var j= 0; j < obj.length; j++){
    if(jsonData.entries[i].plassering == obj[j]){
      li.innerHTML = a;
      ol.appendChild(li);
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
  var result = [];

  var teller = 0;
  var arr=[];

    for(var x in k){
      for(var i in jsonData.entries){
        var regex = new RegExp( k[x], 'g' );
        if(jsonData.entries[i][x].match(regex)){
        arr[teller] = jsonData.entries[i].plassering;
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
  function velgFavorittToalett() {
    var x = document.createElement("SELECT");
    x.setAttribute("id", "mySelect");
    document.getElementById("drop").appendChild(x);
    console.log(jsonData.entries[0].plassering);
    for(var i = 0;i<jsonData.entries.length ;i++){
    var z = document.createElement("option");
    z.setAttribute("value", "Toaletter");
    var t = document.createTextNode(jsonData.entries[i].plassering);
    z.appendChild(t);
    document.getElementById("mySelect").appendChild(z);
  }
}

// Kalkulerer grader til radianer
function tilRadianer(grader) {
  var resultat = grader * Math.PI/180;
  return resultat;
}

// Kalkulerer en distanse mellom to lokasjoner i km,
// tar inn longitude og latitude som argumenter.
// Funksjonen bruker Haversine formula som determinerer
// distansen mellom to punkt på sfæren til en kule
function kalkulerDistanse(lat1, long1, lat2, long2) {

  // Jordas radius i km
  var jordasRadius = 6371;
  var dLat = tilRadianer(lat2 - lat1);
  var dLong = tilRadianer(long2 - long1);
  var lat1 = tilRadianer(lat1);
  var lat2 = tilRadianer(lat2);

  var a = Math.pow(Math.sin(dLat/2), 2) + Math.pow(Math.sin(dLong/2), 2) * Math.cos(lat1) * Math.cos(lat2);
  // c kalkulerer en numerisk verdi som en vinkel mellom -π og π
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  // d kalkulerer distanse
  var d = jordasRadius * c;

  return d;
}


// Funksjon som tar inn navnet på et toalett og finner de
// 5 nærmeste lekeplassene i en sortert liste.
// Returnerer listen
function lagListeMedLekeplasser(toalettNavn) {
  console.log(jsonData);
  console.log(toalettNavn);
  for(var i =0; i < 14; i++){
    var teller = i + 1;
    var toalettLat = 0;
    var toalettLong = 0;
    var a =  jsonData.entries[i].plassering;

    if (a == toalettNavn) {
      toalettLat = parseFloat(jsonData.entries[i].latitude);
      toalettLong = parseFloat(jsonData.entries[i].longitude);
      console.log("TEST1 " + a);
      console.log("TEST2" + toalettLong + "  " + toalettLat);
    }
  }

  function Nlekeplasser() {
    get_data("https://hotell.difi.no/api/json/bergen/lekeplasser?");
  }

  var lekeplasserObjekt = Nlekeplasser();
  var lekeplassListe = [];

  console.log(lekeplasserObjekt);

  for(var j = 0; j < lekeplasserObjekt.entries.length; j++) {
    console.log(kalkulerDistanse(toalettLat, toalettLong, lekeplasserObjekt.entries[j].latitude,
        lekeplasserObjekt.entries[j].longitude));
        lekeplassListe.push(kalkulerDistanse(toalettLat, toalettLong, lekeplasserObjekt.entries[j].latitude,
            lekeplasserObjekt.entries[j].longitude));
  }
  console.log(lekeplassListe);

}
