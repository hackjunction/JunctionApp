const moment = require('moment-timezone')

module.exports = {
    formatDateInterval: (start, end) => {
        const mom1 = moment(start)
        const mom2 = moment(end)

        if (mom1.month() === mom2.month()) {
            if (mom1.date() === mom2.date()) {
                return mom1.format('MMMM D, YYYY')
            }
            return `${mom1.format('MMMM D')}-${mom2.format('D, YYYY')}`
        }
        if (mom1.year() === mom2.year()) {
            return `${mom1.format('MMMM D')} - ${mom2.format('MMMM D, YYYY')}`
        }
        return `${mom1.format('MMMM D, YYYY')} - ${mom2.format('MMMM D, YYYY')}`
    },
}
