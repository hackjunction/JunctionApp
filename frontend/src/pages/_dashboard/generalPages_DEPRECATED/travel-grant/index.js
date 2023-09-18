import React from 'react'
import { useSelector } from 'react-redux'
import { Typography, Box } from '@material-ui/core'
import moment from 'moment-timezone'

import PageHeader from 'components/generic/PageHeader'

import * as DashboardSelectors from 'redux/dashboard/selectors'

import TravelGrantForm from './TravelGrantForm'
import GradientBox from 'components/generic/GradientBox'

import {
    RegistrationTravelGrantStatuses as Statuses,
    EventHelpers,
} from '@hackjunction/shared'

export default () => {
    const event = useSelector(DashboardSelectors.event)
    const registration = useSelector(DashboardSelectors.registration)
    const isDeadlinePast = EventHelpers.isGrantDeadlinePast(event, moment)

    const renderStatusBlock = () => {
        switch (registration.travelGrantStatus) {
            case Statuses.asObject.not_submitted.id:
                if (isDeadlinePast) {
                    return (
                        <GradientBox p={2} color="theme_white">
                            <Typography variant="button" gutterBottom>
                                Your status
                            </Typography>
                            <Typography variant="h6" color="error" gutterBottom>
                                Not submitted
                            </Typography>
                            <Typography variant="body1" paragraph>
                                The deadline for submitting this form has
                                passed. As you haven't submitted any of your
                                travel details, we will not be able to move
                                forward with paying your travel grant and it has
                                been cancelled.
                            </Typography>
                        </GradientBox>
                    )
                }
                return (
                    <GradientBox p={2} color="theme_white">
                        <Typography variant="button" gutterBottom>
                            Your status
                        </Typography>
                        <Typography variant="h6" color="secondary" gutterBottom>
                            Not submitted
                        </Typography>
                        <Typography variant="body1" paragraph>
                            To complete your travel grant application process
                            and receive your travel grant of up to{' '}
                            {registration.travelGrant}€, please submit the below
                            form with your travel and payment details. After you
                            submit the form, we will manually review your
                            details and can move forward with paying your travel
                            grant.
                        </Typography>
                        <Typography
                            variant="body1"
                            style={{ fontWeight: 'bold' }}
                        >
                            This form will close{' '}
                            {moment(event.endTime).add(7, 'days').format('LLL')}
                            . Should you miss this deadline, we will be unable
                            to pay you your travel grant.
                        </Typography>
                    </GradientBox>
                )
            case Statuses.asObject.pending.id:
                return (
                    <GradientBox color="theme_white" p={2}>
                        <Typography variant="button" gutterBottom>
                            Your status
                        </Typography>
                        <Typography variant="h6" color="primary" gutterBottom>
                            Submitted, pending review
                        </Typography>
                        <Typography variant="body1">
                            Great, thanks for submitting your details! We will
                            now process your details and determine the final sum
                            of your travel grant. You'll be able to see the
                            up-to-date status of your travel grant on this page.
                            In case there is something wrong or missing in your
                            details, we will notify you via email and you'll be
                            able to make corrections on this page.
                        </Typography>
                    </GradientBox>
                )
            case Statuses.asObject.rejected.id:
                return (
                    <GradientBox color="theme_white" p={2}>
                        <Typography variant="button" gutterBottom>
                            Your status
                        </Typography>
                        <Typography variant="h6" color="secondary" gutterBottom>
                            Rejected, clarification needed
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Oops, looks like there was something wrong with the
                            travel details you submitted. Not to worry, see the
                            comment below and make the appropriate changes to
                            your details and we'll be able to confirm your
                            travel grant amount! Please check the following:
                        </Typography>
                        <Typography
                            variant="body1"
                            color="error"
                            style={{ fontWeight: 'bold' }}
                        >
                            {registration.travelGrantComment}
                        </Typography>
                    </GradientBox>
                )
            case Statuses.asObject.accepted.id:
                return (
                    <GradientBox color="theme_white" p={2}>
                        <Typography variant="button" gutterBottom>
                            Your status
                        </Typography>
                        <Typography variant="h6" color="primary" gutterBottom>
                            Accepted, to be paid:{' '}
                            {registration.travelGrantAmount}€
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Awesome, your travel grant application has been
                            accepted! You'll receive a payment of{' '}
                            {registration.travelGrantAmount}€ when we start
                            issuing the payments in the near future. This amount
                            is the total sum of your eligible travel costs
                            according to the receipts you provided, up to the
                            amount of your travel grant allowance. Don't
                            hesitate to reach out to us at
                            finance@hackjunction.com if you have any questions!
                        </Typography>
                        <Typography variant="body1" paragraph>
                            In case we still need to clarify some of your
                            details (e.g. your submitted legal name differs from
                            the name on your account, or your country is not in
                            the list of countries supported by Transferwise),
                            we'll react out to you personally via email before
                            initiating the payments.
                        </Typography>
                    </GradientBox>
                )
            default:
                return null
        }
    }

    const renderForm = () => {
        switch (registration.travelGrantStatus) {
            case Statuses.asObject.not_submitted.id:
                if (isDeadlinePast) return null
                return (
                    <>
                        <Box mt={3} />
                        <TravelGrantForm />
                    </>
                )
            case Statuses.asObject.rejected.id:
                return (
                    <>
                        <Box mt={3} />
                        <TravelGrantForm />
                    </>
                )
            default:
                return null
        }
    }

    return (
        <>
            <PageHeader
                heading="Travel grant"
                subheading="Complete your travel grant application process"
            />
            {renderStatusBlock()}
            {renderForm()}
        </>
    )
}
