import moment from 'moment'

const MiscUtils = {
    /** Promisified setTimeout */
    sleep: async ms => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, ms)
        })
    },

    formatDateInterval: (start, end) => {
        const mom1 = moment(start)
        const mom2 = moment(end)

        if (mom1.month() === mom2.month()) {
            if (mom1.date() === mom2.date()) {
                return mom1.format('MMMM D, YYYY')
            }
            return mom1.format('MMMM D') + '-' + mom2.format('D, YYYY')
        } else {
            if (mom1.year() === mom2.year()) {
                return (
                    mom1.format('MMMM D') + ' - ' + mom2.format('MMMM D, YYYY')
                )
            } else {
                return (
                    mom1.format('MMMM D, YYYY') +
                    ' - ' +
                    mom2.format('MMMM D, YYYY')
                )
            }
        }
    },

    formatPDFDateInterval: (start, end) => {
        const mom1 = moment(start)
        const mom2 = moment(end)

        if (mom1.month() === mom2.month()) {
            if (mom1.date() === mom2.date()) {
                return mom1.format('MMM D, YYYY')
            }
            return mom1.format('MMM D') + '-' + mom2.format('D, YYYY')
        } else {
            if (mom1.year() === mom2.year()) {
                return mom1.format('MMM D') + ' - ' + mom2.format('MMM D, YYYY')
            } else {
                return (
                    mom1.format('MMM D, YYYY') +
                    ' - ' +
                    mom2.format('MMM D, YYYY')
                )
            }
        }
    },

    parseFormikErrors: errors => {
        return Object.keys(errors).flatMap(key => {
            if (typeof errors[key] === 'object') {
                return MiscUtils.parseFormikErrors(errors[key])
            } else {
                return errors[key]
            }
        })
    },

    ellipsize: (string, maxLength) => {
        if (string.length > maxLength) {
            return string.slice(0, maxLength) + '...'
        }
        return string
    },

    isHexaColor: value => {
        return (
            typeof value === 'string' &&
            value.length === 6 &&
            !isNaN(parseInt(value, 16))
        )
    },
}

export default MiscUtils
