/**
 * Wrapper to call Airbnb API
 */

/**
 * Wrapper object to interact with Airbnb API
 */
class API {

    /**
     * Builds the wrapper
     * @param {string} apiKey Airbnb API key, easily gettable. Anyone can use d306zoyjsyarp7ifhu67rjxn52tv0t20.
     * @param {string} currency Code for the currency to use. E.g. EUR, USD.
     * @param {string} locale Code for the language to use, e.g. fr, en.
     * @param {string} host URL host. Defaults to www.airbnb.fr
     */
    constructor(apiKey, currency = "EUR", locale = "fr", host = "www.airbnb.fr") {
        this.baseUrl = `https://${host}/api/v3`
        this.apiKey = apiKey
        this.currency = currency
        this.locale = locale
    }

    /**
     * Perform a GET request to the API
     * @param {string} url Full URL to GET
     * @param {object} data Optional data object to send
     * @returns HTTP response
     */
    async get(url, data = undefined) {
        const options = {
            headers: {
                "x-airbnb-api-key": this.apiKey
            }
        }
        if (data !== undefined) {
            options.body = JSON.stringify(data)
        }
        return await fetch(url, options)
    }

    /**
     * Fetches `Stays Pdp Section` endpoint
     * @param {{id: string, query: object}} options
     *  `id` is the id of the room (foundable in the URL as `www.airbnb.fr/room/<id>`)
     *  `query` is the query object to send, containing the URL parameters (e.g. checkout, checkin)
     * @returns HTTP Response instance
     */
    async getStaysPdpSection({ id, query }) {
        const endpoint = "StaysPdpSections"
        const urlQuery = {
            operationName: "StaysPdpSections",
            locale: this.locale,
            currency: this.currency,
        }
        urlQuery.variables = {
            id: btoa(`StayListing:${id}`),
            pdpSectionsRequest:
            {
                adults: `${query.adults || 1}`,
                bypassTargetings: false,
                categoryTag: query.category_tag || null,
                causeId: null,
                children: `${query.children || 0}`,
                disasterId: null,
                discountedGuestFeeVersion: null,
                displayExtensions: null,
                federatedSearchId: query.federated_search_id || null,
                forceBoostPriorityMessageType: null,
                infants: `${query.infants || 0}`,
                interactionType: null,
                layouts: ["SIDEBAR", "SINGLE_COLUMN"],
                pets: query.pets || 0,
                pdpTypeOverride: null,
                preview: false,
                previousStateCheckIn: null,
                previousStateCheckOut: null,
                priceDropSource: null,
                privateBooking: false,
                promotionUuid: null,
                relaxedAmenityIds: null,
                searchId: null,
                selectedCancellationPolicyId: null,
                selectedRatePlanId: null,
                splitStays: null,
                staysBookingMigrationEnabled: false,
                translateUgc: null,
                useNewSectionWrapperApi: false,
                sectionIds: null,
                checkIn: query.check_in || null,
                checkOut: query.check_out || null,
                p3ImpressionId: query.source_impression_id || null,
                photoId: null
            }
        }
        urlQuery.extensions = {
            persistedQuery: {
                version: 1,
                sha256Hash: "69cb84c3d27f18f34306c9f83f19064035080ae6d8fa803935860843f2bfb570"
            }
        }
        this.sanatizeQuery(urlQuery)
        const searchParams = new URLSearchParams(urlQuery)
        return await this.get(`${this.baseUrl}/${endpoint}?${searchParams.toString()}`)
    }

    /**
     * Sanatize query object, transforming `variables` and `extensions` attributes
     * as JSON string
     * @param {{variables: object, extensions: object}} query Query object to sanatize
     */
    sanatizeQuery(query) {
        query.variables = JSON.stringify(query.variables)
        query.extensions = JSON.stringify(query.extensions)
    }
}