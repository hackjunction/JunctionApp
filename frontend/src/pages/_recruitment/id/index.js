import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Dialog, Box, Chip } from '@material-ui/core'
import { Roles, Misc } from '@hackjunction/shared'
import CheckIcon from '@material-ui/icons/Check'

import PageWrapper from 'components/layouts/PageWrapper'

import Container from 'components/generic/Container'

import UserProfilesService from 'services/userProfiles'
import * as RecruitmentActions from 'redux/recruitment/actions'

import * as AuthSelectors from 'redux/auth/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'

import { useFormField } from 'hooks/formHooks'

import DetailTop from './DetailTop'
import DetailSection from './DetailSection'
import MessageHistory from './MessageHistory'
import SkillRating from '../default/SearchResults/SkillRating'
import TextAreaInput from 'components/inputs/TextAreaInput'
import FormControl from 'components/inputs/FormControl'
import Button from 'components/generic/Button'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
    iconBlue: {
        backgroundColor: theme.palette.theme_turquoise.main,
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        marginRight: '8px',
    },
    iconPurple: {
        backgroundColor: theme.palette.theme_purple.main,
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        marginRight: '8px',
    },
    bold: {
        fontWeight: 'bold',
    },
}))

export default () => {
    const classes = useStyles()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const dispatch = useDispatch()
    const match = useRouteMatch()
    const { t } = useTranslation()

    const sendMessage = useCallback(
        (message, userId) => {
            dispatch(RecruitmentActions.sendMessage(message, userId))
        },
        [dispatch],
    )

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [user, setUser] = useState(null)
    const message = useFormField(
        '',
        value => {
            if (value.length < 50) {
                return t('Your_message_length_')
            }
            if (value.length > 1000) {
                return t('Your_message_long_')
            }

            return
        },
        false,
        false,
    )

    const { id } = match.params

    useEffect(() => {
        if (id) {
            setLoading(true)

            UserProfilesService.getUserProfileRecruitment(id, idToken)
                .then(data => {
                    setUser(data)
                })
                .catch(err => {
                    setError(true)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [idToken, id])

    const handleSendMessage = useCallback(async () => {
        const err = message.validate()
        console.log('user is', user)
        if (!err && user !== null) {
            setLoading(true)
            const formatted = message.value.replace(/(?:\r\n|\r|\n)/g, '<br>')
            const res = await sendMessage(formatted, user.userId)

            // TODO fix snackbar here
            /*if (res?.error) {
                dispatch(SnackbarActions.error(t('Something_went_wrong_')))
            } else {*/
            message.reset()
            dispatch(SnackbarActions.success(t('Message_sent_')))
            //}
            setLoading(false)
        }
    }, [message, user, sendMessage, dispatch, t])

    // TODO A little bit hard to define for translating
    const renderRecruitmentStatus = () => {
        switch (user.recruitmentOptions.status) {
            case Misc.recruitmentStatuses.items['actively-looking'].id:
                return (
                    <Chip
                        label={
                            'Recruitment: ' +
                            Misc.recruitmentStatuses.items['actively-looking']
                                .label
                        }
                        color="primary"
                        variant="outlined"
                    />
                )
            case Misc.recruitmentStatuses.items['up-for-discussions'].id:
                return (
                    <Chip
                        label={
                            'Recruitment: ' +
                            Misc.recruitmentStatuses.items['up-for-discussions']
                                .label
                        }
                        color="secondary"
                        variant="outlined"
                    />
                )
            default:
                return null
        }
    }

    const renderRelocationStatus = () => {
        switch (user.recruitmentOptions.relocation) {
            case Misc.relocationOptions.items['looking-for-change'].id:
                return (
                    <Chip
                        label={
                            'Relocation: ' +
                            Misc.relocationOptions.items['looking-for-change']
                                .label
                        }
                        color="primary"
                        variant="outlined"
                    />
                )
            case Misc.relocationOptions.items['willing-to-relocate'].id:
                return (
                    <Chip
                        label={
                            'Relocation: ' +
                            Misc.relocationOptions.items['willing-to-relocate']
                                .label
                        }
                        color="primary"
                        variant="outlined"
                    />
                )
            case Misc.relocationOptions.items['not-currently'].id:
                return (
                    <Chip
                        label={
                            'Relocation: ' +
                            Misc.relocationOptions.items['not-currently'].label
                        }
                        color="secondary"
                        variant="outlined"
                    />
                )
            default:
                return null
        }
    }

    const userLinks = [
        { label: 'Portfolio', link: 'https://www.google.com' },
        { label: 'LinkedIn', link: 'https://www.google.com' },
        { label: 'Dribbble', link: 'https://www.google.com' },
    ]

    return (
        <Dialog fullScreen open={true} transitionDuration={0}>
            <PageWrapper
                error={error}
                wrapContent={false}
                loading={loading}
                render={() => (
                    <Container
                        className="tw-text-left tw-flex tw-flex-col tw-gap-8 tw-mb-16"
                        center
                    >
                        <DetailTop user={user} />
                        <div className="tw-grid tw-grid-cols-1   lg:tw-grid-cols-6 tw-gap-4">
                            <div className="tw-flex tw-flex-col lg:tw-col-span-4 tw-gap-4">
                                <div className="tw-rounded-lg tw-shadow-md tw-bg-white tw-p-8 tw-flex tw-flex-col tw-gap-4">
                                    <Typography
                                        className="tw-tracking-tight tw-font-medium"
                                        variant="h5"
                                        component="h5"
                                    >
                                        Biography
                                    </Typography>
                                    <div>
                                        <Typography
                                            className="tw-text-lg"
                                            variant="body1"
                                            component="p"
                                        >
                                            {user.profile.biography}
                                        </Typography>
                                    </div>
                                    <div className="tw-flex tw-flex-wrap tw-gap-4">
                                        <Box ml={0.5} mr={0.5} mb={0.5}>
                                            {renderRecruitmentStatus()}
                                        </Box>
                                        <Box ml={0.5} mr={0.5} mb={0.5}>
                                            {renderRelocationStatus()}
                                        </Box>
                                    </div>
                                </div>
                                <div className="tw-rounded-lg tw-shadow-md tw-bg-white tw-p-8 tw-flex tw-flex-col tw-gap-4">
                                    <Typography
                                        className="tw-tracking-tight tw-font-medium tw-mb-4"
                                        variant="h5"
                                        component="h5"
                                    >
                                        Basic information
                                    </Typography>
                                    <div>
                                        <Typography
                                            className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                                            variant="h6"
                                            component="h6"
                                        >
                                            First name
                                        </Typography>
                                        <Typography
                                            className="tw-text-lg"
                                            variant="body1"
                                            component="p"
                                        >
                                            {user.profile.firstName}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography
                                            className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                                            variant="h6"
                                            component="h6"
                                        >
                                            Last name
                                        </Typography>
                                        <Typography
                                            className="tw-text-lg"
                                            variant="body1"
                                            component="p"
                                        >
                                            {user.profile.lastName}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography
                                            className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                                            variant="h6"
                                            component="h6"
                                        >
                                            Spoken languages
                                        </Typography>
                                        <Typography
                                            className="tw-text-lg"
                                            variant="body1"
                                            component="p"
                                        >
                                            {user.profile.spokenLanguages.join(
                                                ', ',
                                            )}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography
                                            className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                                            variant="h6"
                                            component="h6"
                                        >
                                            Email
                                        </Typography>
                                        <Typography
                                            className="tw-text-lg"
                                            variant="body1"
                                            component="p"
                                        >
                                            {user.profile.email}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography
                                            className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                                            variant="h6"
                                            component="h6"
                                        >
                                            Country of residence
                                        </Typography>
                                        <Typography
                                            className="tw-text-lg"
                                            variant="body1"
                                            component="p"
                                        >
                                            {user.profile.countryOfResidence}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography
                                            className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                                            variant="h6"
                                            component="h6"
                                        >
                                            Nationality
                                        </Typography>
                                        <Typography
                                            className="tw-text-lg"
                                            variant="body1"
                                            component="p"
                                        >
                                            {user.profile.nationality}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="tw-rounded-lg tw-shadow-md tw-bg-white tw-p-8 tw-flex tw-flex-col tw-gap-12">
                                    <div className="tw-flex tw-flex-col tw-gap-4">
                                        <Typography
                                            className="tw-tracking-tight tw-font-medium"
                                            variant="h5"
                                            component="h5"
                                        >
                                            Skills
                                        </Typography>
                                        <div className="tw-flex tw-flex-wrap tw-gap-2">
                                            {user.skills.map(skillObj => (
                                                <Typography
                                                    className="tw-text-lg tw-p-2 tw-rounded-lg tw-border tw-border-solid tw-border-gray-300"
                                                    variant="body1"
                                                    component="p"
                                                >
                                                    {skillObj.skill}
                                                </Typography>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="tw-flex tw-flex-col tw-gap-4">
                                        <Typography
                                            className="tw-tracking-tight tw-font-medium"
                                            variant="h5"
                                            component="h5"
                                        >
                                            Education
                                        </Typography>
                                        {typeof user.education !==
                                        'undefined' ? (
                                            user.education.university ? (
                                                <div className="tw-grid tw-grid-cols-12 tw-gap-4">
                                                    <div className="tw-col-span-3">
                                                        <Typography
                                                            className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                                                            variant="h6"
                                                            component="h6"
                                                        >
                                                            Degree
                                                        </Typography>
                                                        <Typography
                                                            className="tw-text-lg"
                                                            variant="body1"
                                                            component="p"
                                                        >
                                                            {
                                                                user.education
                                                                    .degree
                                                            }
                                                        </Typography>
                                                    </div>
                                                    <div className="tw-col-span-2">
                                                        <Typography
                                                            className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                                                            variant="h6"
                                                            component="h6"
                                                        >
                                                            Level
                                                        </Typography>
                                                        <Typography
                                                            className="tw-text-lg"
                                                            variant="body1"
                                                            component="p"
                                                        >
                                                            {
                                                                user.education
                                                                    .level
                                                            }
                                                        </Typography>
                                                    </div>
                                                    <div className="tw-col-span-4">
                                                        <Typography
                                                            className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                                                            variant="h6"
                                                            component="h6"
                                                        >
                                                            Institution
                                                        </Typography>
                                                        <Typography
                                                            className="tw-text-lg"
                                                            variant="body1"
                                                            component="p"
                                                        >
                                                            {
                                                                user.education
                                                                    .university
                                                            }
                                                        </Typography>
                                                    </div>
                                                    <div className="tw-col-span-3">
                                                        <Typography
                                                            className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                                                            variant="h6"
                                                            component="h6"
                                                        >
                                                            Graduation year
                                                        </Typography>
                                                        <Typography
                                                            className="tw-text-lg"
                                                            variant="body1"
                                                            component="p"
                                                        >
                                                            {user.education
                                                                .graduationYear <
                                                            new Date().getFullYear()
                                                                ? `${user.education.graduationYear}`
                                                                : `Expected ${user.education.graduationYear}`}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="">
                                                    <Typography
                                                        className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                                                        variant="h6"
                                                        component="h6"
                                                    >
                                                        Level
                                                    </Typography>
                                                    <Typography
                                                        className="tw-text-lg"
                                                        variant="body1"
                                                        component="p"
                                                    >
                                                        {user.education.level}
                                                    </Typography>
                                                </div>
                                            )
                                        ) : null}
                                    </div>
                                    <div className="tw-flex tw-flex-col tw-gap-4">
                                        <Typography
                                            className="tw-tracking-tight tw-font-medium"
                                            variant="h5"
                                            component="h5"
                                        >
                                            Experience
                                        </Typography>
                                        <div className="tw-flex tw-flex-wrap tw-gap-8">
                                            {user.roles.map(role => (
                                                <div className="">
                                                    <Typography
                                                        className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                                                        variant="h6"
                                                        component="h6"
                                                    >
                                                        {Roles.getLabelForExperienceLevel(
                                                            role.years,
                                                        )}
                                                    </Typography>
                                                    <Typography
                                                        className="tw-text-lg"
                                                        variant="body1"
                                                        component="p"
                                                    >
                                                        {role.role}
                                                    </Typography>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tw-flex tw-flex-col lg:tw-col-span-2 tw-gap-4">
                                <div className="tw-rounded-lg tw-shadow-md tw-bg-white tw-p-8">
                                    <Typography
                                        className="tw-tracking-tight tw-font-medium"
                                        variant="h5"
                                        component="h5"
                                    >
                                        Industries of interest
                                    </Typography>
                                    <ul className="tw-p-0 tw-flex tw-flex-col tw-gap-2">
                                        {user.industriesOfInterest.map(
                                            industry => (
                                                <Typography
                                                    className="tw-text-lg tw-p-2 tw-list-disc tw-list-inside"
                                                    variant="body1"
                                                    component="li"
                                                    key={industry}
                                                >
                                                    {industry}
                                                </Typography>
                                            ),
                                        )}
                                    </ul>
                                </div>
                                <div className="tw-rounded-lg tw-shadow-md tw-bg-white tw-p-8">
                                    <Typography
                                        className="tw-tracking-tight tw-font-medium"
                                        variant="h5"
                                        component="h5"
                                    >
                                        Themes of interest
                                    </Typography>
                                    <ul className="tw-p-0 tw-flex tw-flex-col tw-gap-2">
                                        {user.themesOfInterest.map(theme => (
                                            <Typography
                                                className="tw-text-lg tw-p-2 tw-list-disc tw-list-inside"
                                                variant="body1"
                                                component="li"
                                                key={theme}
                                            >
                                                {theme}
                                            </Typography>
                                        ))}
                                    </ul>
                                </div>
                                {/* <div className="tw-rounded-lg tw-shadow-md tw-bg-white tw-p-8">
                                    <Typography
                                        className="tw-tracking-tight tw-font-medium"
                                        variant="h5"
                                        component="h5"
                                    >
                                        Links
                                    </Typography>
                                    <ul className="tw-p-0 tw-flex tw-flex-col tw-gap-2">
                                        {userLinks.map(data => (
                                            <div>
                                                <Typography
                                                    className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                                                    variant="h6"
                                                    component="h6"
                                                >
                                                    {data.label}
                                                </Typography>
                                                <Typography
                                                    className="tw-text-lg"
                                                    variant="body1"
                                                    component="a"
                                                >
                                                    {data.link}
                                                </Typography>
                                            </div>
                                        ))}
                                    </ul>
                                </div> */}
                            </div>
                        </div>
                    </Container>
                )}
            />
        </Dialog>
    )
}
