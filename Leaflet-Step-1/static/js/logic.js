// API query URL
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

// Create a new marker cluster group
var eq_markers = [];
var fl_markers = [];

// Grab the data with d3
d3.json(url, function(response) {

  // Loop through data
  for (var i = 0; i < response["features"].length; i++) {

    // Set the data location property to a variable
    var location = response["features"][i].geometry;

    // Check for location property
    if (location) {
      // set variables for formating markers
      if (location.coordinates[2] > 90) {
        mrk_color = "#d73027"
      }
      else if (location.coordinates[2] > 70) {
        mrk_color = "#fc8d59"
      }
      else if (location.coordinates[2] > 50) {
        mrk_color = "#fee090"
      }
      else if (location.coordinates[2] > 30) {
        mrk_color = "#e0f3f8"
      }
      else if (location.coordinates[2] > 10) {
        mrk_color = "#91bfdb"
      }
      else { 
        mrk_color = "#4575b4"
      }

      mrk_radius = parseInt(response["features"][i]["properties"]['mag'])*15000
      
      // Add a new marker to the cluster group and bind a pop-up
      // eq_markers.push(
        L.circle([location.coordinates[1], location.coordinates[0]], {
          color: mrk_color,
          fillColor: mrk_color,
          fillOpacity: 0.75,
          radius: mrk_radius
        }).bindPopup("<h3>" + response["features"][i]["properties"]["place"] + "/<h3>")
        .addTo(myMap)
      // );
    };

  };

});

console.log(eq_markers);

// Adding tile layer to the map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

// Create a baseMaps object
var baseMaps = {
  "Light Map": lightmap,
  "Dark Map": darkmap
};

// // Create Layergroup for markers
// var earthquakes = L.layerGroup(eq_markers);
// var faultlines = L.layerGroup(fl_markers);

// // Create an overlay object
// var overlayMaps = {
//   "Earthquakes": earthquakes
//   "Fault Lines": faultlines
// };

// Creating map object w/ default layers
var myMap = L.map("mapid", {
  center: [0, 0],
  zoom: 2,
  layers: [lightmap]
  // layers: [lightmap, earthquakes]
});

// Add the layer control to the map
L.control.layers(baseMaps).addTo(myMap);
// L.control.layers(baseMaps, overlayMaps).addTo(myMap);
