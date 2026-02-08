const colleges = [
    { name: "Jai Hind College", lat: 18.9322, lng: 72.8264 },
    { name: "Vidyalankar Institute of Technology", lat: 19.0166, lng: 72.8566 },
    { name: "K. J. Somaiya College of Engineering", lat: 19.0728, lng: 72.9005 },
    { name: "SIES College", lat: 19.0436, lng: 72.8634 },
    { name: "Bharati Vidyapeeth", lat: 19.0330, lng: 73.0297 }
];

let map, userMarker;

navigator.geolocation.getCurrentPosition(position => {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;

    map = L.map('map').setView([userLat, userLng], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    userMarker = L.marker([userLat, userLng])
        .addTo(map)
        .bindPopup("You are here")
        .openPopup();

    colleges.forEach(c => {
        L.marker([c.lat, c.lng])
            .addTo(map)
            .bindPopup(c.name);
    });

}, () => {
    alert("Location permission denied");
});

function distance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function findNearestCollege() {
    const userPos = userMarker.getLatLng();
    let nearest, min = Infinity;

    colleges.forEach(c => {
        const d = distance(userPos.lat, userPos.lng, c.lat, c.lng);
        if (d < min) {
            min = d;
            nearest = c;
        }
    });

    document.getElementById("result").innerHTML =
        `<b>${nearest.name}</b> is nearest<br>Distance: ${min.toFixed(2)} km`;

    map.setView([nearest.lat, nearest.lng], 14);
}
