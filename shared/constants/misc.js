const tShirtSizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL']

const numHackathonOptions = {
    0: {
        value: 0,
        label: 'Never attended a hackathon before',
    },
    1: {
        value: 1,
        label: 'One',
    },
    2: {
        value: 2,
        label: 'Two',
    },
    3: {
        value: 3,
        label: 'Three',
    },
    4: {
        value: 4,
        label: 'Four',
    },
    5: {
        value: 5,
        label: 'Five or more',
    },
}

const recruitmentStatuses = {
    'actively-looking': {
        id: 'actively-looking',
        label: 'Actively looking for a new job',
    },
    'up-for-discussions': {
        id: 'up-for-discussions',
        label: 'Up for discussions',
    },
    'not-interested': {
        id: 'not-interested',
        label: 'Not interested in recruitment',
    },
}

const relocationOptions = {
    'looking-for-change': {
        id: 'looking-for-change',
        label: 'Looking for a change of scenery',
    },
    'willing-to-relocate': {
        id: 'willing-to-relocate',
        label: 'Willing to relocate if a good opportunity arises',
    },
    'not-currently': {
        id: 'not-currently',
        label: 'Not willing to relocate for work',
    },
}

const travelGrantStatuses = {
    accepted: {
        id: 'accepted',
        label: 'Accepted',
    },
    rejected: {
        id: 'rejected',
        label: 'Rejected',
    },
    confirmed: {
        id: 'confirmed',
        label: 'Confirmed',
    },
}

const dietaryRestrictions = [
    'Vegan',
    'Vegetarian',
    'Halal',
    'Gluten-free',
    'No milk/dairy',
    'No eggs',
    'No nuts',
    'No peanuts',
    'No shellfish',
    'No fish',
    'No soybeans',
]

const Misc = {}

Misc.numHackathonOptions = {
    items: numHackathonOptions,
    asArray: Object.keys(numHackathonOptions).map(
        idx => numHackathonOptions[idx]
    ),
    getLabelForValue: value =>
        numHackathonOptions.hasOwnProperty(value)
            ? numHackathonOptions[value].label
            : '',
}

Misc.recruitmentStatuses = {
    items: recruitmentStatuses,
    asArray: Object.keys(recruitmentStatuses).map(
        id => recruitmentStatuses[id]
    ),
    getLabelForValue: value =>
        recruitmentStatuses.hasOwnProperty(value)
            ? recruitmentStatuses[value].label
            : '',
}

Misc.relocationOptions = {
    items: relocationOptions,
    asArray: Object.keys(relocationOptions).map(id => relocationOptions[id]),
    getLabelForValue: value =>
        relocationOptions.hasOwnProperty(value)
            ? relocationOptions[value].label
            : '',
}

Misc.travelGrantStatuses = {
    items: travelGrantStatuses,
    ids: Object.keys(travelGrantStatuses),
    asArray: Object.keys(travelGrantStatuses).map(
        id => travelGrantStatuses[id]
    ),
    getLabelForValue: value =>
        travelGrantStatuses.hasOwnProperty(value)
            ? travelGrantStatuses[value].label
            : '',
}

Misc.tShirtSizes = tShirtSizes
Misc.dietaryRestrictions = dietaryRestrictions

module.exports = Misc
