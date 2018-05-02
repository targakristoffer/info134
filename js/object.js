/* MERK! Dette er et pågående prosjekt hvor jeg prøver meg veldig frem med kodingen og det er nokså uryddig
og vanskelig å lese. Alt i alt skal koden generere et kart over Bergen med offentlige toaletter hentet fra et JSON-dokument og brukeren
har mulighet til å søke etter adresse, kjønn, pris osv. */

var jsonData ={};
var jsonData2 = {};
console.log(isEmpty(jsonData));

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
  if(isEmpty(jsonData)){
  jsonData = JSON.parse(json);
  check_method();
}
  else {
    console.log("funka");
  jsonData2 = JSON.parse(json);
  }
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
    if(jsonData.entries[i].plassering == obj[j].plassering){
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
    if(result[i].match(/(herre:)/)){
      if(result[i].substring(result[i].indexOf(":")+1).toUpperCase() == "1"){
        søk.herre = 1;
      }
      else {
        søk.herre = "NULL";
      }
  }
  if(result[i].match(/(dame:)/)){
    if(result[i].substring(result[i].indexOf(":")+1).toUpperCase() == "1"){
      søk.dame = 1;
    }
    else {
      søk.dame = "NULL";
    }
  }
    if(result[i].match(/(åpen:)/)){
      if(result[i].substring(result[i].indexOf(":")+1) == "nå"){
      søk.åpen_nå = new Date().toLocaleTimeString('en-US', {hour12: false, hour:"numeric", minute: "numeric"}).replace(":",".");
      console.log(søk.åpen_nå);
    }
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
  var arr=[];



  for(var i = 0; i < jsonData.entries.length; i++){
    var keys = Object.keys(k);
    var teller = 0;
    for(var j = 0; j < keys.length; j++){
    /*  console.log("Keys[j]  " + keys[j]);
      console.log("k[keys[j]]  "+k[keys[j]]);
      console.log("keys " + keys);*/
      if(keys[j] == "åpen_nå"){
        console.log("lengde " + keys.length);
        var date = new Date();
        if(check_open(jsonData.entries[i], k[keys[j]], date.getDay())){
          console.log("Var true");
          teller++;
        }
      }
      if(jsonData.entries[i].hasOwnProperty(keys[j])){
        if(jsonData.entries[i][keys[j]] == k[keys[j]]){
          teller++;
        }
      }
      if(teller === keys.length){
        arr.push(jsonData.entries[i]);
      }
    }
  }
  console.log(arr);
  fill_map(arr);

/*
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
    fill_map(result);*/
  }

  function check_open(json, search_time, day){
    if(json.tid_hverdag == "ALL" || json.tid_lordag == "ALL" || json.tid_sondag == "ALL"){
      console.log(json.plassering +" "+json.tid_hverdag);
      return true;
    }
    if(6>day>0){ //hverdag
     var open = json.tid_hverdag.substring(0,json.tid_hverdag.indexOf(" "));
      var close = json.tid_hverdag.substring(json.tid_hverdag.lastIndexOf(" ")+1);
      if( open <= search_time <= close){
      return true;
      }
    }
    if(day === 6){//lørdag
      var open = json.tid_lordag.substring(0,json.tid_lordag.indexOf(" "));
      var close = json.tid_lordag.substring(json.tid_lordag.lastIndexOf(" ")+1);
      if( open <= search_time <= close){
       return true;
      }
    }
    if(day === 0){//Søndag
      var open = json.tid_sondag.substring(0,json.tid_sondag.indexOf(" "));
      var close = json.tid_sondag.substring(json.tid_sondag.lastIndexOf(" ")+1);
      if( open <= search_time <= close){
       return true;
      }
    }
    return false;
  }

function find_common(arr){
  var result = [];
  var teller = 0;




//Legge til en teller på en måte slik at koden sjekker om antall søkekriterier fra søkeobjektet matcher jsondataen.
// Kan bruke søkeobjektet og legge inn en match i en ny array og sjekke lengden til den. Om lengden er lik lengden til søkeobjektet
// så er stedet en match.

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

  var buttonPushed = false;

  function velgFavorittToalett() {
    if(!buttonPushed){
    var t ="";
    var x = document.createElement("SELECT");
    x.setAttribute("id", "mySelect");
    document.getElementById("drop").appendChild(x);
    for(var i = 0;i<jsonData.entries.length+1 ;i++){
    var z = document.createElement("option");
    z.setAttribute("id","test");
    z.setAttribute("value", "Toaletter");
    if(i == 0){
     t = document.createTextNode("velg fav");
    }
    else
     t = document.createTextNode(jsonData.entries[i-1].plassering);
    z.appendChild(t);
    document.getElementById("mySelect").appendChild(z);
  }
  document.getElementById("mySelect").addEventListener("change", function(){
  var valg = document.getElementById("mySelect");
  var sendesVidere = valg.options[valg.selectedIndex].text;
  lagListeMedLekeplasser(sendesVidere);
});
}
buttonPushed = true;
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

function NLekeplasser() {
  get_data("https://hotell.difi.no/api/json/bergen/lekeplasser?");
}

// Funksjon som sorterer lekeplasser med hensyn på distanse
function sorter_lekeplasser(lekeplasser) {
   lekeplasser.sort(function(x, y) {
   return (x.distanse - y.distanse)
});
   return lekeplasser;
}

// Funksjon som får inn en lengde i km og returnerer en avrundet
// verdi i meter om lengden < 1, eller km om lengden er >= 1
function lengdeTekst(km) {
  if (km < 1) {
    return Math.round(km*1000) + " meter";
  } else return Math.round(km*100)/100 + " km";
}

// Funksjon som tar inn navnet på et toalett og finner de
// nærmeste lekeplassene i en sortert liste.
// Returnerer listen
function lagListeMedLekeplasser(toalettNavn) {
  console.log(toalettNavn);
  var lekeplasser = [];

  for(var i =0; i < jsonData.entries.length; i++){
    var teller = i + 1;
    var toalettLat = 0;
    var toalettLong = 0;
    var a =  jsonData.entries[i].plassering;

    if (a == toalettNavn) {
      toalettLat = parseFloat(jsonData.entries[i].latitude);
      toalettLong = parseFloat(jsonData.entries[i].longitude);
      for(var j = 0; j < jsonData2.entries.length; j++) {
        // Oppretter lekeplass-objekter med navn og distanse
        lekeplasser[j] = {
        navn: jsonData2.entries[j].navn,
        distanse: kalkulerDistanse(toalettLat, toalettLong, jsonData2.entries[j].latitude,
            jsonData2.entries[j].longitude)
      };
      lekeplasser = sorter_lekeplasser(lekeplasser);
    }
  }
}

// Får en liste med 5 lekeplasser som er sotert med hensyn på distanse
var lekeplasserhtml = lekeplasser.slice(0,5).map(function (element){
  return '<li>' + lengdeTekst(element.distanse) + " " + element.navn + '</li>';
  }).join(' ');
  document.getElementById("lekeplasser").innerHTML = lekeplasserhtml;

console.log("TEST1 " + a);
console.log("TEST2" + toalettLong + "  " + toalettLat);
console.log(lekeplasser.slice(0, 5));
console.log(jsonData2);
}
