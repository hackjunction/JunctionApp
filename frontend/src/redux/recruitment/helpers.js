export const buildFilterArray = ({ skills = [], roles = [], countries = [] }) => {
    const filters = [];

    if (countries.length) {
        filters.push({
            field: 'countryOfResidence',
            operator: '==',
            value: countries
        });
    }

    skills.forEach(({ skill, levels }) => {
        if (levels.length) {
            filters.push({
                field: 'skills',
                operator: 'array-contains',
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
                operator: 'array-contains',
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
