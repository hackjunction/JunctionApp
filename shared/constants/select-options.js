const Countries = require('./countries');
const Genders = require('./genders');
const Industries = require('./industries');
const Languages = require('./languages');
const Roles = require('./roles');
const Skills = require('./skills');
const Themes = require('./themes');
const RegistrationStatuses = require('./registration-statuses');

const currentYear = new Date().getFullYear();

const SelectOptions = {
    COUNTRIES: Countries.asArrayOfName.map(country => ({
        label: country,
        value: country
    })),
    COUNTRY_CODES: Countries.asArray.map(country => ({
        label: country.en_short_name,
        value: country.phone_code
    })),
    NATIONALITIES: Countries.asArrayOfNationalities.map(nationality => ({
        label: nationality,
        value: nationality
    })),
    GENDERS: Genders.map(gender => ({
        label: gender,
        value: gender
    })),
    INDUSTRIES: Industries.industries.map(industry => ({
        label: industry,
        value: industry
    })),
    LANGUAGES: Languages.asArrayOfNames.map(language => ({
        label: language,
        value: language
    })),
    ROLES: Roles.items.map(role => ({
        label: role,
        value: role
    })),
    SKILLS: Skills.items.map(skill => ({
        label: skill,
        value: skill
    })),
    THEMES: Themes.themes.map(theme => ({
        label: theme,
        value: theme
    })),
    STATUSES: RegistrationStatuses.asArray.map(status => ({
        label: status.label,
        value: status.id
    })),
    DAYS: Array.apply(null, Array(31)).map((val, index) => ({
        label: index + 1,
        value: index + 1
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
        'December'
    ].map((month, index) => ({
        label: month,
        value: index + 1
    })),
    YEARS: Array.apply(null, Array(120)).map((val, index) => ({
        value: currentYear - index,
        label: currentYear - index
    }))
};

module.exports = SelectOptions;
