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

    function displayAirbnbRecords(records) {
        console.log("displaying Airbnb Records", records)
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
            rows
        )
    }

    store.getHistory()
        .then(displayAirbnbRecords)
        .catch(error => console.error("Error getting airbnb records", error))
})()
