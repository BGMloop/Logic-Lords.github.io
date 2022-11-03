var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 39.8283, lng: -98.5795 },
        zoom: 3
    });
}