
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

function Nlekeplasser() {
  get_data("https://hotell.difi.no/api/json/bergen/lekeplasser?");
}

// Funksjon som tar inn navnet på et toalett og finner de
// 5 nærmeste lekeplassene i en sortert liste.
// Returnerer listen
function lagListeMedLekeplasser(toalettNavn) {

  for(var i =0; i < jsonData.entries.length; i++){
    var teller = i + 1;
    var toalettLat = 0;
    var toalettLong = 0;
    var a =  jsonData.entries[i].plassering;
    if (a == toalettNavn) {
      toalettLat = parseFloat(jsonData.entries[i].latitude);
      toalettLong = parseFloat(jsonData.entries[i].longitude);
    }
  }

  var lekeplassListe = [];
  for(var j = 0; j < jsonData.entries.length; j++)
    //console.log(kalkulerDistanse(toalettLat, toalettLong, jsonData2.entries[j].latitude,
      //  jsonData2.entries[j].longitude));

}
