const FilterGroup = require('./model')

const controller = {}
const { NotFoundError } = require('../../common/errors/errors')

controller.createFilterGroup = (
    label,
    description,
    createdBy,
    eventId,
    filters
) => {
    const filterGroup = new FilterGroup({
        label,
        description,
        createdBy,
        filters,
        event: eventId,
    })

    return filterGroup.save()
}

controller.editFilterGroup = (label, description, sub, eventId, filters) => {
    return FilterGroup.findOne({ label, event: eventId }).then(filterGroup => {
        if (!filterGroup)
            throw new NotFoundError(
                `Filter group with label ${label} does not exist`
            )
        filterGroup.description = description
        filterGroup.filters = filters
        return filterGroup.save()
    })
}

controller.deleteFilterGroup = (label, eventId) => {
    return FilterGroup.findOneAndRemove({ label, event: eventId })
}

controller.getFilterGroupsForEvent = eventId => {
    return FilterGroup.find({ event: eventId })
}

module.exports = controller
