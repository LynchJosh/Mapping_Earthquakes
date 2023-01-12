// Add console.log to check to see if our code is working.
console.log("working");



// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets
};
// Create the map object with a center and zoom level.
let map = L.map('mapid', {
  center: [43.67975847722062, -79.4039613081564], 
  zoom: 11,
  layers: [streets]
});

L.control.layers(baseMaps).addTo(map); 

// Accessing the airport GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/LynchJosh/Mapping_Earthquakes/main/torontoNeighborhoods.json";



// Create a style for the lines.
var mapStyle = {
  color: "purple",
  fillColor: "yellow",
  fillOpacity: 0.1,
  weight: 1.2
};


// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data).addTo(map);
});

d3.json(torontoHoods).then(function(data) {
  L.geoJSON(data, {
    onEachFeature: function(feature, layer){
      layer.bindPopup(feature.properties.AREA_NAME)
    },
    style:mapStyle
  }).addTo(map);
});






















