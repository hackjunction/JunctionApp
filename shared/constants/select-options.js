const Countries = require('./countries');
const Genders = require('./genders');
const Industries = require('./industries');
const Languages = require('./languages');
const Roles = require('./roles');
const Skills = require('./skills');
const Themes = require('./themes');

const SelectOptions = {
    COUNTRIES: Countries.asArrayOfName.map(country => ({
        label: country,
        value: country
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
    }))
};

module.exports = SelectOptions;
