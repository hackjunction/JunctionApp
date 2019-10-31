import moment from 'moment';

export const buildFilterArray = ({ skills = [], roles = [], countryOfResidence = [], age, recruitmentStatus = [] }) => {
    const filters = [];

    if (age && age.length === 2) {
        filters.push({
            field: 'dateOfBirth',
            operator: '<=',
            value: moment().subtract(age[0], 'years')
        });

        filters.push({
            field: 'dateOfBirth',
            operator: '>=',
            value: moment().subtract(age[1], 'years')
        });
    }

    if (countryOfResidence.length) {
        filters.push({
            field: 'countryOfResidence',
            operator: 'contains',
            value: countryOfResidence
        });
    }

    if (recruitmentStatus.length) {
        filters.push({
            field: 'recruitmentOptions.status',
            operator: 'contains',
            value: recruitmentStatus
        });
    }

    skills.forEach(({ skill, levels }) => {
        if (levels.length) {
            filters.push({
                field: 'skills',
                operator: 'array-element-match',
                value: {
                    skill,
                    level: {
                        $in: levels.map(level => parseInt(level))
                    }
                }
            });
        } else {
            filters.push({
                field: 'skills.skill',
                operator: '==',
                value: skill
            });
        }
    });

    roles.forEach(({ role, years }) => {
        if (years.length) {
            filters.push({
                field: 'roles',
                operator: 'array-element-match',
                value: {
                    role,
                    years: {
                        $in: years.map(year => parseInt(year))
                    }
                }
            });
        } else {
            filters.push({
                field: 'roles.role',
                operator: '==',
                value: role
            });
        }
    });

    return filters;
};
