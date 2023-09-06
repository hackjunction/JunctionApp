const Countries = require('./countries')
const Genders = require('./genders')
const Industries = require('./industries')
const Languages = require('./languages')
const Roles = require('./roles')
const Skills = require('./skills')
const Themes = require('./themes')
const RegistrationStatuses = require('./registration-statuses')
const Misc = require('./misc')
const Currencies = require('./currencies')
const Timezones = require('../data/timezones')
const ParticipationTypes = require('./participation-types')
const currentYear = new Date().getFullYear()

const SelectOptions = {
    PARTICIPATION_TYPES: ParticipationTypes.map(({ label, id }) => ({
        label,
        value: id,
    })),
    COUNTRIES: Countries.asArrayOfName.map(country => ({
        label: country,
        value: country,
    })),
    COUNTRY_CODES: Countries.asArray.map(country => ({
        label: country.en_short_name + ' (' + country.phone_code + ')',
        value: country.phone_code,
    })),
    CURRENCIES: Currencies.asArray.map(currency => ({
        label: currency.name,
        value: currency.code,
    })),
    NATIONALITIES: Countries.asArrayOfNationalities.map(nationality => ({
        label: nationality,
        value: nationality,
    })),
    NUM_HACKATHONS: Misc.numHackathonOptions.asArray,
    DIETARY_RESTRICTIONS: Misc.dietaryRestrictions.map(item => ({
        label: item,
        value: item,
    })),
    GENDERS: Genders.map(gender => ({
        label: gender,
        value: gender,
    })),
    INDUSTRIES: Industries.industries.map(industry => ({
        label: industry,
        value: industry,
    })),
    LANGUAGES: Languages.asArrayOfNames.map(language => ({
        label: language,
        value: language,
    })),
    ROLES: Roles.items.map(role => ({
        label: role,
        value: role,
    })),
    SKILLS: Skills.items.map(skill => ({
        label: skill,
        value: skill,
    })),
    SKILLS_NO_ABSTRACT: Skills.itemsWithoutAbstract.map(skill => ({
        label: skill,
        value: skill,
    })),
    THEMES: Themes.themes.map(theme => ({
        label: theme,
        value: theme,
    })),
    T_SHIRT_SIZES: Misc.tShirtSizes.map(size => ({
        label: size,
        value: size,
    })),
    TIMEZONES: Timezones.map(tz => ({
        label: tz,
        value: tz,
    })),
    STATUSES: RegistrationStatuses.asArray.map(status => ({
        label: status.label,
        value: status.id,
    })),
    DAYS: Array.apply(null, Array(31)).map((val, index) => ({
        label: index + 1,
        value: index + 1,
    })),
    MONTHS: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ].map((month, index) => ({
        label: month,
        value: index + 1,
    })),
    YEARS: Array.apply(null, Array(120)).map((val, index) => ({
        value: currentYear - index,
        label: currentYear - index,
    })),
    YEARS_FUTURE: Array.apply(null, Array(120)).map((val, index) => ({
        value: currentYear + 15 - index,
        label: currentYear + 15 - index,
    })),
}

module.exports = SelectOptions
