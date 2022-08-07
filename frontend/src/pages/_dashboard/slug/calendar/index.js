import React, { useState } from 'react'
import PartnerCalendarView from './PartnerCalendarView'
import ParticipantCalendarView from './ParticipantCalendarView'

export default () => {
    const [isPartner, setIsPartner] = useState(true)

    return (
        <>{isPartner ? <PartnerCalendarView /> : <ParticipantCalendarView />}</>
    )
}
