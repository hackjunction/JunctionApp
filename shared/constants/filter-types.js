const filterTypes = {
    IS_EMPTY: {
        id: 'IS_EMPTY',
        label: 'Is empty',
    },
    NOT_EMPTY: {
        id: 'NOT_EMPTY',
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
        label: 'Is less than',
        helper: 'Or length is less than'
    },
    NOT_LESS_THAN: {
        id: 'NOT_LESS_THAN',
        label: "Is at least",
        helper: 'Or length is at least'
    },
    MORE_THAN: {
        id: 'MORE_THAN',
        label: 'Is more than',
        helper: 'Or length is more than'
    },
    NOT_MORE_THAN: {
        id: 'NOT_MORE_THAN',
        label: "Is at most",
        helper: 'Or length is at most'
    },
    BOOLEAN_TRUE: {
        id: 'BOOLEAN_TRUE',
        label: 'Yes'
    },
    BOOLEAN_FALSE: {
        id: 'BOOLEAN_FALSE',
        label: 'No',
        helper: 'Or unanswered'
    }
};

const stringFilterTypes = [
    filterTypes.IS_EMPTY.id,
    filterTypes.NOT_EMPTY.id,
    filterTypes.EQUALS.id,
    filterTypes.NOT_EQUALS.id,
    filterTypes.CONTAINS.id,
    filterTypes.NOT_CONTAINS.id,
    filterTypes.LESS_THAN.id,
    filterTypes.NOT_LESS_THAN.id,
    filterTypes.MORE_THAN.id,
    filterTypes.NOT_MORE_THAN.id
];

const arrayFilterTypes = [
    filterTypes.IS_EMPTY.id,
    filterTypes.NOT_EMPTY.id,
    filterTypes.CONTAINS.id,
    filterTypes.NOT_CONTAINS.id,
    filterTypes.LESS_THAN.id,
    filterTypes.NOT_LESS_THAN.id,
    filterTypes.MORE_THAN.id,
    filterTypes.NOT_MORE_THAN.id
];

const numberFilterTypes = [
    filterTypes.IS_EMPTY.id,
    filterTypes.NOT_EMPTY.id,
    filterTypes.EQUALS.id,
    filterTypes.NOT_EQUALS.id,
    filterTypes.LESS_THAN.id,
    filterTypes.NOT_LESS_THAN.id,
    filterTypes.MORE_THAN.id,
    filterTypes.NOT_MORE_THAN.id
];

const booleanFilterTypes = [filterTypes.BOOLEAN_TRUE, filterTypes.BOOLEAN_FALSE];

const STRING = 'STRING';
const ARRAY = 'ARRAY';
const NUMBER = 'NUMBER';
const BOOLEAN = 'BOOLEAN';
const DATE = 'DATE';

module.exports = {
    filterTypes,
    filterTypesForType: {
        STRING: stringFilterTypes,
        ARRAY: arrayFilterTypes,
        NUMBER: numberFilterTypes,
        BOOLEAN: booleanFilterTypes,
        DATE: []
    },
    STRING,
    ARRAY,
    NUMBER,
    BOOLEAN,
    DATE
};
