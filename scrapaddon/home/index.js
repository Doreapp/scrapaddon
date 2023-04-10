/**
 * Main home script
 */

(function () {
    const store = new Store()

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
