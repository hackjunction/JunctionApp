import React from 'react'
import EventUtils from 'utils/events'

export default ({ pageId, slug, event }) => {
    return EventUtils.getEventPageScripts(event, pageId) ? (
        <iframe
            style={{ height: 0, width: 0, position: 'absolute', border: 0 }}
            src={`${window.location.origin}/events/${slug}/tracking/${pageId}${window.location.search}`}
        ></iframe>
    ) : null
}
