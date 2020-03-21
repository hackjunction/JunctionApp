/* eslint-disable */

const assert = require('assert')
const filterFunctions = require('../helpers/filterFunctions.js')

const EMPTY_STRING = ''
const STRING = 'Hello world'
const EMPTY_ARRAY = []
const ARRAY = ['one', 'two', 'three']
const EMPTY_OBJECT = {}
const OBJECT = {
    foo: 'bar',
}
const ZERO_NUMBER = 0
const NUMBER = 777
const STRING_ZERO_NUMBER = '0'
const STRING_NUMBER = '777'

const testObject = {
    emptyString: EMPTY_STRING,
    string: STRING,
    stringPadded: STRING + '   ',
    emptyObject: EMPTY_OBJECT,
    object: OBJECT,
    emptyArray: EMPTY_ARRAY,
    array: ARRAY,
    zeroNumber: ZERO_NUMBER,
    stringZeroNumber: STRING_ZERO_NUMBER,
    number: NUMBER,
    stringNumber: STRING_NUMBER,
    stringNumberPadded: STRING_NUMBER + '  ',
}

const nestedTestObject = {
    nested: testObject,
}

describe('Filter functions', function() {
    describe('isEmpty', function() {
        it('should return true when value is empty string', function() {
            const value = filterFunctions.isEmpty(testObject, 'emptyString')
            assert.equal(value, true)
        })

        it('should return true when value is nested empty string', function() {
            const value = filterFunctions.isEmpty(
                nestedTestObject,
                'nested.emptyString'
            )
            assert.equal(value, true)
        })

        it('should return true when value is empty array', function() {
            const value = filterFunctions.isEmpty(testObject, 'emptyArray')
            assert.equal(value, true)
        })

        it('should return true when value is nested empty array', function() {
            const value = filterFunctions.isEmpty(
                nestedTestObject,
                'nested.emptyArray'
            )
            assert.equal(value, true)
        })

        it('should return true when value is empty object', function() {
            const value = filterFunctions.isEmpty(testObject, 'emptyObject')
            assert.equal(value, true)
        })

        it('should return true when value is nested empty object', function() {
            const value = filterFunctions.isEmpty(
                nestedTestObject,
                'nested.emptyObject'
            )
            assert.equal(value, true)
        })

        it('should return true when value is undefined', function() {
            const value = filterFunctions.isEmpty(testObject, 'nonExistingPath')
            assert.equal(value, true)
        })

        it('should return true when value is nested undefined', function() {
            const value = filterFunctions.isEmpty(
                nestedTestObject,
                'nested.nonExistingPath'
            )
            assert.equal(value, true)
        })

        it('should return false when value is non-empty string', function() {
            const value = filterFunctions.isEmpty(testObject, 'string')
            assert.equal(value, false)
        })

        it('should return false when value is nested non-empty string', function() {
            const value = filterFunctions.isEmpty(
                nestedTestObject,
                'nested.string'
            )
            assert.equal(value, false)
        })

        it('should return false when value is non-empty array', function() {
            const value = filterFunctions.isEmpty(testObject, 'array')
            assert.equal(value, false)
        })

        it('should return false when value is nested non-empty array', function() {
            const value = filterFunctions.isEmpty(
                nestedTestObject,
                'nested.array'
            )
            assert.equal(value, false)
        })

        it('should return false when value is non-empty object', function() {
            const value = filterFunctions.isEmpty(testObject, 'object')
            assert.equal(value, false)
        })

        it('should return false when value is nested non-empty object', function() {
            const value = filterFunctions.isEmpty(
                nestedTestObject,
                'nested.object'
            )
            assert.equal(value, false)
        })

        it('should return false when value is zero', function() {
            const value = filterFunctions.isEmpty(testObject, 'zeroNumber')
            assert.equal(value, false)
        })

        it('should return false when value is nested zero', function() {
            const value = filterFunctions.isEmpty(
                nestedTestObject,
                'nested.zeroNumber'
            )
            assert.equal(value, false)
        })

        it('should return false when value is non-zero number', function() {
            const value = filterFunctions.isEmpty(testObject, 'number')
            assert.equal(value, false)
        })

        it('should return false when value is nested non-zero number', function() {
            const value = filterFunctions.isEmpty(
                nestedTestObject,
                'nested.number'
            )
            assert.equal(value, false)
        })
    })

    describe('isEqualTo', function() {
        describe('strings', function() {
            it('should return true when comparing two empty strings', function() {
                const value = filterFunctions.isEqualTo(
                    testObject,
                    'emptyString',
                    ''
                )
                assert.equal(value, true)
            })

            it('should return true when comparing two matching strings', function() {
                const value = filterFunctions.isEqualTo(
                    testObject,
                    'string',
                    STRING
                )
                assert.equal(value, true)
            })
            it('should return true when comparing two matching strings with extra whitespace', function() {
                const value = filterFunctions.isEqualTo(
                    testObject,
                    'stringPadded',
                    '  ' + STRING
                )
                assert.equal(value, true)
            })
            it('should return false when comparing two non-matching strings', function() {
                const value = filterFunctions.isEqualTo(
                    testObject,
                    'string',
                    'different string'
                )
                assert.equal(value, false)
            })
            it('should return false when comparing empty string to non-empty string', function() {
                const value = filterFunctions.isEqualTo(
                    testObject,
                    'emptyString',
                    STRING
                )
                assert.equal(value, false)
            })
            it('should return false when comparing non-empty string to arbitrary number', function() {
                const value = filterFunctions.isEqualTo(
                    testObject,
                    'string',
                    NUMBER
                )
                assert.equal(value, false)
            })
        })

        describe('numbers', function() {
            it('should return true when comparing two zeros', function() {
                const value = filterFunctions.isEqualTo(
                    testObject,
                    'zeroNumber',
                    ZERO_NUMBER
                )
                assert.equal(value, true)
            })
            it('should return true when comparing two arbitrary matching numbers', function() {
                const value = filterFunctions.isEqualTo(
                    testObject,
                    'number',
                    NUMBER
                )
                assert.equal(value, true)
            })
            it('should reutrn false when comparing two arbitrary non-matching numbers', function() {
                const value = filterFunctions.isEqualTo(
                    testObject,
                    'number',
                    NUMBER + Math.floor(Math.random() * 1000)
                )
                assert.equal(value, false)
            })
            it('should return true when comparing string number to matching number', function() {
                const value = filterFunctions.isEqualTo(
                    testObject,
                    'stringNumber',
                    NUMBER
                )
                assert.equal(value, true)
            })
            it('should return false when comparing string number to non-matching number', function() {
                const value = filterFunctions.isEqualTo(
                    testObject,
                    'stringNumber',
                    NUMBER + 1
                )
                assert.equal(value, false)
            })
            it('should return true when comparing string number with whitespace to matching number', function() {
                const value = filterFunctions.isEqualTo(
                    testObject,
                    'stringNumberPadded',
                    NUMBER
                )
                assert.equal(value, true)
            })
        })
        describe('arrays', function() {
            it('should return true when comparing two empty arrays', function() {
                const value = filterFunctions.isEqualTo(
                    testObject,
                    'emptyArray',
                    []
                )
                assert.equal(value, true)
            })
            it('should return true when comparing two non-empty arrays', function() {
                const value = filterFunctions.isEqualTo(
                    testObject,
                    'array',
                    ARRAY
                )
                assert.equal(value, true)
            })
            it('should return false when comparing two non-matching arrays', function() {
                const value = filterFunctions.isEqualTo(
                    testObject,
                    'array',
                    ARRAY.concat('foo')
                )
                assert.equal(value, false)
            })
            it('should return false when comparing empty array to empty object', function() {
                const value = filterFunctions.isEqualTo(
                    testObject,
                    'emptyArray',
                    {}
                )
                assert.equal(value, false)
            })
        })
        describe('objects', function() {
            it('should return true when comparing two empty objects', function() {
                const value = filterFunctions.isEqualTo(
                    testObject,
                    'emptyObject',
                    {}
                )
                assert.equal(value, true)
            })
            it('should return true when comparing two matching non-empty objects', function() {
                const value = filterFunctions.isEqualTo(
                    testObject,
                    'object',
                    JSON.parse(JSON.stringify(OBJECT))
                )
                assert.equal(value, true)
            })
            it('should return false when comparing two non-matching objects', function() {
                const value = filterFunctions.isEqualTo(testObject, 'object', {
                    ...OBJECT,
                    baz: 'bizz',
                })
                assert.equal(value, false)
            })
        })
        describe('undefined', function() {
            it('should return false when comparing undefined to anything, even undefined', function() {
                const values = [
                    filterFunctions.isEqualTo(
                        testObject,
                        'some.undefined.path',
                        []
                    ),
                    filterFunctions.isEqualTo(
                        testObject,
                        'some.undefined.path',
                        {}
                    ),
                    filterFunctions.isEqualTo(
                        testObject,
                        'some.undefined.path',
                        OBJECT
                    ),
                    filterFunctions.isEqualTo(
                        testObject,
                        'some.undefined.path',
                        NUMBER
                    ),
                    filterFunctions.isEqualTo(
                        testObject,
                        'some.undefined.path',
                        ZERO_NUMBER
                    ),
                    filterFunctions.isEqualTo(
                        testObject,
                        'some.undefined.path',
                        STRING
                    ),
                    filterFunctions.isEqualTo(
                        testObject,
                        'some.undefined.path',
                        STRING_ZERO_NUMBER
                    ),
                    filterFunctions.isEqualTo(
                        testObject,
                        'some.undefined.path'
                    ),
                ]
                assert.equal(values.indexOf(true), -1)
            })
        })
    })
    describe('contains', function() {
        describe('strings', function() {
            it('should return true when a string value contains the substring, case-insensitive', function() {
                const values = [
                    filterFunctions.contains(testObject, 'string', 'hello'),
                    filterFunctions.contains(testObject, 'string', 'HeLLo'),
                ]

                assert.equal(values.indexOf(false), -1)
            })
            it('should return true when comparing a string value to an empty string', function() {
                const value = filterFunctions.contains(testObject, 'string', '')
                assert.equal(value, true)
            })
            it('should return false when comparing a string value to a non-matching string', function() {
                const value = filterFunctions.contains(
                    testObject,
                    'string',
                    'something not matching'
                )
                assert.equal(value, false)
            })
            it('should return false when comparing a string value to a number', function() {
                const value = filterFunctions.contains(
                    testObject,
                    'string',
                    NUMBER
                )
                assert.equal(value, false)
            })
        })
        describe('arrays', function() {
            it('should return true when the source array contains the target value', function() {
                const values = [
                    filterFunctions.contains(testObject, 'array', 'one'),
                    filterFunctions.contains(testObject, 'array', 'two'),
                ]
                assert.equal(values.indexOf(false), -1)
            })
            it('should return false when the source array does not contain the target value', function() {
                const value = filterFunctions.contains(
                    testObject,
                    'array',
                    'four'
                )
                assert.equal(value, false)
            })
            it('should return false when the source array is empty', function() {
                const values = [
                    filterFunctions.contains(testObject, 'emptyArray', ''),
                    filterFunctions.contains(testObject, 'emptyArray', 'two'),
                ]
                assert.equal(values.indexOf(true), -1)
            })
        })
        describe('others', function() {
            it('should return false when the source array is not an array', function() {
                const values = [
                    filterFunctions.contains(testObject, 'object', ''),
                    filterFunctions.contains(testObject, 'object', 'foo'),
                    filterFunctions.contains(testObject, 'number', ''),
                    filterFunctions.contains(testObject, 'number', NUMBER),
                    filterFunctions.contains(
                        testObject,
                        'something.undefined',
                        ''
                    ),
                    filterFunctions.contains(
                        testObject,
                        'something.undefined',
                        undefined
                    ),
                ]
                assert.equal(values.indexOf(true), -1)
            })
        })
    })
    describe('isGte / isLte', function() {
        describe('numbers', function() {
            it('isGte should return true when the source number is equal', function() {
                const value = filterFunctions.isGte(
                    testObject,
                    'number',
                    NUMBER
                )
                assert.equal(value, true)
            })

            it('isGte should return true when the source number is larger than the target number', function() {
                const value = filterFunctions.isGte(
                    testObject,
                    'number',
                    NUMBER - 1
                )
                assert.equal(value, true)
            })

            it('isGte should return false when the source number is smaller than the target number', function() {
                const value = filterFunctions.isGte(
                    testObject,
                    'number',
                    NUMBER + 1
                )
                assert.equal(value, false)
            })

            it('isLte should return true when the source number is equal', function() {
                const value = filterFunctions.isLte(
                    testObject,
                    'number',
                    NUMBER
                )
                assert.equal(value, true)
            })

            it('isLte should return true when the source number is smaller than the target number', function() {
                const value = filterFunctions.isLte(
                    testObject,
                    'number',
                    NUMBER + 1
                )
                assert.equal(value, true)
            })

            it('isLte should return false when the source number is larger than the target number', function() {
                const value = filterFunctions.isLte(
                    testObject,
                    'number',
                    NUMBER - 1
                )
                assert.equal(value, false)
            })
        })
        describe('arrays', function() {
            it('isGte / isLte should work with arrays, and compare their length to the target number', function() {
                const passingValues = [
                    filterFunctions.isGte(testObject, 'array', ARRAY.length),
                    filterFunctions.isGte(
                        testObject,
                        'array',
                        ARRAY.length - 1
                    ),
                    filterFunctions.isGte(testObject, 'emptyArray', 0),
                    filterFunctions.isGte(testObject, 'array', '1'),
                    filterFunctions.isLte(testObject, 'array', ARRAY.length),
                    filterFunctions.isLte(
                        testObject,
                        'array',
                        ARRAY.length + 1
                    ),
                    filterFunctions.isLte(testObject, 'emptyArray', 0),
                    filterFunctions.isLte(testObject, 'emptyArray', 3),
                    filterFunctions.isLte(testObject, 'emptyArray', '0'),
                    filterFunctions.isLte(testObject, 'emptyArray', '7'),
                ]

                const failingValues = [
                    filterFunctions.isLte(
                        testObject,
                        'array',
                        ARRAY.length - 1
                    ),
                    filterFunctions.isGte(
                        testObject,
                        'array',
                        ARRAY.length + 1
                    ),
                    filterFunctions.isGte(testObject, 'array', 10),
                    filterFunctions.isGte(testObject, 'array', '10'),
                ]

                assert.equal(passingValues.indexOf(false), -1)
                assert.equal(failingValues.indexOf(true), -1)
            })
        })
        describe('strings', function() {
            it('isGte / isLte should work with strings, and compare their length to the target number', function() {
                const passingValues = [
                    filterFunctions.isGte(
                        testObject,
                        'string',
                        STRING.length - 1
                    ),
                    filterFunctions.isGte(testObject, 'string', STRING.length),
                    filterFunctions.isGte(testObject, 'emptyString', 0),
                    filterFunctions.isLte(
                        testObject,
                        'string',
                        STRING.length + 1
                    ),
                    filterFunctions.isLte(testObject, 'string', STRING.length),
                    filterFunctions.isLte(testObject, 'emptyString', 0),
                ]
                const failingValues = [
                    filterFunctions.isGte(
                        testObject,
                        'string',
                        STRING.length + 1
                    ),
                    filterFunctions.isLte(
                        testObject,
                        'string',
                        STRING.length - 1
                    ),
                ]

                assert.equal(passingValues.indexOf(false), -1)
                assert.equal(failingValues.indexOf(true), -1)
            })
        })
        describe('others', function() {
            it('both should return false when the source number is an object or undefined', function() {
                const values = [
                    filterFunctions.isGte(testObject, 'object', 0),
                    filterFunctions.isGte(testObject, 'object', 1),
                    filterFunctions.isGte(testObject, 'something.undefined', 0),
                ]
                assert.equal(values.indexOf(true), -1)
            })
            it('both should return false when the target value is not a number', function() {
                const values = [
                    filterFunctions.isGte(testObject, 'string', OBJECT),
                    filterFunctions.isLte(testObject, 'string', OBJECT),
                    filterFunctions.isGte(testObject, 'string', ARRAY),
                    filterFunctions.isLte(testObject, 'string', ARRAY),
                    filterFunctions.isGte(testObject, 'string'),
                    filterFunctions.isLte(testObject, 'string'),
                    filterFunctions.isGte(testObject, 'emptyString'),
                    filterFunctions.isLte(testObject, 'emptyString'),
                ]

                assert.equal(values.indexOf(true), -1)
            })
        })
    })
    describe('isOneOf', function() {
        it('should return false when target value is empty array', function() {
            const value = filterFunctions._isOneOf('something', [])
            assert.equal(value, false)
        })

        it('should return false when target value does not include the value', function() {
            const value = filterFunctions._isOneOf('something', [
                'other',
                'third thing',
            ])
            assert.equal(value, false)
        })

        it('should return true when target value includes the value', function() {
            const value = filterFunctions._isOneOf('something', [
                'something',
                'other',
            ])
            assert.equal(value, true)
        })
    })
    describe('containsOneOf', function() {
        it('should return false when value is not an array', function() {
            const value = filterFunctions._containsOneOf('foobar', [
                'some',
                'values',
            ])
            assert.equal(value, false)
        })
        it('should return false when target value is not an array', function() {
            const value = filterFunctions._containsOneOf(['foobar'], 'hello')
            assert.equal(value, false)
        })
        it('should return false when target value is empty array', function() {
            const value = filterFunctions._containsOneOf(['foobar'], [])
            assert.equal(value, false)
        })
        it('should return false when target value is not contained in value', function() {
            const value = filterFunctions._containsOneOf(['foo'], ['bar'])
            assert.equal(value, false)
        })
        it('should return true when target value is contained in value', function() {
            const value1 = filterFunctions._containsOneOf(
                ['foo', 'buzz'],
                ['foo', 'bar']
            )
            assert.equal(value1, true)
            const value2 = filterFunctions._containsOneOf(['fizz'], ['fizz'])
            assert.equal(value2, true)
            const value3 = filterFunctions._containsOneOf(
                ['fizz'],
                ['fizz', 'buzz']
            )
            assert.equal(value3, true)
        })
    })
})
