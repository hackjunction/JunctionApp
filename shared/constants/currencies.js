const currencies = require('../data/currencies.json')

const Currencies = {}

Currencies.asArray = Object.keys(currencies).map(key => currencies[key])
Currencies.keys = Object.keys(currencies)

module.exports = Currencies
