function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 2,
        center: { lat: 20, lng: 0 }, // global view
    });

    // Example track
    const bahrain = { lat: 26.0325, lng: 50.5106 };
    new google.maps.Marker({
        position: bahrain,
        map,
        title: "Bahrain Grand Prix",
    });
}

window.initMap = initMap;