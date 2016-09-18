(function() {
  var options = {
    center: new google.maps.LatLng(24.7577, -102.4376),
    zoom: 3,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };

  var map = new google.maps.Map(document.getElementById('map'), options);
  // SOCRATA DEVELOPER DOCUMENTATION: https://dev.socrata.com
  // DATASET LINK: https://data.nasa.gov/dataset/Global-Landslide-Catalog-Export/dd9e-wu2v
  // DEV DOCUMENTATION FOR LANDSLIDE DATASET: https://dev.socrata.com/foundry/data.nasa.gov/tfkf-kniw
  $.ajax({
    url: "https://data.nasa.gov/resource/tfkf-kniw.json",
    type: "GET",
    data: {
      "$$APP_TOKEN": "B6LpPxMuQFcz45e4cTWF2nq9X",
      "$WHERE": "population > 500",
      "$LIMIT": "100"
    }
  }).done(function(landslides) {
    document.getElementById('landslideNumber').innerHTML = landslides.length;
    for (var i=0; i < landslides.length; i++) {
      var contentString =
        '<div class="popup-content">'+
          '<div><b>' + landslides[i].near + '</b></div>' +
          '<div> Population: ' + landslides[i].population + '</div><br/>' +
          '<div>' + landslides[i].comments +'</div>'
        '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      var marker = new google.maps.Marker({
        position: { lat: +landslides[i].latitude, lng: +landslides[i].longitude },
        map: map,
        title: landslides[i].near
      });
      addClickListener(marker, infowindow, map);
    }
  });

  function addClickListener(marker, infowindow, map) {
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  }
})();