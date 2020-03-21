const languages = require('../data/languages.json')

const Languages = {}

Languages.asArrayOfIds = Object.keys(languages)
Languages.asArray = Languages.asArrayOfIds.reduce((result, languageId) => {
    result.push(languages[languageId])
    return result
}, [])
Languages.asArrayOfNames = Languages.asArray.map(lang => lang.name)

module.exports = Languages
