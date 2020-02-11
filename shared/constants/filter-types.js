const filterTypes = {
    IS_EMPTY: {
        id: 'IS_EMPTY',
        label: 'Is empty',
    },
    NOT_EMPTY: {
        id: 'NOT_EMPTY',
        label: "Isn't empty",
    },
    EQUALS: {
        id: 'EQUALS',
        label: 'Is equal to',
    },
    NOT_EQUALS: {
        id: 'NOT_EQUALS',
        label: "Isn't equal to",
    },
    ONE_OF: {
        id: 'ONE_OF',
        label: 'Is one of',
    },
    NOT_ONE_OF: {
        id: 'NOT_ONE_OF',
        label: "Isn't one of ",
    },
    CONTAINS: {
        id: 'CONTAINS',
        label: 'Contains',
    },
    NOT_CONTAINS: {
        id: 'NOT_CONTAINS',
        label: "Doesn't contain",
    },
    CONTAINS_ONE_OF: {
        id: 'CONTAINS_ONE_OF',
        label: 'Contains one of',
    },
    NOT_CONTAINS_ONE_OF: {
        id: 'NOT_CONTAINS_ONE_OF',
        label: "Doesn't contain one of",
    },
    LESS_THAN: {
        id: 'LESS_THAN',
        label: 'Is less than',
        helper: 'Or length is less than',
    },
    NOT_LESS_THAN: {
        id: 'NOT_LESS_THAN',
        label: 'Is at least',
        helper: 'Or length is at least',
    },
    MORE_THAN: {
        id: 'MORE_THAN',
        label: 'Is more than',
        helper: 'Or length is more than',
    },
    NOT_MORE_THAN: {
        id: 'NOT_MORE_THAN',
        label: 'Is at most',
        helper: 'Or length is at most',
    },
    BOOLEAN_TRUE: {
        id: 'BOOLEAN_TRUE',
        label: 'Yes',
    },
    BOOLEAN_FALSE: {
        id: 'BOOLEAN_FALSE',
        label: 'No',
        helper: 'Or unanswered',
    },
}

const stringFilterTypes = [
    filterTypes.IS_EMPTY.id,
    filterTypes.NOT_EMPTY.id,
    filterTypes.EQUALS.id,
    filterTypes.NOT_EQUALS.id,
    filterTypes.CONTAINS.id,
    filterTypes.NOT_CONTAINS.id,
    filterTypes.ONE_OF.id,
    filterTypes.NOT_ONE_OF.id,
    filterTypes.LESS_THAN.id,
    filterTypes.NOT_LESS_THAN.id,
    filterTypes.MORE_THAN.id,
    filterTypes.NOT_MORE_THAN.id,
]

const arrayFilterTypes = [
    filterTypes.IS_EMPTY.id,
    filterTypes.NOT_EMPTY.id,
    filterTypes.CONTAINS.id,
    filterTypes.NOT_CONTAINS.id,
    filterTypes.LESS_THAN.id,
    filterTypes.NOT_LESS_THAN.id,
    filterTypes.MORE_THAN.id,
    filterTypes.NOT_MORE_THAN.id,
    filterTypes.CONTAINS_ONE_OF.id,
    filterTypes.NOT_CONTAINS_ONE_OF.id,
]

const numberFilterTypes = [
    filterTypes.IS_EMPTY.id,
    filterTypes.NOT_EMPTY.id,
    filterTypes.EQUALS.id,
    filterTypes.NOT_EQUALS.id,
    filterTypes.LESS_THAN.id,
    filterTypes.NOT_LESS_THAN.id,
    filterTypes.MORE_THAN.id,
    filterTypes.NOT_MORE_THAN.id,
]

const objectFilterTypes = [filterTypes.IS_EMPTY.id, filterTypes.NOT_EMPTY.id]
const booleanFilterTypes = [
    filterTypes.BOOLEAN_TRUE.id,
    filterTypes.BOOLEAN_FALSE.id,
]

const STRING = 'STRING'
const ARRAY = 'ARRAY'
const NUMBER = 'NUMBER'
const BOOLEAN = 'BOOLEAN'
const DATE = 'DATE'
const OBJECT = 'OBJECT'

module.exports = {
    filterTypes,
    filterTypesForType: {
        STRING: stringFilterTypes,
        ARRAY: arrayFilterTypes,
        NUMBER: numberFilterTypes,
        BOOLEAN: booleanFilterTypes,
        OBJECT: objectFilterTypes,
        DATE: [],
    },
    STRING,
    ARRAY,
    NUMBER,
    BOOLEAN,
    DATE,
    OBJECT,
}
