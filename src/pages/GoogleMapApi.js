var marker;
var markers = []
function checkInput(event) {
    event.preventDefault();
    var city1 = $("#city1").val();
    var city2 = $("#city2").val();
    var alphaExp = /^[a-zA-Z\-.'\s]+$/;

    console.log('hiiii')

    if (city1 === "" && city2 === "") {
        $("#invalidAlert").removeClass("hide");
        return false;
    }

    if (city1.match(alphaExp) && city2.match(alphaExp)) {
        sendData();
        $("#invalidAlert").addClass("hide");
        return true;
    }

    $("#invalidAlert").removeClass("hide");
    return false;

};

function sendData() {
    console.log("sent");
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    };
    markers = [];
    event.preventDefault();
    let cityA = $("#city1").val().trim();
    console.log(cityA);
    let stateA = $("#state1").val();
    console.log(stateA);
    let locationA = cityA + ", " + stateA;
    let cityB = $("#city2").val().trim();
    console.log(cityB);
    let stateB = $("#state2").val();
    let locationB = cityB + ", " + stateB;
    console.log(stateB);
    reverseGeolocate(locationA, locationB);
};

async function getLatLng(address) {
    let queryURL = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDe61mS8pbcKlszRDS-x3rnM92ygstGBi8&address=" + address;
    let geo = await geolocate(queryURL);
    return geo;
};

// Geolocate A City
async function geolocate(queryURL, fn) {
    return $.get(queryURL).then(async data => {
        let location = data.results[0].geometry.location;
        let lat = data.results[0].geometry.location.lat;
        let long = data.results[0].geometry.location.lng;
        var latlong = await new google.maps.LatLng(lat, long);
        marker = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: latlong
        });
        markers.push(marker);
        return (latlong);
    })
}

// Find Midpoint
async function findMidpoint(locationA, locationB) {
    let city1LatLng = await getLatLng(locationA);
    let city2LatLng = await getLatLng(locationB);
    let midpoint = google.maps.geometry.spherical.interpolate(city1LatLng, city2LatLng, .5);
    return midpoint;
};

// Reverse geolocate midpoint
function reverseGeolocate(locationA, locationB) {
    findMidpoint(locationA, locationB).then(function (data) {
        let queryURL = "https://cors-anywhere.herokuapp.com/http://api.geonames.org/findNearbyPlaceNameJSON?username=kdovi&cities=cities15000&maxRows=500&radius=300&lat=" + data.lat() + "&lng=" + data.lng();
        $.get(queryURL).then(function (data) {
            var largeCities = {};
            console.log(data.geonames)
            data.geonames.forEach(element => {
                var cityName = element.name;
                var stateName = element.adminCode1;
                var population = element.population;
                var locationName = cityName + ", " + stateName;
                if (population > 100000) {
                    largeCities[locationName] = population;
                }
            });
            // Create items array
            var items = Object.keys(largeCities).map(function (key) {
                return [key, largeCities[key]];
            });

            // Sort the array based on the second element
            items.sort(function (first, second) {
                return second[1] - first[1];
            });

            // Create a new array with only the first 3 items
            let topCities = items.slice(0, 3);
            console.log(items);
            console.log(topCities);

            // Seperate the items, get the city name
            try {
                let city1 = topCities[0][0];
                $("#display-city-1").text(city1);
            }
            catch (error) {
                $('#modal-not-enough').modal('show');
                $("#display-city-1").empty()
                $("#city-1-price").empty()
                console.error(error);
            }
            try {
                let city2 = topCities[1][0];
                $("#display-city-2").text(city2);
            }
            catch (error) {
                $('#modal-not-enough').modal('show');
                $("#display-city-2").empty()
                $("#city-2-price").empty()
                console.error(error);
            }
            try {
                let city3 = topCities[2][0];
                $("#display-city-3").text(city3);
            }
            catch (error) {
                $('#modal-not-enough').modal('show');
                $("#display-city-3").empty()
                $("#city-3-price").empty()
                console.error(error);
            }

            // Make pins for the cities
            // console.log("here");
            for (var i = 0; i < topCities.length; i++) {
                getLatLng(topCities[i][0]);
            };
            
            updatePrices(topCities,locationA);
        })
    });
};

function updatePrices(topCities,locationA) {
    let trip1 = topCities[0][0].split(",")[0].split("-")[0];
    let trip2 = topCities[1][0].split(",")[0].split("-")[0];
    let trip3 = topCities[2][0].split(",")[0].split("-")[0];

    let flyURL1 = "https://api.skypicker.com/flights?curr=USD&typeFlight=oneway&flyFrom=" + locationA + "&to=" + trip1 + "&partner=picky"
    $.get(flyURL1).then(parameter => {
        console.log("Flight Price 1: " + parameter.data[0].price);
        $("#city-1-price").empty().append(parameter.data[0].price * 4)
    })

    let flyURL2 = "https://api.skypicker.com/flights?curr=USD&typeFlight=oneway&flyFrom=" + locationA + "&to=" + trip2 + "&partner=picky"
    $.get(flyURL2).then(parameter => {
        console.log("Flight Price 2: " + parameter.data[0].price);
        $("#city-2-price").empty().append(parameter.data[0].price * 4)
    })

    let flyURL3 = "https://api.skypicker.com/flights?curr=USD&typeFlight=oneway&flyFrom=" + locationA + "&to=" + trip3 + "&partner=picky"
    $.get(flyURL3).then(parameter => {
        console.log("Flight Price 3: " + parameter.data[0].price);
        $("#city-3-price").empty().append(parameter.data[0].price * 4)
    })
}

function clearMarkers() {
    setMapOnAll(null);
};