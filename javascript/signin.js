const firebaseConfig = {
  apiKey: "AIzaSyB3uA91RM3XpGaD6nI9J9-vjLJTr9v_n7A",
  authDomain: "living-labs-hack.firebaseapp.com",
  projectId: "living-labs-hack",
  storageBucket: "living-labs-hack.firebasestorage.app",
  messagingSenderId: "721315419723",
  appId: "1:721315419723:web:5c06495ee913c9eb1ddfce",
  measurementId: "G-VHSERM637D"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

function signIn() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("number").value.trim();
    const location = document.getElementById("location").value.trim();
    const email = document.getElementById("email").value.trim();
    const issue = document.getElementById("issue").value.trim();

    const error = document.getElementById("error");
    error.style.color = "red";
    error.innerText = "";

    if (!name || !phone || !location || !email || !issue) {
        error.innerText = "Please fill in all fields";
        return;
    }

    if (phone.length < 10) {
        error.innerText = "Enter a valid phone number!";
        return;
    }

    db.collection("sahay").add({
        fullName: name,
        phone: phone,
        location: location,
        email: email,
        issue: issue,
        status: "Pending",
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        error.style.color = "green";
        error.innerText = "✅ Issue submitted successfully! Redirecting...";

        setTimeout(() => {
            window.location.href = "/index.html";
        }, 1500);
    })

    .catch((err) => {
        error.innerText = err.message;
    });
}

const colleges = [
    {
        name: "Jai Hind College",
        lat: 18.9322,
        lng: 72.8264
    },
    {
        name: "Vidyalankar Institute of Technology",
        lat: 19.0166,
        lng: 72.8566
    },
    {
        name: "K. J. Somaiya College of Engineering",
        lat: 19.0728,
        lng: 72.9005
    },
    {
        name: "SIES College",
        lat: 19.0436,
        lng: 72.8634
    },
    {
        name: "Bharati Vidyapeeth",
        lat: 19.0330,
        lng: 73.0297
    }
];
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
function findNearestCollege() {
    const output = document.getElementById("nearestCollege");

    if (!navigator.geolocation) {
        output.innerText = "Geolocation is not supported.";
        return;
    }

    navigator.geolocation.getCurrentPosition(position => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        let nearest = null;
        let minDistance = Infinity;

        colleges.forEach(college => {
            const distance = getDistance(
                userLat,
                userLng,
                college.lat,
                college.lng
            );

            if (distance < minDistance) {
                minDistance = distance;
                nearest = college;
            }
        });

        output.innerHTML = `
            <strong>Nearest College:</strong> ${nearest.name}<br>
            <strong>Distance:</strong> ${minDistance.toFixed(2)} km
        `;
    }, () => {
        output.innerText = "Location access denied.";
    });
}
