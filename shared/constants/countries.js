const countries = require('../data/countries.json')

const byField = field => {
    const map = {}

    countries.forEach(country => {
        map[country[field]] = country
    })

    return map
}

const Countries = {}

Countries.byAlpha2Code = byField('alpha_2_code')
Countries.byAlpha3Code = byField('alpha_3_code')
Countries.byName = byField('en_short_name')
Countries.byNationality = byField('nationality')
Countries.asArray = countries
Countries.asArrayOfPhoneCodes = countries.map(c => c.phone_code)
Countries.asArrayOfAlpha2Codes = Object.keys(Countries.byAlpha2Code)
Countries.asArrayOfAlpha3Codes = Object.keys(Countries.byAlpha3Code)
Countries.asArrayOfName = Object.keys(Countries.byName)
Countries.asArrayOfNationalities = Object.keys(Countries.byNationality)

Countries.alpha2CodeFromName = name => {
    if (Countries.byName.hasOwnProperty(name)) {
        return Countries.byName[name].alpha_2_code
    }
    return null
}

module.exports = Countries
