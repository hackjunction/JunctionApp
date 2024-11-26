import _ from 'lodash'

const initialEvents = [
    {
        statuses: [
            'checkedIn',
            'confirmed',
            'accepted',
            'confirmedToHub',
            'acceptedToHub',
        ],
    },
]

const recruitmentBaseFilterProperties = {
    statuses: [
        'checkedIn',
        'confirmed',
        'accepted',
        'confirmedToHub',
        'acceptedToHub',
    ],
    filters: [
        'countryOfResidence',
        'recruitmentOptions',
        'spokenLanguages',
        'status',
        'skills',
        'roles',
    ],
}

export const buildFilterArray = (
    {
        skills = [],
        roles = [],
        countryOfResidence = [],
        spokenLanguages = [],
        recruitmentStatus = [],
        relocationStatus = [],
        textSearch = '',
    },
    event,
) => {
    let isRegistrationDataInUse = false

    const arrayMerge = [
        ...event.registrationConfig.optionalFields,
        ...event.registrationConfig.requiredFields,
    ]

    if (
        _.intersection(arrayMerge, recruitmentBaseFilterProperties.filters)
            .length > 0
    ) {
        isRegistrationDataInUse = true
    }

    const formatField = (field, usingRegistrationData) => {
        //This utility returns the field formated if it must be taken from the registration of the user, of if it must use the user profile information
        if (usingRegistrationData) {
            return `answers.${field}`
        }
        return field
    }

    const filters = []

    const events = initialEvents

    if (textSearch.length > 0) {
        return textSearch
    }

    if (countryOfResidence && countryOfResidence.length) {
        filters.push({
            field: formatField('countryOfResidence', isRegistrationDataInUse),
            operator: 'contains',
            value: countryOfResidence,
        })
    }

    if (relocationStatus && relocationStatus.length) {
        filters.push({
            field: formatField(
                'recruitmentOptions.relocation',
                isRegistrationDataInUse,
            ),
            operator: 'contains',
            value: relocationStatus,
        })
    }

    if (recruitmentStatus && recruitmentStatus.length) {
        filters.push({
            field: formatField(
                'recruitmentOptions.status',
                isRegistrationDataInUse,
            ),
            operator: 'contains',
            value: recruitmentStatus,
        })
    }

    if (spokenLanguages && spokenLanguages.length) {
        filters.push({
            field: formatField('spokenLanguages', isRegistrationDataInUse),
            operator: 'contains-all',
            value: spokenLanguages,
        })
    }

    //TODO fix issue that does not allow isRegistrationDataInUse to be true if none of the previous conditionals are triggered
    events.forEach(({ event, statuses }) => {
        if (statuses?.length) {
            if (isRegistrationDataInUse) {
                filters.push({
                    field: 'status',
                    operator: 'contains',
                    value: statuses,
                })
            } else {
                filters.push({
                    field: 'registrations',
                    operator: 'array-element-match',
                    value: {
                        event,
                        status: {
                            $in: statuses,
                        },
                    },
                })
            }
        } else {
            filters.push({
                field: 'registrations.event',
                operator: '==',
                value: event,
            })
            // }
        }
    })

    skills.forEach(({ skill, levels }) => {
        if (levels.length) {
            filters.push({
                field: 'answers.skills',
                operator: 'array-element-match',
                value: {
                    skill,
                    level: {
                        $in: levels.map(level => parseInt(level)),
                    },
                },
            })
        } else {
            filters.push({
                field: 'answers.skills.skill',
                operator: '==',
                value: skill,
            })
        }
    })

    roles.forEach(({ role, years }) => {
        if (years.length) {
            filters.push({
                field: 'answers.roles',
                operator: 'array-element-match',
                value: {
                    role,
                    years: {
                        $in: years.map(year => parseInt(year)),
                    },
                },
            })
        } else {
            filters.push({
                field: 'answers.roles.role',
                operator: '==',
                value: role,
            })
        }
    })

    return filters
}
