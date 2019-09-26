const FilterTypes = require('./filter-types');

const filterTypes = {
    IS_EMPTY: {
        id: 'IS_EMPTY',
        label: 'Is empty'
    },
    NOT_EMPTY: {
        id: 'IS_NOT_EMPTY',
        label: "Isn't empty"
    },
    EQUALS: {
        id: 'EQUALS',
        label: 'Is equal to'
    },
    NOT_EQUALS: {
        id: 'NOT_EQUALS',
        label: "Isn't equal to"
    },
    CONTAINS: {
        id: 'CONTAINS',
        label: 'Contains'
    },
    NOT_CONTAINS: {
        id: 'NOT_CONTAINS',
        label: "Doesn't contain"
    },
    LESS_THAN: {
        id: 'LESS_THAN',
        label: 'Is less than'
    },
    NOT_LESS_THAN: {
        id: 'NOT_LESS_THAN',
        label: "Isn't less than"
    },
    MORE_THAN: {
        id: 'MORE_THAN',
        label: 'Is more than'
    },
    NOT_MORE_THAN: {
        id: 'NOT_MORE_THAN',
        label: "Isn't more than"
    }
};

const FieldTypes = {
    SHORT_TEXT: {
        id: 'SHORT_TEXT'
    },
    LONG_TEXT: {
        id: 'LONG_TEXT'
    },
    BOOLEAN: {
        id: 'BOOLEAN'
    },
    EMAIL: {
        id: 'EMAIL'
    },
    PHONE_NUMBER: {
        id: 'PHONE_NUMBER'
    },
    DATE: {
        id: 'DATE'
    },
    GENDER: {
        id: 'GENDER'
    },
    NATIONALITY: {
        id: 'NATIONALITY'
    },
    LANGUAGES: {
        id: 'LANGUAGES'
    },
    COUNTRY: {
        id: 'COUNTRY'
    },
    ROLES: {
        id: 'ROLES'
    },
    SKILLS: {
        id: 'SKILLS'
    },
    INDUSTRIES: {
        id: 'INDUSTRIES'
    },
    THEMES: {
        id: 'THEMES'
    },
    EDUCATION: {
        id: 'EDUCATION'
    },
    SMALL_NUMBER: {
        id: 'SMALL_NUMBER'
    },
    NUM_HACKATHONS: {
        id: 'NUM_HACKATHONS'
    },
    T_SHIRT_SIZE: {
        id: 'T_SHIRT_SIZE'
    },
    URL: {
        id: 'URL'
    },
    DIETARY_RESTRICTIONS: {
        id: 'DIETARY_RESTRICTIONS'
    },
    TEAM_OPTIONS: {
        id: 'TEAM_OPTIONS'
    },
    RECRUITMENT_OPTIONS: {
        id: 'RECRUITMENT_OPTIONS'
    }
};

module.exports = FieldTypes;
