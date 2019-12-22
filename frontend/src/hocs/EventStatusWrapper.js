const EventStatusWrapper = ({
    eventStatus,
    statuses = [],
    children,
    render,
}) => {
    if (statuses.indexOf(eventStatus) !== -1) {
        return typeof render === 'function' ? render() : children
    }
    return null
}

export default EventStatusWrapper
