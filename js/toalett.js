function velgFavorittToalett() {
    var x = document.createElement("SELECT");
    x.setAttribute("id", "mySelect");
    document.body.appendChild(x);
    console.log(jsonData.entries[0].plassering);
    for(var i = 0;i<jsonData.entries.length ;i++){
    var z = document.createElement("option");
    var t = document.createTextNode(jsonData.entries[i].plassering);
    z.appendChild(t);
    document.getElementById("mySelect").appendChild(z);
  }
}
