const FilterOptions = [
    {
        id: 'status-equals',
        label: 'Status is one of',
    },
    {
        id: 'status-nequals',
        label: 'Status is not one of',
    },
    {
        id: 'rating-exists',
        label: 'Rating exists',
    },
    {
        id: 'rating-nexists',
        label: 'Rating does not exist',
    },
    {
        id: 'rating-lte',
        label: 'Rating less than or equal to',
    },
    {
        id: 'rating-gte',
        label: 'Rating more than or equal to',
    },
    {
        id: 'has-tags',
        label: 'Tags not empty',
    },
    {
        id: 'tags-contain',
        label: 'Tags contain',
    },
    {
        id: 'tags-not-contain',
        label: 'Tags do not contain',
    },
    {
        id: 'apply-as-team',
        label: 'Applying as team',
    },
    {
        id: 'not-apply-as-team',
        label: 'Not applying as team',
    },
    {
        id: 'field-equals',
        label: 'Field equals',
    },
    {
        id: 'field-nequals',
        label: 'Field does not equal',
    },
    {
        id: 'field-contains',
        label: 'Field contains',
    },
    {
        id: 'field-not-contains',
        label: 'Field does not contain',
    },
    {
        id: 'field-empty',
        label: 'Field is empty',
    },
    {
        id: 'field-not-empty',
        label: 'Field is not empty',
    },
]

export default FilterOptions
