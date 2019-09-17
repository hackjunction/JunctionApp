import { difference, isEmpty } from 'lodash-es';

const filter = (registration, filter) => {
    switch (filter.type) {
        case 'status-equals': {
            return filter.value && filter.value.indexOf(registration.status) !== -1;
        }
        case 'status-nequals': {
            return !filter.value || filter.value.indexOf(registration.status) === -1;
        }
        case 'rating-exists': {
            return registration.rating && registration.rating > 0;
        }
        case 'rating-nexists': {
            return !registration.rating;
        }
        case 'rating-lte': {
            return registration.rating && registration.rating <= filter.value;
        }
        case 'rating-gte': {
            return registration.rating && registration.rating >= filter.value;
        }
        case 'has-tags': {
            return registration.tags && registration.tags.length > 0;
        }
        case 'tags-contain': {
            return (
                filter.value &&
                registration.tags &&
                difference(filter.value, registration.tags).length !== filter.value.length
            );
        }
        case 'tags-not-contain': {
            return (
                !filter.value ||
                !registration.tags ||
                difference(filter.value, registration.tags).length === filter.value.length
            );
        }
        case 'field-equals': {
            const answer = registration.answers[filter.field];
            if (typeof answer === 'string') {
                return filter.value && answer.toLowerCase() === filter.value.toLowerCase().trim();
            }
            return answer === filter.value;
        }
        case 'field-nequals': {
            const answer = registration.answers[filter.field];
            if (typeof answer === 'string') {
                return filter.value && answer.toLowerCase() !== filter.value.toLowerCase().trim();
            }
            return answer !== filter.value;
        }
        case 'field-contains': {
            const answer = registration.answers[filter.field];
            return filter.value && answer && answer.toLowerCase().indexOf(filter.value.toLowerCase().trim()) !== -1;
        }
        case 'field-not-contains': {
            const answer = registration.answers[filter.field];
            return filter.value && answer && answer.toLowerCase().indexOf(filter.value.toLowerCase().trim()) === -1;
        }
        case 'field-empty': {
            return (
                !registration.answers.hasOwnProperty(filter.field) ||
                !registration.answers[filter.field] ||
                !registration.answers[filter.field].length
            );
        }
        case 'field-not-empty': {
            const answer = registration.answers[filter.field];
            if (isNaN(answer) && !answer) return false;
            if (isEmpty(answer)) return false;
            return true;
        }
        default:
            return true;
    }
};

export const applyFilters = (data, filters) => {
    return data.filter(registration => {
        const filtersLen = filters.length;
        for (let i = 0; i < filtersLen; i++) {
            if (!filter(registration, filters[i])) {
                return false;
            }
        }
        return true;
    });
};
