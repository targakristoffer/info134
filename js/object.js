var data = '[{"herre":"1","tid_sondag":"07.00 - 23.15","pissoir_only":"NULL","stellerom":"NULL","latitude":"60.3879681","tid_hverdag":"07.00 - 23.15","plassering":"NONNESETER TERMINAL, SØR","tid_lordag":"07.00 - 23.15","rullestol":"1","adresse":"Lungegårdskaien","pris":"12","id":"1","place":"NONNESETER TERMINAL, SOUTH","dame":"1","longitude":"5.334608"},{"herre":"1","tid_sondag":"NULL","pissoir_only":"NULL","stellerom":"NULL","latitude":"60.3884988","tid_hverdag":"05.30 - 23.50","plassering":"NONNESETER TERMINAL , NORD","tid_lordag":"07.00 - 23.15","rullestol":"1","adresse":"Østre Strømkai","pris":"12","id":"2","place":"NONNESETER TERMINAL , NORTH","dame":"1","longitude":"5.3345382"},{"herre":"1","tid_sondag":"NULL","pissoir_only":"NULL","stellerom":"NULL","latitude":"60.388868","tid_hverdag":"09.00 - 17.00","plassering":"SKYSS KUNDESENTER","tid_lordag":"09.00 - 15.00","rullestol":"1","adresse":"Østre Strømkai","pris":"12","id":"3","place":"SKYSS CUSTOMER CENTRE","dame":"1","longitude":"5.3337597"},{"herre":"1","tid_sondag":"07.00 - 23.00","pissoir_only":"NULL","stellerom":"NULL","latitude":"60.39041","tid_hverdag":"07.00 - 23.00","plassering":"JERNBANESTASJONEN","tid_lordag":"07.00 - 23.00","rullestol":"NULL","adresse":"Strømgaten 4","pris":"10","id":"4","place":"RAILWAY STATION","dame":"1","longitude":"5.332995"},{"herre":"1","tid_sondag":"08.30 - 22.00","pissoir_only":"NULL","stellerom":"1","latitude":"60.394554","tid_hverdag":"09.00 - 23.00","plassering":"MATHALLEN","tid_lordag":"08.30 - 22.00","rullestol":"1","adresse":"Strandkaien 3","pris":"10","id":"5","place":"FISH MARKET","dame":"1","longitude":"5.324099"},{"herre":"1","tid_sondag":"08.00 - 18.00","pissoir_only":"NULL","stellerom":"","latitude":"60.3951003","tid_hverdag":"08.00 - 18.00","plassering":"STRANDKAITERMINALEN","tid_lordag":"08.00 - 18.00","rullestol":"","adresse":"Strandkaien","pris":"10","id":"6","place":"STRANDKAI BOAT TERMINAL","dame":"1","longitude":"5.3220606"},{"herre":"1","tid_sondag":"NULL","pissoir_only":"NULL","stellerom":"NULL","latitude":"60.3913793","tid_hverdag":"08.00 - 15.00","plassering":"BERGEN KOMMUNE, INNBYGGERSERVICE","tid_lordag":"NULL","rullestol":"1","adresse":"Kaigaten 4","pris":"0","id":"7","place":"CITIZEN SERVICE CENTRE","dame":"1","longitude":"5.3290558"},{"herre":"1","tid_sondag":"NULL","pissoir_only":"NULL","stellerom":"1","latitude":"60.3891105","tid_hverdag":"09.00 - 21.00","plassering":"BERGEN STORSENTER","tid_lordag":"09.00 - 18.00","rullestol":"1","adresse":"Strømgaten 8","pris":"10","id":"8","place":"BERGEN STORSENTER","dame":"1","longitude":"5.3322315"},{"herre":"1","tid_sondag":"NULL","pissoir_only":"NULL","stellerom":"1","latitude":"60.392209","tid_hverdag":"09.00 - 21.00","plassering":"SUNDT MOTEHUS","tid_lordag":"09.00 - 18.00","rullestol":"1","adresse":"Torgallmenningen 14","pris":"10","id":"9","place":"SUNDT FASHION HOUSE","dame":"1","longitude":"5.324011"},{"herre":"1","tid_sondag":"NULL","pissoir_only":"NULL","stellerom":"1","latitude":"60.3927098","tid_hverdag":"09.00 - 20.00","plassering":"XHIBITION","tid_lordag":"09.00 - 18.00","rullestol":"1","adresse":"Småstrandgaten 3","pris":"10","id":"10","place":"XHIBITION","dame":"1","longitude":"5.3262019"},{"herre":"1","tid_sondag":"NULL","pissoir_only":"NULL","stellerom":"1","latitude":"60.3932345","tid_hverdag":"09.00 - 21.00","plassering":"GALLERIET","tid_lordag":"09.00 - 18.00","rullestol":"1","adresse":"Torgallmenningen 8","pris":"10","id":"11","place":"GALLERIET","dame":"1","longitude":"5.3252363"},{"herre":"1","tid_sondag":"NULL","pissoir_only":"NULL","stellerom":"1","latitude":"60.3944194","tid_hverdag":"10.00 - 20.00","plassering":"KLØVERHUSET","tid_lordag":"10.00 - 18.00","rullestol":"1","adresse":"Strandgaten 13 -15","pris":"10","id":"12","place":"KLØVERHUSET","dame":"1","longitude":"5.3205649"},{"herre":"1","tid_sondag":"09.00 - 18.00","pissoir_only":"NULL","stellerom":"NULL","latitude":"60.3975913","tid_hverdag":"09.00 - 18.00","plassering":"BRYGGEN BESØKSSENTER","tid_lordag":"09.00 - 18.00","rullestol":"1","adresse":"Jacobsfjorden, Bryggen","pris":"10","id":"13","place":"BRYGGEN VISITOR CENTRE","dame":"1","longitude":"5.3244317"},{"herre":"NULL","tid_sondag":"ALL","pissoir_only":"1","stellerom":"NULL","latitude":"60.3973581","tid_hverdag":"ALL","plassering":"C. SUNDTSGT","tid_lordag":"ALL","rullestol":"NULL","adresse":"C. Sundts gt","pris":"NULL","id":"14","place":"C. SUNDTSGT","dame":"NULL","longitude":"5.3132629"}]';


function load(){
var mydata = JSON.parse(data);
var pos1 = {lat: parseFloat(mydata[0].latitude), lng: parseFloat(mydata[0].longitude)};
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 14,
  center:pos1
});
for(var i =0; i < mydata.length; i++){
  var teller = i + 1;
  var a =  teller.toString() + " " + mydata[i].plassering +" Adresse: " + mydata[i].adresse;
  var b = document.getElementById("toalettListe").innerHTML
  var pos = {lat: parseFloat(mydata[i].latitude), lng: parseFloat(mydata[i].longitude)};
  document.getElementById("toalettListe").innerHTML = b + a + "<br>";
  var marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    animation: google.maps.Animation.BOUNCE,
    position: pos,
    map: map,
    label: teller.toString()
  });
  }
}


function hurtigsøk(søkeobj){
  var obj = søkeobj;
  var mydata = JSON.parse(data);
  var pos1 = {lat: parseFloat(mydata[0].latitude), lng: parseFloat(mydata[0].longitude)};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center:pos1
  });
  document.getElementById('toalettListe').innerHTML = "";
  for(var i =0; i < mydata.length; i++){
    var teller = i + 1;
    var a =  teller.toString() + ". " + mydata[i].plassering;
    var b = document.getElementById("toalettListe").innerHTML;
    var pos = {lat: parseFloat(mydata[i].latitude), lng: parseFloat(mydata[i].longitude)};
    if(mydata[i].plassering == obj.plassering){
      document.getElementById("toalettListe").innerHTML = b+ a + "<br>";
    var marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: pos,
      map: map,
      label: teller.toString()
    });
  }
  if(obj.kjønn == "herre")
  if(mydata[i].herre == 1){
    document.getElementById("toalettListe").innerHTML = b+ a + "<br>";
  var marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    position: pos,
    map: map,
    label: teller.toString()
  });
}
  }

}

function test(){
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
        console.log("resultat: " + result[k]);
        break;
    }

    i = query_string.indexOf("+");
    result[k] = query_string.substring(0,i);
    console.log("resultat: " + result[k]);
    query_string = query_string.substring(i+1,l);

    k = k +1;

  }


  var søk ={};


  for(var i = 0; i < result.length;i++){
    if(result[i].match(/(plassering)/)){
      søk.plassering = result[i].substring(result[i].indexOf(":")+1).toUpperCase();
    }
    if(result[i].match(/(adresse)/)){
      søk.adresse = result[i].substring(result[i].indexOf(":")+1).toUpperCase();
    }
    if(result[i].match(/(kjønn)/)){
      søk.kjønn = result[i].substring(result[i].indexOf(":")+1).toUpperCase();
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
  console.log(søk);
  hurtigsøk(søk);
}
