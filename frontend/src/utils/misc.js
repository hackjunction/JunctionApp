import moment from 'moment';

const MiscUtils = {
    /** Promisified setTimeout */
    sleep: async ms => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    },

    formatDateInterval: (start, end) => {
        const mom1 = moment(start);
        const mom2 = moment(end);

        if (mom1.month() === mom2.month()) {
            if (mom1.date() === mom2.date()) {
                return mom1.format('MMMM D');
            }
            return mom1.format('MMMM D') + '-' + mom2.format('D');
        } else {
            return mom1.format('MMMM D') + ' - ' + mom2.format('MMMM D');
        }
    },

    parseFormikErrors: errors => {
        return Object.keys(errors).flatMap(key => {
            if (typeof errors[key] === 'object') {
                return MiscUtils.parseFormikErrors(errors[key]);
            } else {
                return errors[key];
            }
        });
    },

    isHexaColor: value => {
        return typeof value === 'string' && value.length === 6 && !isNaN(parseInt(value, 16));
    }
};

export default MiscUtils;
