
function initMap() {
    var heidis = {lat: 60.390106, lng: 5.320687};
    var fotballpuben = {lat: 60.390265, lng: 5.320959};
    var lillebar = {lat: 60.391133, lng: 5.322045};
    var vaskeriet = {lat: 60.391509, lng: 5.319852};
    var bryggen = {lat:60.397495, lng: 5.322580};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: heidis
    });
    var marker = new google.maps.Marker({
      position: heidis,
      map: map
    });
    var marker2 = new google.maps.Marker({
      position: fotballpuben,
      map: map
    });
    var marker3 = new google.maps.Marker({
      position: lillebar,
      map: map
    });
    var marker4 = new google.maps.Marker({
      position: vaskeriet,
      map: map
    });
    var marker5 = new google.maps.Marker({
      position: bryggen,
      map: map
    });
  }
