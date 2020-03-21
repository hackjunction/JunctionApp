const roles_dev = require('../data/roles-dev.json')
const roles_design = require('../data/roles-design.json')
const roles_biz = require('../data/roles-biz.json')
const roles_other = require('../data/roles-other.json')

const categories = [
    {
        id: 'dev-and-engineering',
        label: 'Dev & Engineering',
        items: roles_dev,
    },
    {
        id: 'design-and-creative',
        label: 'Design & Creative',
        items: roles_design,
    },
    {
        id: 'business-and-comms',
        label: 'Business & Comms',
        items: roles_biz,
    },
    {
        id: 'other',
        label: 'Other',
        items: roles_other,
    },
]

const experienceLevels = {
    1: {
        label: 'Under 1 year',
    },
    2: {
        label: '1-2 years',
    },
    3: {
        label: '3-4 years',
    },
    4: {
        label: '5-7 years',
    },
    5: {
        label: '8+ years',
    },
}

const Roles = {}

Roles.categories = categories
Roles.items = categories.reduce((res, category) => {
    res = res.concat(category.items)
    return res
}, [])
Roles.experienceLevelArray = Object.keys(experienceLevels).map(idx => ({
    value: idx,
    ...experienceLevels[idx],
}))
Roles.experienceLevelsLabelsArray = Object.keys(experienceLevels).map(
    idx => experienceLevels[idx].label
)
Roles.getLabelForExperienceLevel = level =>
    experienceLevels.hasOwnProperty(level) ? experienceLevels[level].label : ''
module.exports = Roles
