import React, { useState } from 'react'
import PartnerCalendarView from './PartnerCalendarView'
import ParticipantCalendarView from './ParticipantCalendarView'
import { useDispatch, useSelector } from 'react-redux'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import Button from 'components/generic/Button'

export default () => {
    const event = useSelector(DashboardSelectors.event)
    const [isPartner, setIsPartner] = useState(false)
    console.log(event)
    return (
        <>
            <Button
                onClick={() => setIsPartner(!isPartner)}
                color="primary"
                variant="contained"
            >
                Switch between participant / partner view (only for dev)
            </Button>
            {isPartner ? (
                <PartnerCalendarView event={event} />
            ) : (
                <ParticipantCalendarView event={event} />
            )}
        </>
    )
}
