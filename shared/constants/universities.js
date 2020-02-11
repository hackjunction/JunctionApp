const universities = require('../data/universities.json')

const Universities = {}

const groupByAlpha2Code = () => {
    const grouped = {}

    universities.forEach(uni => {
        const alpha2 = uni.alpha_two_code
        if (grouped.hasOwnProperty(uni.alpha_two_code)) {
            grouped[alpha2].push(uni)
        } else {
            grouped[alpha2] = [uni]
        }
    })

    return grouped
}

Universities.byAlpha2Code = groupByAlpha2Code()
Universities.getByAlpha2Code = code => {
    if (code && Universities.byAlpha2Code.hasOwnProperty(code)) {
        return Universities.byAlpha2Code[code]
    }
    return []
}

module.exports = Universities
