import _axios from 'services/axios'

const FilterGroupsService = {}

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    }
}

FilterGroupsService.createFilterGroup = (
    idToken,
    label,
    description,
    filters,
    eventSlug,
) => {
    const data = {
        label,
        description,
        filters,
    }
    return _axios.post(`/filter-groups/${eventSlug}`, data, config(idToken))
}

FilterGroupsService.editFilterGroup = (
    idToken,
    label,
    description,
    filters,
    eventSlug,
) => {
    const data = {
        label,
        description,
        filters,
    }
    return _axios.patch(`/filter-groups/${eventSlug}`, data, config(idToken))
}

FilterGroupsService.deleteFilterGroup = (idToken, label, eventSlug) => {
    const data = { label }
    return _axios.delete(`/filter-groups/${eventSlug}`, {
        ...config(idToken),
        data,
    })
}

FilterGroupsService.getFilterGroupsForEvent = (idToken, eventSlug) => {
    return _axios.get(`/filter-groups/${eventSlug}`, config(idToken))
}

export default FilterGroupsService
