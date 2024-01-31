require([
    "esri/Map",
    "esri/layers/CSVLayer",
    "esri/views/MapView",
    "esri/core/urlUtils",
    "esri/config",
    "dojo/domReady!"
], function(
    Map,
    CSVLayer,
    MapView,
    urlUtils,
    esriConfig
) {

    // Set CORS for accessing CSV from GitHub
    esriConfig.request.corsEnabledServers.push('https://raw.githubusercontent.com');

    // CSVLayer URL
    var url = "https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%202/stl_crime_wgs_84.csv";

    // Create a map with a basemap
    var map = new Map({
        basemap: "dark-gray"
    });

    // Create the MapView
    var view = new MapView({
        map: map,
        container: "viewDiv",
        center: [-90.1994, 38.6270], // St. Louis, MO
        zoom: 10
    });

    // Create a popup template
    const template = {
        title: "Crime Info",
        content: "Crime {CRIME} occurred at {LOCATION} on {DATE}."
    };

    // Create a CSVLayer
    const csvLayer = new CSVLayer({
        url: url,
        popupTemplate: template
    });

    // Change symbol color
    var symbol = {
        type: "simple-marker",
        color: "red"
    };

    csvLayer.renderer = {
        type: "simple",
        symbol: symbol
    };

    // Add the CSVLayer to the map
    map.add(csvLayer);

});
