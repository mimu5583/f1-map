document.addEventListener("DOMContentLoaded", function () {
    fetch('https://raw.githubusercontent.com/mimu5583/f1-map/main/tracks.json')
        .then(response => {
            if (!response.ok) throw new Error("Failed to load track names");
            return response.json();
        })
        .then(tracks => {
            const dropdown = document.getElementById("dropdownCont");
            tracks.forEach(track => {
                const link = document.createElement('a');
                link.href = `/f1-map/tracks/${track.slug}/`;
                link.textContent = track.name;
                dropdown.appendChild(link);
            });
        })
        .catch(error => {
        console.error("Error loading track names: ", error);
    });
});