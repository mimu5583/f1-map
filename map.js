function initMap() {
    //Create map
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        minZoom: 3,
        center: { lat: 20, lng: 0 },
        disableDefaultUI: true,
        keyboardShortcuts: false,
        styles: [
            {
                featureType: "all",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        ],
        restriction: {
            latLngBounds: {
                north: 85,
                south: -85,
                west: -179.9999,
                east: 179.9999
            },
            strictBounds: true
        },
        gestureHandling: "greedy"
    });

    //One shared infoWindow instance for all markers
    const infoWindow = new google.maps.InfoWindow();

    //Load tracks.json and iterate through each in order to create markers at each location
    fetch('https://raw.githubusercontent.com/mimu5583/f1-map/main/tracks.json')
        .then(response => response.json())
        .then(tracks => {
            tracks.forEach(track => {
                const lat = track.lat;
                const lng = track.lng;

                const marker = new google.maps.Marker({
                    position: { lat, lng },
                    map
                });

                // Show label on hover
                marker.addListener("mouseover", () => {
                    infoWindow.setContent(`<span style="font-family: Orbitron; font-size: 15px; color: #14141e; font-weight: bold;"><strong>${track.country}</strong></span>`);
                    infoWindow.open(map, marker);
                    google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
                        const iwCloseBtn = document.querySelector('.gm-ui-hover-effect');
                        if (iwCloseBtn) iwCloseBtn.style.display = 'none';
                    });
                });

                // Hide label on mouse out
                marker.addListener("mouseout", () => {
                    infoWindow.close();
                });

                // Redirect on click
                marker.addListener("click", () => {
                    window.location.href = `tracks/${track.slug}/`;
                });

                return marker;
            });
        })
        .catch(error => console.error("Error loading track data:", error));
}

window.initMap = initMap;