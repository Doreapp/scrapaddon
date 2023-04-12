/**
 * Main home script
 */

(function () {
    const store = new Store()
    const map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    function buildRecordsTable(records) {
        rows = records.map(
            record => [
                `<img src="${record.imageUrl}" alt="${record.title}" style="max-width: 150px;">`,
                record.title,
                `${record.totalPrice} €`,
                `${record.starRating}/5 (${record.reviewCount})`,
                `<a href="${record.url}">Link</a>`,
                record.personCapacity,
                record.propertyType,
                record.roomType
            ]
        )
        UI.buildTable(
            "table#records",
            ["Image", "Title", "Total price", "Rate", "Link", "Capacity", "Property", "Room"],
            rows,
            records.map(record => `record-${record.listingId}`)
        )
    }

    function buildRecordsMarkers(records) {
        const markerIcon = L.icon({
            iconUrl: '../airbnb/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12.5, 20.5],
            popupAnchor: [0, -22]
        });
        for (const record of records) {
            if (!record.listingLat || !record.listingLng)
                continue
            const marker = L.marker([record.listingLat, record.listingLng], { icon: markerIcon })
            marker.addTo(map);
            marker.on('mouseover', function () {
                qs(`#record-${record.listingId}`).classList.add("focused")
            });
            marker.on('mouseout', function () {
                qs(`#record-${record.listingId}`).classList.remove("focused")
            });
        }
    }

    function displayAirbnbRecords(records) {
        console.log("displaying Airbnb Records", records)
        buildRecordsTable(records)
        buildRecordsMarkers(records)
    }

    store.getHistory()
        .then(displayAirbnbRecords)
        .catch(error => console.error("Error getting airbnb records", error))
})()
