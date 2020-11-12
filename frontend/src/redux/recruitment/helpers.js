const initialEvents = [
    {
        statuses: ['checkedIn'],
    },
]

export const buildFilterArray = ({
    skills = [],
    roles = [],
    countryOfResidence = [],
    spokenLanguages = [],
    recruitmentStatus = [],
    relocationStatus = [],
    textSearch = '',
}) => {
    const filters = []

    const events = initialEvents

    if (textSearch.length > 0) {
        return textSearch
    }

    if (countryOfResidence && countryOfResidence.length) {
        filters.push({
            field: 'countryOfResidence',
            operator: 'contains',
            value: countryOfResidence,
        })
    }

    if (relocationStatus && relocationStatus.length) {
        filters.push({
            field: 'recruitmentOptions.relocation',
            operator: 'contains',
            value: relocationStatus,
        })
    }

    if (recruitmentStatus && recruitmentStatus.length) {
        filters.push({
            field: 'recruitmentOptions.status',
            operator: 'contains',
            value: recruitmentStatus,
        })
    }

    if (spokenLanguages && spokenLanguages.length) {
        filters.push({
            field: 'spokenLanguages',
            operator: 'contains-all',
            value: spokenLanguages,
        })
    }

    events.forEach(({ event, statuses }) => {
        if (statuses?.length) {
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
        } else {
            filters.push({
                field: 'registrations.event',
                operator: '==',
                value: event,
            })
        }
    })

    skills.forEach(({ skill, levels }) => {
        if (levels.length) {
            filters.push({
                field: 'skills',
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
                field: 'skills.skill',
                operator: '==',
                value: skill,
            })
        }
    })

    roles.forEach(({ role, years }) => {
        if (years.length) {
            filters.push({
                field: 'roles',
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
                field: 'roles.role',
                operator: '==',
                value: role,
            })
        }
    })

    return filters
}
