/**
 * Main script of the extension
 */


const DEBUG = true
const API_KEY = "d306zoyjsyarp7ifhu67rjxn52tv0t20"

/**
 * Log information (if DEBUG is enabled)
 * @param  {...any} data
 */
const log = (...data) => {
    if (DEBUG) {
        console.log("[Malt scrap]", ...data)
    }
}

/**
 * Parse `BookIt` section
 * @param {object} section Section object
 * @returns {{price?: string}} Parsed data
 */
const parseBookItSection = (section) => {
    if (!section.structuredDisplayPrice)
        return {}
    if (!section.structuredDisplayPrice.primaryLine)
        return {}
    const price = section.structuredDisplayPrice.primaryLine.price.replace(/\s/, "")
    return { price }
}

/**
 * Parse a section
 * @param {object} section Section object to parse
 * @returns {{price?: string}} Parsed data
 */
const parseSection = (section) => {
    if (!section)
        return {}
    switch (section.__typename) {
        case "SectionContainer":
            return parseSection(section.section)
        case "BookItSection":
            return parseBookItSection(section)
        default:
            log("Unable to parse section.", `typename=${section.__typename}`, section)
    }
    return {}
}

/**
 * Parses the stays pdp section, return in the request response
 * @param {object} data Response data
 * @returns Parsed data
 */
const parseStaysPdpSection = (data) => {
    const result = {}
    log("Parsing data...", data)
    const meaningful = data.data.presentation.stayProductDetailPage.sections.metadata
    const enventDataLoggingKeys = [
        "accuracyRating",
        "amenities",
        "bedType",
        "checkinRating",
        "cleanlinessRating",
        "communicationRating",
        "guestSatisfactionOverall",
        "homeTier",
        "isSuperhost",
        "listingId",
        "listingLat",
        "listingLng",
        "locationRating",
        "personCapacity",
        "pictureCount",
        "roomType",
        "valueRating",
        "visibleReviewCount"
    ]
    for (const key of enventDataLoggingKeys) {
        result[key] = meaningful.loggingContext.eventDataLogging[key]
    }
    const sharingConfigKeys = [
        "imageUrl",
        "location",
        "pdpLink",
        "personCapacity",
        "propertyType",
        "reviewCount",
        "starRating",
        "title"
    ]
    for (const key of sharingConfigKeys) {
        result[key] = meaningful.sharingConfig[key]
    }
    for (const section of data.data.presentation.stayProductDetailPage.sections.sections) {
        for (const [key, value] of Object.entries(parseSection(section))) {
            result[key] = value
        }
    }
    return result
}

/**
 * Parse URL, extracting query params and id
 * @returns {{url: string, id: string, query: object}} Parsed data
 */
const parseUrl = () => {
    const url = window.location.href
    const splits = url.split("?")
    const baseName = splits[0].split("/").splice(-1)[0]
    const result = {
        url,
        id: baseName,
        query: {}
    }
    const urlQuery = splits.slice(1).join("?")
    const params = new URLSearchParams(urlQuery)
    params.forEach((value, key) => {
        result.query[key] = value
    })
    return result
}

/**
 * Get the real price of the room, using `/book/stays/` page
 * @param {{id: string, query: object}} options URL data query and id
 * @returns Parsed data
 */
const getRealPrice = async ({ id, query }) => {
    const newQuery = {
        numberOfAdults: query.adults || 0,
        numberOfChildren: query.children || 0,
        numberOfInfants: query.infants || 0,
        numberOfPets: query.pets || 0,
        checkin: query.check_in,
        checkout: query.check_out,
        guestCurrency: "EUR",
        productId: id,
        isWorkTrip: false
    }
    newQuery["numberOfGuests"] = newQuery.numberOfAdults + newQuery.numberOfChildren + newQuery.numberOfInfants

    const url = `https://www.airbnb.fr/book/stays/${id}?${new URLSearchParams(newQuery).toString()}`

    const html = await (await fetch(url)).text()

    let splitIndex = html.indexOf('<script id="data-state"')
    splitIndex = html.indexOf('>', splitIndex)
    let contentText = html.substring(splitIndex + 1)
    splitIndex = contentText.indexOf("</script>")
    contentText = contentText.substring(0, splitIndex)

    let data = JSON.parse(contentText)

    contentText = data.niobeMinimalClientData[0][1].data.presentation.stayCheckout.sections.temporaryQuickPayData.bootstrapPaymentsJSON
    data = JSON.parse(contentText)

    const prices = data.productPriceBreakdown.priceBreakdown.priceItems
    const result = {}
    for (const price of prices) {
        result[price.type.toLocaleLowerCase()] = price.total.amountMicros / 1e6
    }
    result["totalPrice"] = data.productPriceBreakdown.priceBreakdown.total.total.amountMicros / 1e6
    return result
}

/**
 * Scraps the room
 * @returns parsed data
 */
const scrap = async () => {
    log("Scraping starts...")
    const params = parseUrl()

    const api = new API(API_KEY)
    const response = await api.getStaysPdpSection(params)
    const data = await response.json()

    const result = parseStaysPdpSection(data)

    const priceResult = await getRealPrice(params)
    for (const [key, value] of Object.entries(priceResult)) {
        result[key] = value
    }

    return result
}

const button = Scrap.addScrapButton()
button.onclick = () => {
    scrap()
        .then(result => {
            log("RESULT", result)
        })
        .catch(error => {
            console.error("Error while parsing", error)
        })
}

