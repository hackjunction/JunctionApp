import { Grid, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as AuthSelectors from 'redux/auth/selectors'
import GradientBox from 'components/generic/GradientBox'
import { useNavigation } from 'flow/hooks/useNavigation'
import RegistrationsService from 'services/registrations'

const NFTBlock = () => {
    const event = useSelector(DashboardSelectors.event)
    const idToken = useSelector(AuthSelectors.getIdToken)
    const registration = useSelector(DashboardSelectors.registration)
    const isJ22 = event.slug === 'junction-2022'
    const [isValid, setIsValid] = useState(false)

    const { content } = useNavigation()

    const checkEligibility = useCallback(async () => {
        try {
            const response = await RegistrationsService.getNFTStatus(
                idToken,
                event.slug,
                registration._id,
            )

            return JSON.parse(response)
        } catch (error) {
            console.log(error)
        }
    }, [event.slug, idToken, registration._id])

    useEffect(() => {
        const checkIfValid = async () => {
            const { isValid } = await checkEligibility()

            setIsValid(isValid)
        }

        checkIfValid()
    }, [checkEligibility, event.slug, idToken, registration._id])

    if (!isJ22 || !isValid) return null

    return (
        <Grid item xs={12}>
            <GradientBox p={3} color="theme_purple" radius={8}>
                <Typography variant="button">Mint NFT</Typography>
                {content}
            </GradientBox>
        </Grid>
    )
}

export default NFTBlock
