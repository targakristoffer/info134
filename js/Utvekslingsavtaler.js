var jsonData = {};

function get_json(json){
  jsonData = json;
}

function søk(){
  var bool = true;
  var valg ="";
  var ul = document.getElementById("liste");
  var søkeord = document.getElementById("søkefelt").value;
  while(ul.firstChild){
    ul.removeChild(ul.firstChild);
  }
  //Hvilken property som skal søkes etter.
  if(document.getElementById("radio_land").checked){
    valg = "land";
  }
  else {
    valg = "institutt";
  }
  for(var i = 0; i < jsonData.avtale.length; i++){
    bool = true;
    if (søkeord == jsonData.avtale[i][valg]) {
      for(prop in jsonData.avtale[i]){
        var a = jsonData.avtale[i][prop];
        var li = document.createElement("li");
        if(bool){//Lager overskrift for hvert søkeresultat
          li.innerHTML =  prop + " : " + "<h3>" + a +"</h3>";
          ul.appendChild(li);
        }
        else {
          li.innerHTML = prop + " : " + a;
          ul.appendChild(li);
        }
        bool = false;
      }
    }
  }
}
