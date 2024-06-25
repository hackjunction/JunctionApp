import React, { useCallback, useEffect, useState } from 'react'
import junctionStyle from 'utils/styles'
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material'

import Button from 'components/generic/Button'
import 'react-multi-carousel/lib/styles.css'

import * as DashboardSelectors from 'reducers/dashboard/selectors'
import * as DashboardActions from 'reducers/dashboard/actions'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import ParticipantPreview from 'components/Participant/ParticipantPreview'

function CandidateCard({ candidateData = {}, onViewApplication = () => {} }) {
    const classes = junctionStyle()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    let candidateProfile = {
        profile: {
            userId: candidateData?.userId,
            _id: candidateData?._id,
        },
    }

    useEffect(() => {
        setLoading(true)
        dispatch(
            DashboardActions.getCandidateProfileById(candidateData?.userId),
        )
            .then(data => (candidateProfile.profile = { ...data.profile }))
            .catch(err => {
                console.log('err', err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [candidateData])

    const event = useSelector(DashboardSelectors.event)
    const team = useSelector(DashboardSelectors.team)
    const { slug } = event
    const { code } = team
    const maxRolesToRender = 2

    //TODO make rolesToRender and anything related to how they render into a components for CandidateCard and for candidates page
    let rolesToRender = []

    //TODO generate the open application role from the backend
    if (candidateData.roles?.length > 0) {
        rolesToRender.push(...candidateData.roles?.slice(0, maxRolesToRender))
    } else {
        rolesToRender.push({ role: 'Open application' })
    }

    const handleAccept = useCallback(
        (values, formikBag) => {
            dispatch(
                DashboardActions.acceptCandidateToTeam(
                    slug,
                    code,
                    candidateProfile.profile.userId,
                ),
            )
        },
        [dispatch, candidateProfile],
    )

    const handleDecline = () => {
        dispatch(
            DashboardActions.declineCandidateToTeam(
                slug,
                code,
                candidateProfile.profile.userId,
            ),
        )
    }

    const formik = useFormik({
        initialValues: {
            roles: rolesToRender || [],
        },
        onSubmit: handleAccept,
    })

    return (
        <Card className="tw-bg-white tw-m-4 tw-text-left tw-rounded-lg tw-shadow-md tw-flex tw-flex-col tw-justify-between tw-h-576px">
            <CardContent className="tw-flex tw-flex-col tw-justify-between tw-items-start tw-p-4 tw-gap-6">
                <ParticipantPreview userData={candidateProfile} />
                <Button
                    onClick={onViewApplication}
                    color="outlined_button"
                    variant="jOutlined"
                >
                    Full application
                </Button>
                {rolesToRender.length > 0 && (
                    <div className="tw-flex tw-flex-col tw-gap-4 tw-w-full">
                        <form onSubmit={formik.handleSubmit}>
                            <FormControl
                                component="fieldset"
                                className="tw-w-full"
                            >
                                <FormLabel
                                    component="legend"
                                    className="tw-mb-4 tw-tracking-tight tw-font-medium tw-text-black tw-text-2xl"
                                >
                                    Applied for
                                </FormLabel>

                                <RadioGroup
                                    aria-label="roles"
                                    name="roles"
                                    value={formik.values.roles}
                                    onChange={formik.handleChange}
                                    className="tw-flex tw-flex-col tw-gap-4"
                                >
                                    {rolesToRender.map((role, index) => (
                                        <FormControlLabel
                                            key={`${candidateProfile.profile.userId}-${role.role}`}
                                            value={role.role}
                                            control={
                                                <Radio
                                                    className="tw-p-0"
                                                    checkedIcon={
                                                        <div className="tw-flex tw-items-center tw-justify-center tw-bg-gray-300 tw-w-8 tw-h-8 tw-rounded-full">
                                                            <span
                                                                className={`tw-w-5 tw-h-5 tw-rounded-full ${classes.bgPrimary}`}
                                                            ></span>
                                                        </div>
                                                    }
                                                    icon={
                                                        <span
                                                            className={
                                                                classes.icon
                                                            }
                                                        />
                                                    }
                                                />
                                            }
                                            label={role.role}
                                            className="tw-m-0 tw-border tw-border-gray-300 tw-border-solid tw-rounded-lg hover:tw-bg-gray-100 tw-p-4 tw-flex tw-items-center tw-gap-x-4"
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </form>
                        {candidateData.roles?.length > maxRolesToRender && (
                            <Button
                                color="outlined_button"
                                variant="jOutlinedBox"
                            >
                                <div className="tw-flex tw-flex-col tw-gap-2 tw-items-start tw-w-full">
                                    <Typography
                                        className=" tw-text-gray-600"
                                        variant="body1"
                                        component="p"
                                    >
                                        {`Applied to ${
                                            candidateData.roles?.length -
                                            maxRolesToRender
                                        } more roles`}
                                    </Typography>
                                </div>
                            </Button>
                        )}
                    </div>
                )}
            </CardContent>
            <CardActions className="tw-flex tw-gap-2 tw-justify-start tw-px-4 tw-pb-4 tw-pt-0">
                <Button variant="jContained" onClick={formik.submitForm}>
                    Accept
                </Button>
                <Button
                    onClick={handleDecline}
                    color="outlined_button"
                    variant="jOutlined"
                >
                    Decline
                </Button>
            </CardActions>
        </Card>
    )
}

export default CandidateCard
