# Airbnb scraper

Content scripts dedicated to scrap airbnb data

## API

To fetch data from an airbnb page, we use the unofficial Airbnb API.

### Stays Pdp Section Endpoint

The first endpont we use is `https://www.airbnb.fr/StaysPdpSections/`

#### URL query parameters

| Parameter | Description | Default value |
| -- | -- | -- |
| `operationName` | - | `StaysPdpSections` |
| `locale` | Language code | `fr` |
| `currency` | Currency code | `EUR` |
| `variables` | JSON string, see (#variables-query-parameter) | |
| `extensions` | JSON string, see (#extensions-query-parameter) | |

##### `variables` query parameter

```js
{
    id: btoa(`StayListing:${id}`), // Base64 encoded Id
    pdpSectionsRequest:
    {
        adults: 1,
        bypassTargetings: false,
        categoryTag: null,
        causeId: null,
        children: 0,
        disasterId: null,
        discountedGuestFeeVersion: null,
        displayExtensions: null,
        federatedSearchId: null,
        forceBoostPriorityMessageType: null,
        infants: 0,
        interactionType: null,
        layouts: ["SIDEBAR", "SINGLE_COLUMN"],
        pets: 0,
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
        sectionIds: ["BOOK_IT_CALENDAR_SHEET", "POLICIES_DEFAULT", "BOOK_IT_SIDEBAR", "URGENCY_COMMITMENT_SIDEBAR", "BOOK_IT_NAV", "BOOK_IT_FLOATING_FOOTER", "EDUCATION_FOOTER_BANNER", "URGENCY_COMMITMENT", "EDUCATION_FOOTER_BANNER_MODAL", "CANCELLATION_POLICY_PICKER_MODAL"],
        checkIn: null,
        checkOut: null,
        p3ImpressionId: null,
        photoId: null
    }
}
```

##### `extensions` query parameter

```js
{
    persistedQuery: {
        version: 1,
        sha256Hash: "69cb84c3d27f18f34306c9f83f19064035080ae6d8fa803935860843f2bfb570"
    }
}
```

TODO use https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write
