const PageScriptLocation = {
    EVENT_DETAILS_PAGE: 'event_details',
    EVENT_REGISTRATION_FORM_START: 'event_registration_form_start',
    EVENT_REGISTRATION_FORM_END: 'event_registration_form_end',
    EVENT_DASHBOARD: 'event_dashboard',
}

const ALLOWED_PAGE_SCRIPT_LOCATIONS = [
    {
        id: PageScriptLocation.EVENT_DETAILS_PAGE,
        label: 'Event details page',
    },
    {
        id: PageScriptLocation.EVENT_REGISTRATION_FORM_START,
        label: 'First page of registration form',
    },
    {
        id: PageScriptLocation.EVENT_REGISTRATION_FORM_END,
        label: 'Last/success page of registration form',
    },
    {
        id: PageScriptLocation.EVENT_DASHBOARD,
        label: 'Event dashboard',
    },
]

const ALLOWED_PAGE_SCRIPT_LOCATIONS_DICTIONARY = ALLOWED_PAGE_SCRIPT_LOCATIONS.reduce(
    (acc, curr) => {
        acc[curr.id] = curr
        return acc
    },
    {},
)

module.exports = {
    ALLOWED_PAGE_SCRIPT_LOCATIONS,
    ALLOWED_PAGE_SCRIPT_LOCATIONS_DICTIONARY,
    PageScriptLocation,
}
