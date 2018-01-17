
function initMap() {
    var heidis = {lat: 60.390106, lng: 5.320687};
    var fotballpuben = {lat: 60.390265, lng: 5.320959};
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
  }
