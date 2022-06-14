import React, { useContext } from 'react'

import EventDetailContext, { EventDetailProvider } from '../context'
import EventPageScript from 'components/events/EventPageScript'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const EventTracking = () => {
    const { pageId } = useParams()
    const { event } = useContext(EventDetailContext)

    console.log(event, pageId)
    return (
        <>
            {event && pageId && (
                <Helmet>
                    <title>
                        {event?.name} - Tracking - {pageId}
                    </title>
                </Helmet>
            )}

            <EventPageScript event={event} pageId={pageId} />
        </>
    )
}

export default () => (
    <EventDetailProvider>
        <EventTracking />
    </EventDetailProvider>
)
