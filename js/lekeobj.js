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
