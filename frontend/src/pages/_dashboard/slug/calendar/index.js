import React, { useState } from 'react'
import PartnerCalendarView from './PartnerCalendarView'
import ParticipantCalendarView from './ParticipantCalendarView'
import { useSelector } from 'react-redux'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as UserSelectors from 'redux/user/selectors'
import * as AuthSelectors from 'redux/auth/selectors'
import Button from 'components/generic/Button'

export default () => {
    const event = useSelector(DashboardSelectors.event)
    const user = useSelector(UserSelectors.userProfile)
    const [isPartner, setIsPartner] = useState(
        useSelector(AuthSelectors.getRoles).includes(
            'SuperAdmin',
            'Organiser',
            'AssistantOrganiser',
            'Recruiter',
        ),
    )
    return (
        <>
            {/* button for DEV to swithc between participant / partner view */}
            {/* <Button
                onClick={() => setIsPartner(!isPartner)}
                color="primary"
                variant="contained"
            >
                Switch between participant / partner view (only for dev)
            </Button> */}
            {isPartner ? (
                <PartnerCalendarView event={event} />
            ) : (
                <ParticipantCalendarView event={event} user={user} />
            )}
        </>
    )
}
